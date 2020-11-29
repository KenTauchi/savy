const { savyDb, savyPoolDb } = require("../connection.js");

// ----------------------------------------------------------
// Returns a list of all FAQ questions
// ----------------------------------------------------------
exports.getFaq = (req, res) => {
    let qry = `SELECT f.faqId, f.postedOn, f.question, f.answer
                   FROM faq f
                  ORDER BY f.faqId `;
  
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
