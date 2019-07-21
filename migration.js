
const mysql = require('mysql');
const migration = require('mysql-migrations');
const config = require('./config.json')

var connection = mysql.createPool(config.database);

migration.init(connection, __dirname + '/migrations');