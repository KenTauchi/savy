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

    let qry = `SELECT md.provinceCode, md.provinceName,
                      md.prov_Population, md.prov_RecyclingContribPerc,
                      md.prov_TotalRecycling, md.prov_TotalWaste, md.prov_WasteRecyclingPerc,
                      pd.familyName, pd.familyTotalRecycling, pd.familyPercent
                 FROM (
                        SELECT p.countryCode, p.provinceCode, p.provinceName, 
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
                ) md,
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
                            INNER JOIN provinces p ON (d.provinceCode = p.provinceCode AND d.countryCode = p.countryCode )
                            INNER JOIN ( SELECT d2.countryCode, d2.provinceCode,
                                                SUM(d2.value) AS total
                                           FROM datacontent d2
                                                INNER JOIN informationtype t2 ON (d2.informationTypeID = t2.informationTypeID)
                                                INNER JOIN family f2 ON (t2.familyId = f2.familyId)
                                          WHERE t2.familyId IN(2,3,4,5,6,7,8,9)
                                            AND d2.year = 2016        
                                          GROUP BY d2.countryCode, d2.provinceCode
                                        ) tp ON (p.provinceCode = tp.provinceCode and p.countryCode = tp.countryCode )
                    WHERE t.familyId IN(2,3,4,5,6,7,8,9)
                      AND d.year = 2016
                    GROUP BY p.countryCode, p.provinceCode, p.provinceName, f.name         
                ) pd
                WHERE md.provinceCode = pd.provinceCode
                  AND md.countryCode  = pd.countryCode
                ORDER BY provinceName, familyName   
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

            for (let i=0; i< results.length; i++) {
                if (sProvince != results[i].provinceCode) {

                    if (pieObj.length > 0) {
                        myResult.push( {mapData, 'pieData': pieObj});
                        pieObj = [];                    
                    }
                    mapData = { 'provinceCode': results[i].provinceCode, 
                                'provinceName': results[i].provinceName,
                                'prov_Population' : results[i].prov_Population,
                                'prov_RecyclingContribPerc' : results[i].prov_RecyclingContribPerc,
                                'prov_TotalRecycling' : results[i].prov_TotalRecycling,
                                'prov_TotalWaste' : results[i].prov_TotalWaste,
                                'prov_WasteRecyclingPerc' : results[i].prov_WasteRecyclingPerc
                              };
                }  
                pieObj.push( {'familyName': results[i].familyName, 'familyTotalRecycling':results[i].familyTotalRecycling, 'familyPercent':results[i].familyPercent } );
                sProvince = results[i].provinceCode;                
            }            

            if (mapData != {}) {
                myResult.push( {mapData, 'pieData': pieObj });
            }

            res.status(200).send(myResult);
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


// Returns a list of all quiz questions and answers
app.get("/api/v1/quiz", (req,res)=>{

    let qry = `SELECT Q.questionId, Q.question, q.description, a.answer, 
                      CASE WHEN a.correct = 1 THEN 'yes' ELSE 'no' END AS correct
                 FROM quizquestion Q
                      INNER JOIN quizanswer A ON (Q.questionId = A.questionId)
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

