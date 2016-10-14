const mysql = require('mysql');

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME
})

connection.connect();

module.exports = connection;
