const { savyDb, savyPoolDb } = require("../connection.js");

// Returns a list of all quiz questions and answers
exports.getQuiz = (req, res) => {

    let slimit = ``;
    if ((req.query.limit != undefined) && (req.query.limit > 0)) {
       sLimit = savyDb.escape(req.query.limit).replace(/['']+/g, '')
       slimit = ` LIMIT ${sLimit} `;
    }

    let qry = `SELECT q.questionId, q.question, q.description, a.answer, 
                      CASE WHEN a.correct = 1 THEN 'yes' ELSE 'no' END AS correct
                 FROM (SELECT * 
                         FROM quizquestion
                        ORDER BY RAND() ${slimit} 
                      ) q
                      INNER JOIN quizanswer a ON (q.questionId = a.questionId)`;
  
    savyPoolDb.then(pool =>{
      pool.query(qry)
          .then(results => {
              if (results.length == 0) {
                res.status(404).send("No Record Found");
              } else {

                let myResult  = [];
                let myAnswer  = [];
                let question  = {};
                let iQuestion = -1;
          
                for (let i = 0; i < results.length; i++) {
                  if (iQuestion != results[i].questionId) {
                    if (myAnswer.length > 0) {
                      myResult.push({ question, answers: myAnswer });
                      myAnswer = [];
                    }
                    question = {
                                 questionId:  results[i].questionId,
                                 question:    results[i].question,
                                 description: results[i].description,
                    };
                  }
                  myAnswer.push({
                                  answer:  results[i].answer,
                                  correct: results[i].correct,
                  });
                  iQuestion = results[i].questionId;
                }
          
                if (question != {}) {
                  myResult.push({ question, answers: myAnswer });
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
  