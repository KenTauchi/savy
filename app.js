// *******************************************************
// ******** NPMs Installed *******************************
// *******************************************************
//
//      1)  npm init -y
//      2)  npm i express
//      3)  npm i mysql
//      4)  npm i promise-sql
//      5)  npm i express-validator
//      6)  npm i nodemon --save-dev  
//      7)  npm i node-fetch
//      8)  npm i dotenv
//      9)  npm i cors
//
// *******************************************************
// ******** Required Modules *****************************
// *******************************************************

const express = require("express");
const app     = express();

// const cors = require('cors');
// app.use(cors())

const { savyDb } = require("./connection.js");

const server = app.listen(process.env.PORT || 3000, () => {
  console.log("listening port 3000");
});

// middleware parse the request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//   app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "*");
//     res.header("Access-Control-Allow-Methods", "*");
//     next();
//   });


const router = require('./routes/index.js');
app.use('/api', router);
