const mysql = require('mysql2');
const connect = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'movie_booking',
    port:'3301'
});

module.exports = connect;