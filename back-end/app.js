// *******************************************************
// ******** NPMs Installed *******************************
// *******************************************************
//
//      1)  npm init -y
//      2)  npm i express
//      3)  npm i mysql
//      4)  npm i express-validator
//
// *******************************************************
// ******** Required Modules *****************************
// *******************************************************

const express = require("express");
const app = express();
//const mySql = require('mysql');
const {savyDb} = require("./connection.js");

const server = app.listen(process.env.PORT || 3000, ()=>{
        console.log("listening port 3000");
});


// middleware parse the request body
app.use(express.urlencoded({extended:true}));
app.use(express.json());



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

    let qry = `SELECT p.provinceCode, p.provinceName, 
                    -- MIN(ctr.ctr_population) AS ctr_Population, MIN(ctr.ctr_recycling) AS ctr_Recycling, 
                    MIN(p.population) AS prov_Population,
                    ROUND((SUM(CASE WHEN dc.informationTypeID = 1 THEN dc.value ELSE 0 END) / MIN(ctr.ctr_recycling) * 100),2)  AS prov_RecyclingContribPerc,
                    SUM(CASE WHEN dc.informationTypeID = 1  THEN dc.value ELSE 0 END) AS prov_TotalRecycling,
                    SUM(CASE WHEN dc.informationTypeID = 14 THEN dc.value ELSE 0 END) AS prov_TotalWaste,
                    ROUND((SUM(CASE WHEN dc.informationTypeID = 1  THEN dc.value ELSE 0 END) / SUM(CASE WHEN dc.informationTypeID = 14 THEN dc.value ELSE 0 END) * 100),2)  AS prov_WasteRecyclingPerc      
                FROM datacontent dc
                    INNER JOIN provinces p ON (dc.provinceCode = p.provinceCode AND dc.countryCode = p.countryCode)
                    INNER JOIN informationtype it ON (dc.informationTypeID = it.informationTypeID)
                    INNER JOIN informationgroup ig ON (it.informationGroupID = ig.informationGroupID)
                    INNER JOIN ( SELECT c.countryCode, 
                                        SUM(p2.population) AS ctr_population,
                                        SUM(dc2.value)     AS ctr_recycling
                                FROM countries c
                                        INNER JOIN provinces p2 on (c.countryCode = p2.countryCode)
                                        LEFT OUTER JOIN datacontent dc2 ON (dc2.provinceCode = p2.provinceCode AND dc2.countryCode = p2.countryCode)
                                WHERE dc2.year = '2016'
                                    AND dc2.informationTypeID = 1 -- All Materials Diverted  
                                GROUP BY c.countryCode
                                ) ctr ON (p.countryCode = ctr.countryCode)
                WHERE ( (it.informationTypeID IN(1)  AND dc.year = 2016) OR -- 1. All Materials Diverted   
                    (it.informationTypeID IN(14) AND dc.year = 2018) )  -- 14.Total Waste           
                GROUP BY p.provinceCode, p.provinceName   
                ORDER BY p.provinceName `;

    savyDb.query(qry, (error, results)=>{
        if (error) throw error;
        if (results.length == 0) {
            res.status(404).send('No Record Found');            
        } else {
            res.status(200).send(results);
        }    
    });   
});


// Returns a list of all team members
app.get("/api/v1/team", (req,res)=>{

    let qry = `SELECT T.name, R.name AS role, T.imageURL, T.linkedinURL, T.githubURL, T.behanceURL
                    FROM teammember T
                        INNER JOIN teamrole R ON (T.teamRoleId = R.teamRoleId)
                ORDER BY T.name`;

    savyDb.query(qry, (error, results)=>{
        if (error) throw error;
        if (results.length == 0) {
            res.status(404).send('No Record Found');            
        } else {
            res.status(200).send(results);
        }    
    });   
});

