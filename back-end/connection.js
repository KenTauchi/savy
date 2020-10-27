const mySql = require('mysql');

// ConnectionString to connect to database
// const ConnectionString = {
//     connectionLimit:10,
//     host: 'localhost',
//     database: 'savy',
//     user: 'root',
//     password: 'root',
//     multipleStatements: true
// }

const ConnectionString = {
    connectionLimit:10,
    host: '34.212.131.115',
    database: 'savy',
    user: 'savy-user',
    password: '9LpsjjT6Pn<0',
    multipleStatements: true
}


// *******************************************************
// ******** Database Connection Setup ********************
// *******************************************************
const savyDb = mySql.createConnection(ConnectionString);

module.exports = {savyDb};
