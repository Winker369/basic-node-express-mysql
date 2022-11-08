let mysql = require('mysql')
let migration = require('mysql-migrations');
let connection = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10
})

migration.init(connection, __dirname + '/migrations', function() {}, ["--migrate-all"]);