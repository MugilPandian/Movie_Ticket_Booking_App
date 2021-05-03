const express = require('express');
const router = express.Router();
const app = express();
const connection = require('../../Model/database.js');

connection.connect((err) => {
    if(err) throw err;
    console.log('Connection successful');
})

//Admin Login
router.get('/admin_login',function(req,res){
    console.log("Admin login");
    res.render('admin_login');
})

//User Login
router.get('/user_login',function(req,res){
    console.log("User login");
    res.render('user_login');
})


module.exports = router;