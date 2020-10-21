const mySql = require('mysql');

// Defines the connection string parameters to the database
// const connectionPool = mySql.createPool({
//         connectionLimit:10,
//         host : 'localhost',
//         user : 'root',
//         password : '',
//         database : 'a1', // this has to be the name of the database you just created.
//         multipleStatements: true
// });

// module.exports = {connectionPool};

// ConnectionString to connect to database
const ConnectionString = {
    connectionLimit:10,
    host: 'localhost',
    database: 'savy',
    user: 'root',
    password: 'root',
    multipleStatements: true
}

// *******************************************************
// ******** Database Connection Setup ********************
// *******************************************************
const savyDb = mySql.createConnection(ConnectionString);

module.exports = {savyDb};
