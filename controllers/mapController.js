const { savyDb, savyPoolDb } = require("../connection.js");


// ----------------------------------------------------------
// Returns all provinces in database
// ----------------------------------------------------------
exports.getProvinces = (req, res) => {
    let qry = `SELECT * FROM provinces`;
  
    savyPoolDb.then(pool =>{
      pool.query(qry)
          .then(results => {
             if (results.length == 0) {
               res.status(404).send("No Record Found");
             } else {
               res.status(200).send(results);
             }
          })
          .catch(error => {
            console.log(error);
            res.status(500).send(error);
          })
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    }); 
};
  

// ----------------------------------------------------------
// Returns statics data from provinces for the map
// ----------------------------------------------------------
// Year: 2016 - just considering last year of data
// Province "TR" - includes all territories, should be ignored as data is also segregated into YT, NT, NB
// Pie Chart - consider families:
// 2	Glass
// 3	Paper
// 4	Plastic
// 5	Foam
// 6	Eletronic
// 7	Construction
// 8	Small Appliance
// 9	Organic
// ----------------------------------------------------------
exports.getMapData = (req, res) => {
    let qry = `SELECT md.provinceCode, md.provinceName,
                      md.prov_Population, md.prov_RecyclingContribPerc, md.prov_Industries, md.prov_Employees,
                      md.prov_TotalRecycling, md.prov_TotalWaste, md.prov_WasteRecyclingPerc, md.prov_populationPercOverCountry,
                      pd.familyName, pd.familyTotalRecycling, pd.familyPercent
                 FROM
                      -- Subquery for Map data 
                      (
                        SELECT p.countryCode, p.provinceCode, p.provinceName, 
                               -- MIN(ctr.ctr_population) AS ctr_Population, MIN(ctr.ctr_recycling) AS ctr_Recycling, 
                               MIN(p.population) AS prov_Population,
                               ROUND((SUM(CASE WHEN dc.informationTypeID = 1 THEN dc.value ELSE 0 END) / MIN(ctr.ctr_recycling) * 100),2)  AS prov_RecyclingContribPerc,
                               SUM(CASE WHEN dc.informationTypeID = 1  THEN dc.value ELSE 0 END) AS prov_TotalRecycling,
                               SUM(CASE WHEN dc.informationTypeID = 14 THEN dc.value ELSE 0 END) AS prov_TotalWaste,
                               SUM(CASE WHEN dc.informationTypeID = 19 THEN dc.value ELSE 0 END) AS prov_Industries,
                               SUM(CASE WHEN dc.informationTypeID = 23 THEN dc.value ELSE 0 END) AS prov_Employees, 
                               ROUND(((SUM(CASE WHEN dc.informationTypeID = 1  THEN dc.value ELSE 0 END) / MIN(p.population)) / MIN(ctr.ctr_tonsPerHabitant) * 100),2) AS prov_populationPercOverCountry,                                    
                               ROUND((SUM(CASE WHEN dc.informationTypeID = 1  THEN dc.value ELSE 0 END) / SUM(CASE WHEN dc.informationTypeID = 14 THEN dc.value ELSE 0 END) * 100),2)  AS prov_WasteRecyclingPerc      
                          FROM datacontent dc
                               INNER JOIN provinces p ON (dc.provinceCode = p.provinceCode AND dc.countryCode = p.countryCode AND p.provinceCode <> 'TR')
                               INNER JOIN informationtype it ON (dc.informationTypeID = it.informationTypeID)
                               INNER JOIN informationgroup ig ON (it.informationGroupID = ig.informationGroupID)
                               INNER JOIN ( SELECT c.countryCode, 
                                                   SUM(p2.population) AS ctr_population,
                                                   SUM(dc2.value)     AS ctr_recycling,
                                                   round(SUM(dc2.value)  / SUM(p2.population),5) AS ctr_tonsPerHabitant 
                                              FROM countries c
                                                   INNER JOIN provinces p2 on (c.countryCode = p2.countryCode)
                                                   LEFT OUTER JOIN datacontent dc2 ON (dc2.provinceCode = p2.provinceCode AND dc2.countryCode = p2.countryCode)
                                             WHERE dc2.year = '2016'
                                               AND dc2.informationTypeID = 1 -- All Materials Diverted  
                                               AND p2.provinceCode <> 'TR'
                                             GROUP BY c.countryCode
                                           ) ctr ON (p.countryCode = ctr.countryCode)
                         WHERE ( (it.informationTypeID IN(1)  AND dc.year = 2016) OR -- 1. All Materials Diverted 
                                 (it.informationTypeID IN(19) AND dc.year = 2016) OR -- 19.Number of Business   
                                 (it.informationTypeID IN(23) AND dc.year = 2016) OR -- 23.Number of Employees                                    
                                 (it.informationTypeID IN(14) AND dc.year = 2018) )  -- 14.Total Waste           
                         GROUP BY p.countryCode, p.provinceCode, p.provinceName  
                      ) md,

                      -- Subquery for Pie Chart data per province
                      (
                        SELECT p.countryCode,
                               p.provinceCode,
                               p.provinceName,
                               f.name       AS familyName, 
                               SUM(d.value) AS familyTotalRecycling,
                               ROUND((SUM(d.value) / MIN(tp.total) * 100),2) AS familyPercent     
                          FROM datacontent d 
                               INNER JOIN informationtype t ON (d.informationTypeID = t.informationTypeID)
                               INNER JOIN family f ON (t.familyId = f.familyId)
                               INNER JOIN provinces p ON (d.provinceCode = p.provinceCode AND d.countryCode = p.countryCode AND p.provinceCode <> 'TR' )
                               INNER JOIN ( SELECT d2.countryCode, d2.provinceCode,
                                                   SUM(d2.value) AS total
                                              FROM datacontent d2
                                                   INNER JOIN informationtype t2 ON (d2.informationTypeID = t2.informationTypeID)
                                                   INNER JOIN family f2 ON (t2.familyId = f2.familyId)
                                             WHERE t2.familyId IN(2,3,4,5,6,7,8,9)
                                               AND d2.year = 2016 
                                               AND d2.provinceCode <> 'TR'       
                                             GROUP BY d2.countryCode, d2.provinceCode
                                           ) tp ON (p.provinceCode = tp.provinceCode and p.countryCode = tp.countryCode )
                         WHERE t.familyId IN(2,3,4,5,6,7,8,9)
                           AND d.year = 2016
                           AND d.provinceCode <> 'TR'
                         GROUP BY p.countryCode, p.provinceCode, p.provinceName, f.name         
                      ) pd
                WHERE md.provinceCode = pd.provinceCode
                  AND md.countryCode  = pd.countryCode
                  AND md.provinceCode <> 'TR'

               UNION    

               -- Query for total Canada Data                    
               SELECT md.countryCode AS provinceCode, md.countryName AS provinceName,
                      md.prov_Population, md.prov_RecyclingContribPerc, md.prov_Industries, md.prov_Employees,
                      md.prov_TotalRecycling, md.prov_TotalWaste, md.prov_WasteRecyclingPerc, md.prov_populationPercOverCountry,
                      pd.familyName, pd.familyTotalRecycling, pd.familyPercent
                 FROM
                      -- Map data 
                      (
                        SELECT c.countryCode, c.countryName,
                                -- MIN(ctr.ctr_population) AS ctr_Population, MIN(ctr.ctr_recycling) AS ctr_Recycling, 
                                MIN(ctr.ctr_population) AS prov_Population,
                                ROUND((SUM(CASE WHEN dc.informationTypeID = 1 THEN dc.value ELSE 0 END) / MIN(ctr.ctr_recycling) * 100),2)  AS prov_RecyclingContribPerc,
                                SUM(CASE WHEN dc.informationTypeID = 1  THEN dc.value ELSE 0 END) AS prov_TotalRecycling,
                                SUM(CASE WHEN dc.informationTypeID = 14 THEN dc.value ELSE 0 END) AS prov_TotalWaste,
                                SUM(CASE WHEN dc.informationTypeID = 19 THEN dc.value ELSE 0 END) AS prov_Industries,
                                SUM(CASE WHEN dc.informationTypeID = 23 THEN dc.value ELSE 0 END) AS prov_Employees, 
                                ROUND(((SUM(CASE WHEN dc.informationTypeID = 1  THEN dc.value ELSE 0 END) / MIN(ctr.ctr_population)) / MIN(ctr.ctr_tonsPerHabitant) * 100),2) AS prov_populationPercOverCountry,                                    
                                ROUND((SUM(CASE WHEN dc.informationTypeID = 1  THEN dc.value ELSE 0 END) / SUM(CASE WHEN dc.informationTypeID = 14 THEN dc.value ELSE 0 END) * 100),2)  AS prov_WasteRecyclingPerc      
                            FROM datacontent dc
                                INNER JOIN provinces p ON (dc.provinceCode = p.provinceCode AND dc.countryCode = p.countryCode AND p.provinceCode <> 'TR')
                                INNER JOIN countries c ON (p.countryCode = c.countryCode )
                                INNER JOIN informationtype it ON (dc.informationTypeID = it.informationTypeID)
                                INNER JOIN informationgroup ig ON (it.informationGroupID = ig.informationGroupID)
                                INNER JOIN ( SELECT c.countryCode, 
                                                    SUM(p2.population) AS ctr_population,
                                                    SUM(dc2.value)     AS ctr_recycling,
                                                    round(SUM(dc2.value)  / SUM(p2.population),5) AS ctr_tonsPerHabitant 
                                            FROM countries c
                                                  INNER JOIN provinces p2 on (c.countryCode = p2.countryCode)
                                                  LEFT OUTER JOIN datacontent dc2 ON (dc2.provinceCode = p2.provinceCode AND dc2.countryCode = p2.countryCode)
                                            WHERE dc2.year = '2016'
                                              AND dc2.informationTypeID = 1 -- All Materials Diverted  
                                              AND p2.provinceCode <> 'TR'
                                            GROUP BY c.countryCode
                                            ) ctr ON (p.countryCode = ctr.countryCode)
                            WHERE ( (it.informationTypeID IN(1)  AND dc.year = 2016) OR -- 01.All Materials Diverted 
                                    (it.informationTypeID IN(19) AND dc.year = 2016) OR -- 19.Number of Business   
                                    (it.informationTypeID IN(23) AND dc.year = 2016) OR -- 23.Number of Employees                                    
                                    (it.informationTypeID IN(14) AND dc.year = 2018) )  -- 14.Total Waste  
                              AND p.provinceCode <> 'TR'      
                            GROUP BY c.countryCode, c.countryName  
                      ) md,
                      -- Pie Chart data 
                      (
                        SELECT c.countryCode,
                                c.countryName,
                                f.name       AS familyName, 
                                SUM(d.value) AS familyTotalRecycling,
                                ROUND((SUM(d.value) / MIN(tp.total) * 100),2) AS familyPercent     
                            FROM datacontent d 
                                INNER JOIN informationtype t ON (d.informationTypeID = t.informationTypeID)
                                INNER JOIN family f ON (t.familyId = f.familyId)
                                INNER JOIN provinces p ON (d.provinceCode = p.provinceCode AND d.countryCode = p.countryCode AND p.provinceCode <> 'TR' )
                                INNER JOIN countries c ON (p.countryCode = c.countryCode )
                                INNER JOIN ( SELECT d2.countryCode, 
                                                    SUM(d2.value) AS total
                                                FROM datacontent d2
                                                    INNER JOIN informationtype t2 ON (d2.informationTypeID = t2.informationTypeID)
                                                    INNER JOIN family f2 ON (t2.familyId = f2.familyId)
                                              WHERE t2.familyId IN(2,3,4,5,6,7,8,9)
                                                AND d2.year = 2016 
                                                AND d2.provinceCode <> 'TR'       
                                              GROUP BY d2.countryCode
                                            ) tp ON ( p.countryCode = tp.countryCode )
                          WHERE t.familyId IN(2,3,4,5,6,7,8,9)
                            AND d.year = 2016
                            AND d.provinceCode <> 'TR'
                            GROUP BY c.countryCode, c.countryName, f.name         
                      ) pd
                WHERE md.countryCode  = pd.countryCode
                ORDER BY prov_RecyclingContribPerc DESC, provinceName, familyName   
                      `;
  
    savyPoolDb.then(pool =>{
      pool.query(qry)
          .then(results => {
              if (results.length == 0) {
                res.status(404).send("No Record Found");
              } else {

                let myResult = [];
                let pieObj = [];
                let mapData = {};
                let sProvince = "";
                let iRank = 0;
                let iRankProv = 0; 
          
                for (let i = 0; i < results.length; i++) {
                  if (sProvince != results[i].provinceCode) {
                    if (pieObj.length > 0) {
                      myResult.push({ mapData, pieData: pieObj });
                      pieObj = [];
                    }
          
                    // Sort object to get province rank
                    // "CA" has the consolidate data from Canada, and should not be considered on Rank                    
                    if (results[i].provinceCode != 'CA') {
                      iRank++;
                      iRankProv = iRank;
                    } else {
                      iRankProv = 0;
                    }
                    

                    mapData = {
                      provinceCode: results[i].provinceCode,
                      provinceName: results[i].provinceName,
                      prov_Population: results[i].prov_Population,
                      prov_RecyclingContribPerc: results[i].prov_RecyclingContribPerc,
                      prov_populationPercOverCountry: results[i].prov_populationPercOverCountry,
                      prov_TotalRecycling: results[i].prov_TotalRecycling,
                      prov_TotalWaste: results[i].prov_TotalWaste,
                      prov_Industries: results[i].prov_Industries,
                      prov_Employees: results[i].prov_Employees,
                      prov_WasteRecyclingPerc: results[i].prov_WasteRecyclingPerc,
                      prov_Rank: iRankProv,
                      prov_Population_Rank: 0,
                    };
                  }
                  pieObj.push({
                    familyName: results[i].familyName,
                    familyTotalRecycling: results[i].familyTotalRecycling,
                    familyPercent: results[i].familyPercent,
                  });
                  sProvince = results[i].provinceCode;
                }
          
                if (mapData != {}) {
                  myResult.push({ mapData, pieData: pieObj });
                }
          
                // Sort object to get population rank
                // "CA" has the consolidate data from Canada, and should not be considered on Rank
                iRank = 0;
                iRankProv = 0;                 
                myResult.sort((a, b) => a.mapData.prov_populationPercOverCountry < b.mapData.prov_populationPercOverCountry ? 1 : -1 );
                for (let i = 0; i < myResult.length; i++) {
                  if (myResult[i].mapData.provinceCode != 'CA') {
                    iRank++;
                    iRankProv = iRank;
                  } else {
                    iRankProv = 0;
                  }
                  myResult[i].mapData.prov_Population_Rank = iRankProv;
                }
          
                res.status(200).send(myResult);
              }
          })
          .catch(error => {
            console.log(error);
            res.status(500).send(error);
          })
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    }); 
};
  
