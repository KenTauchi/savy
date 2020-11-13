const { savyDb, savyPoolDb } = require("../connection.js");

// Returns a list of all team members
exports.getTeam = (req, res) => {
    let qry = `SELECT t.name, r.name AS role, t.imageURL, t.linkedinURL, t.githubURL, t.behanceURL
                      FROM teammember t
                          INNER JOIN teamrole r ON (t.teamRoleId = r.teamRoleId)
                  ORDER BY t.name`;
  

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
  




  // exports.getTeam = (req, res) => {
  //   let qry = `SELECT t.name, r.name AS role, t.imageURL, t.linkedinURL, t.githubURL, t.behanceURL
  //                     FROM teammember t
  //                         INNER JOIN teamrole r ON (t.teamRoleId = r.teamRoleId)
  //                 ORDER BY t.name`;
  
  //   savyDb.query(qry, (error, results) => {
  //     if (error) {
  //       throw error;
  //     }
  //     if (results.length == 0) {
  //       res.status(404).send("No Record Found");
  //     } else {
  //       res.status(200).send(results);
  //     }
  //   });
  // };
  

