// *******************************************************
// ******** NPMs Installed *******************************
// *******************************************************
//
//      1)  npm init -y
//      2)  npm i express
//      3)  npm i mysql
//      4)  npm i express-validator
//      5)  npm i node-fetch
// 
// *******************************************************
// ******** Required Modules *****************************
// *******************************************************

const express = require("express");
const fetch   = require('node-fetch');
const app     = express();
const {savyDb} = require("./connection.js");

const server = app.listen(process.env.PORT || 3000, ()=>{
        console.log("listening port 3000");
});


// middleware parse the request body
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//   app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "*");
//     res.header("Access-Control-Allow-Methods", "*");
//     next();
//   });



// Returns all provinces in database
app.get("/api/v1/provinces", (req,res)=>{

    let qry = `SELECT * FROM provinces`;

    savyDb.query(qry, (error, results)=>{
        if (error) throw error;
        if (results.length == 0) {
            res.status(404).send('No Record Found');            
        } else {
            res.status(200).send(results);
        }    
    });   
});


// Returns statics data from provinces for the map
app.get("/api/v1/mapdata", (req,res)=>{

    let qry = `SELECT md.provinceCode, md.provinceName,
                      md.prov_Population, md.prov_RecyclingContribPerc, md.prov_Industries, md.prov_Employees,
                      md.prov_TotalRecycling, md.prov_TotalWaste, md.prov_WasteRecyclingPerc, md.prov_populationPercOverCountry,
                      pd.familyName, pd.familyTotalRecycling, pd.familyPercent
                 FROM
                      -- Map data 
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
                            GROUP BY p.provinceCode, p.provinceName   
                      ) md,
                      -- Pie Chart data per province
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
                ORDER BY prov_RecyclingContribPerc DESC, provinceName, familyName   
                    `;

    savyDb.query(qry, (error, results)=>{
        if (error) throw error;
        if (results.length == 0) {
            res.status(404).send('No Record Found');            
        } else {

            let myResult   = [];
            let pieObj     = [];
            let mapData    = {};
            let sProvince  = '';
            let iRank      = 0;

            for (let i=0; i< results.length; i++) {
                if (sProvince != results[i].provinceCode) {

                    if (pieObj.length > 0) {
                        myResult.push( {mapData, 'pieData': pieObj});
                        pieObj = [];                    
                    }

                    iRank++;
                    mapData = { 'provinceCode': results[i].provinceCode, 
                                'provinceName': results[i].provinceName,
                                'prov_Population' : results[i].prov_Population,
                                'prov_RecyclingContribPerc' : results[i].prov_RecyclingContribPerc,
                                'prov_populationPercOverCountry' : results[i].prov_populationPercOverCountry,                                
                                'prov_TotalRecycling' : results[i].prov_TotalRecycling,
                                'prov_TotalWaste' : results[i].prov_TotalWaste,
                                'prov_Industries' : results[i].prov_Industries,
                                'prov_Employees' : results[i].prov_Employees,                                                                
                                'prov_WasteRecyclingPerc' : results[i].prov_WasteRecyclingPerc,
                                'prov_Rank' : iRank,
                                'prov_Population_Rank' : 0
                              };
                }  
                pieObj.push( {'familyName': results[i].familyName, 'familyTotalRecycling':results[i].familyTotalRecycling, 'familyPercent':results[i].familyPercent } );
                sProvince = results[i].provinceCode;                
            }            

            if (mapData != {}) {
                myResult.push( {mapData, 'pieData': pieObj });
            }

            // Sort object to get population rank
            myResult.sort((a, b) => (a.mapData.prov_populationPercOverCountry < b.mapData.prov_populationPercOverCountry) ? 1 : -1)
            for (let i=0; i < myResult.length; i++) {
                myResult[i].mapData.prov_Population_Rank = i+1;
            }    

            res.status(200).send(myResult);
        }    
    });   
});


// Returns a list of all team members
app.get("/api/v1/team", (req,res)=>{

    let qry = `SELECT t.name, r.name AS role, t.imageURL, t.linkedinURL, t.githubURL, t.behanceURL
                    FROM teammember t
                        INNER JOIN teamrole r ON (t.teamRoleId = r.teamRoleId)
                ORDER BY t.name`;

    savyDb.query(qry, (error, results)=>{
        if (error) throw error;
        if (results.length == 0) {
            res.status(404).send('No Record Found');            
        } else {
            res.status(200).send(results);
        }    
    });   
});


// Returns a list of all quiz questions and answers
app.get("/api/v1/quiz", (req,res)=>{

    let qry = `SELECT q.questionId, q.question, q.description, a.answer, 
                      CASE WHEN a.correct = 1 THEN 'yes' ELSE 'no' END AS correct
                 FROM quizquestion q
                      INNER JOIN quizanswer a ON (q.questionId = a.questionId)
                ORDER BY q.questionId, a.answerId  `;

    savyDb.query(qry, (error, results)=>{
        if (error) throw error;
        if (results.length == 0) {
            res.status(404).send('No Record Found');            
        } else {

            let myResult = [];
            let myAnswer = [];
            let question = {};
            let iQuestion = -1;

            for (let i=0; i< results.length; i++) {
                if (iQuestion != results[i].questionId) {

                    if (myAnswer.length > 0) {
                        myResult.push( {question, 'answers': myAnswer});
                        myAnswer = [];                    
                    }
                    question = { 'questionId': results[i].questionId, 'question': results[i].question, 'description' : results[i].description };
                }  
                myAnswer.push( {'answer': results[i].answer, 'correct':results[i].correct} );
                iQuestion = results[i].questionId;                
            }            

            if (question != {}) {
                myResult.push( {question, 'answers': myAnswer });
            }

            res.status(200).send(myResult);
        }    
    });   
});


// Returns a list of all FAQ questions
app.get("/api/v1/faq", (req,res)=>{

    let qry = `SELECT f.faqId, f.postedOn, f.question, f.answer
                 FROM faq f
                ORDER BY f.question  `;

    savyDb.query(qry, (error, results)=>{
        if (error) throw error;
        if (results.length == 0) {
            res.status(404).send('No Record Found');            
        } else {
            res.status(200).send(results);
        }    
    });   
});


// Returns a list of all TESTEMONIALS report
app.get("/api/v1/testemonials", (req,res)=>{

    let qry = `SELECT t.testemonialId, t.postedOn, t.postedBy, t.imageURL, t.description
                 FROM testemonial t
                 ORDER BY t.postedOn   `;

    savyDb.query(qry, (error, results)=>{
        if (error) throw error;
        if (results.length == 0) {
            res.status(404).send('No Record Found');            
        } else {
            res.status(200).send(results);
        }    
    });   
});


// Returns a list of all TESTEMONIALS report
app.get("/api/v1/materials", (req,res)=>{

    let qry = `SELECT "material" AS type, m.materialId AS id, m.name AS materialName
                 FROM material m 
                UNION  
               SELECT "family" AS type, f.familyId AS id, f.name AS materialName
                 FROM family f 
                WHERE EXISTS ( SELECT 1 FROM material m WHERE m.familyId = f.familyId )
                ORDER BY materialName   `;

    savyDb.query(qry, (error, results)=>{
        if (error) throw error;
        if (results.length == 0) {
            res.status(404).send('No Record Found');            
        } else {
            res.status(200).send(results);
        }    
    });   
});





// Search a location for a material
app.get("/api/v1/search", (req,res)=>{

    let mySearch = async (req) => {
        
        //let sApiFilter = "";
        let zipCodeCordinate =  {'latitude' : req.query.latitude, 'longitude' : req.query.longitude }        
        if ((req.query.filterRange != undefined) && (req.query.filterRange == 'true') ) {

            // Get cordinates from user location
            if ((req.query.latitude  != undefined) && (req.query.latitude  != '') &&
                (req.query.longitude != undefined) && (req.query.longitude != '')) {
                  zipCodeCordinate =  {'latitude' : req.query.latitude, 'longitude' : req.query.longitude } 
            } else {
              // Get cordinates from ZipCode   
              if ((req.query.zipCode != undefined) && (req.query.zipCode != '')) {

                let getMyCordinateAPI = new Promise((resolve, reject) => {

                  let zipCodeApiKey         = `5CTJKU60V33QGEGWCSFW`;
                  let zipCode               = `${req.query.zipCode}`;  // `V6B1B4`;
                  let zipCodeApi = `https://api.zip-codes.com/ZipCodesAPI.svc/1.0/QuickGetZipCodeDetails/${zipCode}?key=${zipCodeApiKey}`;
              
                  fetch(zipCodeApi)
                  .then((res) => {
                      res.json().then((data) => {
                          if (data.err) {
                              console.log(err);
                              reject ({});
                          } else {
                              resolve ( {'latitude' : data.Latitude, 'longitude' : data.Longitude } );
                          }   
                      })
                  })
                });
              
                zipCodeCordinate = await getMyCordinateAPI; // wait until the promise resolves (*)
              } 
            } 

            //console.log(zipCodeCordinate);            

            // if (zipCodeCordinate.latitude != undefined && zipCodeCordinate.longitude != undefined) {

            //     let getZipCodeAPI = new Promise((resolve, reject) => {

            //         let zipCodeApiKey         = `C3TxsgWGYzdRIPOlk1yaRoyLPTJrSojipPbYtQy51B55BSm3LxMxVUCNfab95sKE`;
            //         let zipCodeLatitude       =  `${zipCodeCordinate.latitude}`;  // `49.279750`;
            //         let zipCodeLongitude      =  `${zipCodeCordinate.longitude}`; // `-122.967925`;
            //         let zipCodeLatitudeField  = `l.latitude`;
            //         let zipCodeLongitudeField = `l.longitude`;
            //         let zipCodeRange          = `20`;  // default kilometers for range search
            //         if ((req.query.range != undefined) && (req.query.range > 0)) {
            //             zipCodeRange          = `${req.query.range}`;                    
            //         }    
    
            //         let zipCodeApi = `https://www.zipcodeapi.com/rest/${zipCodeApiKey}/radius-sql.json/${zipCodeLatitude}/${zipCodeLongitude}/degrees/${zipCodeRange}/km/${zipCodeLatitudeField}/${zipCodeLongitudeField}/2`
                
            //         fetch(zipCodeApi)
            //         .then((res) => {
            //             res.json().then((data) => {
            //                 if (data.err) {
            //                     console.log(err);
            //                     reject (``);
            //                 } else {
            //                     resolve (` AND ${data.where_clause} `);
            //                 }   
            //             })
            //         })
            //     });
                
            //     sApiFilter = await getZipCodeAPI; // wait until the promise resolves (*)

            // } else {
            //     sApiFilter = ` AND 1=2 `;  // invalid zip code, will not return any result
            // }
        }

        //console.log(`Finish Promise Zip`);
        //console.log(sApiFilter);

        // Initialize default values
        let sOrigin      = "";
        let sRangeFilter = "";
        let zipCodeRange = `20`;                  // default kilometers for range search 
        let sDistance    = ` null AS distance `;  // default doesn't have origin cordinates     
        let sWhere       = " WHERE 1=1";          // + sApiFilter;
    
        // Material and Family Parameters
        if ((req.query.materialId != undefined) && (req.query.materialId != "")) {
           sWhere = sWhere + ` AND m.materialId = ${req.query.materialId} `;
           sOrigin = ` "material" AS origin, m.name AS material, `;
        } else {
            if ((req.query.familyId != undefined) && (req.query.familyId != "")) {
                sWhere = sWhere + ` AND f.familyId = ${req.query.familyId} `;
                sOrigin = ` "family" AS origin, f.name AS material, `;            
             }
        }

        // Range Filter Parameters
        if ((req.query.filterRange != undefined) && (req.query.filterRange == 'true') ) { 
            if ((req.query.range != undefined) && (req.query.range > 0)) {
                zipCodeRange = req.query.range;                    
            }
            sRangeFilter = ` HAVING distance <= ${zipCodeRange} `;
        } 
        
        // Distance function Parameters
        if (zipCodeCordinate.latitude != undefined && zipCodeCordinate.longitude != undefined) { 
           sDistance = ` round(ST_Distance_Sphere( point(l.longitude, l.latitude), point(${zipCodeCordinate.longitude}, ${zipCodeCordinate.latitude}) ) * .000621371192, 1) AS distance `;  
        }

        // Set query statement
        let qry = `SELECT DISTINCT 
                          ${sOrigin} 
                          f.name AS familyName, f.recyclingFact, l.locationId, l.distance, m.description, m.imageUrl AS materialImageUrl, m.deliveryNotes,                   
                          l.name AS location, c.name AS city, c.provinceCode, l.postalCode, l.address, l.phone, l.latitude, l.longitude, 
                          l.openningHour, l.website, l.imageUrl, l.locationNotes, om.family_name as otherMaterial 
                     FROM family f  
                          INNER JOIN material m ON (f.familyId = m.familyId)
                          INNER JOIN materialperlocation ml ON (m.materialId = ml.materialId)
                          INNER JOIN ( SELECT l.*, ${sDistance}
                                         FROM location l
                                       ${sRangeFilter} 
                                     ) l ON (ml.locationId = l.locationId)
                          INNER JOIN city c ON (l.cityId = c.cityId)
                          INNER JOIN provinces p ON (c.provinceCode = p.provinceCode AND c.countryCode = p.countryCode) 
                          INNER JOIN (
                                       SELECT f.familyId, m.materialId, l.locationId, 
                                              f.name AS family_name, m.name as material_name
                                         FROM family f  
                                              INNER JOIN material m ON (f.familyId = m.familyId)
                                              INNER JOIN materialperlocation ml ON (m.materialId = ml.materialId)
                                              INNER JOIN location l ON (ml.locationId = l.locationId ) 
                                      ) om ON ( om.locationId = l.locationId AND om.familyId <> f.familyId )
                    ${sWhere}      
                    ORDER BY distance, location, locationId, otherMaterial                         
                   `;
        
        //console.log(`SQL QUERY -----------------------`);
        //console.log(qry);

        savyDb.query(qry, (error, results)=>{
            if (error) throw error;
            if (results.length == 0) {
                res.status(404).send('No Record Found');            
            } else {
                let myResult = [];
                let myLocation = [];
                let otherMaterials = [];
                let material = {};
                let location = {};
                let iLocationId = -1;                

                material = { 'origin': results[0].origin, 'materialName': results[0].material, 
                             'familyName' : results[0].familyName, 
                             'description' : results[0].description, 
                             'imageUrl' : results[0].materialImageUrl, 
                             'deliveryNotes' : results[0].deliveryNotes, 
                             'recyclingFact' : results[0].recyclingFact };            
   
                let i = 0;
                while (i < results.length) {
                   otherMaterials = [];  
                   iLocationId    = results[i].locationId; 

                   location =  {'locationName': results[i].location, 
                                'city':results[i].city, 
                                'provinceCode':results[i].provinceCode, 
                                'postalCode':results[i].postalCode, 
                                'address':results[i].address, 
                                'phone':results[i].phone, 
                                'latitude':results[i].latitude, 
                                'longitude':results[i].longitude,
                                'distance':results[i].distance,  
                                'openningHour':results[i].openningHour, 
                                'website':results[i].website, 
                                'openningHour':results[i].openningHour, 
                                'imageUrl':results[i].imageUrl, 
                                'locationNotes':results[i].locationNotes                                                                                                       
                                } 
                    while ( (i < results.length) && ( iLocationId == results[i].locationId ) ) {
                       otherMaterials.push( {'materialName': results[i].otherMaterial} );
                       i++
                    }
                    myLocation.push( {'locationInfo':location, 'otherMaterials': otherMaterials });
                }

                myResult.push( {material, 'locations': myLocation });

                res.status(200).send(myResult);
            }    
        });   

    };

    mySearch(req);

});

