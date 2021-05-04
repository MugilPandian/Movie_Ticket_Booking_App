const mysql = require('mysql2/promise');
const mysql1 = require('mysql2');
const connect = mysql1.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'movie_booking',
    port:'3301'
});

module.exports = connect;