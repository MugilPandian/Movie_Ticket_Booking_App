const express = require('express');
const router = express.Router();
const app = express();
const connection = require('../../Model/database.js');

connection.connect((err) => {
    if(err) throw err;
    console.log('Connection successful');
})

//Admin Login
router.get('/adminlogin',function(req,res){
    console.log("Admin login");
    res.render('admin_login');
})


router.post('/admin_validate',function(req,res){
    var email=req.body.Email;
    var pass=req.body.Pwd;
        connection.query('SELECT Admin_Pwd FROM AdminList WHERE Admin_Email = ?',[email],(err,results)=>{
            console.log(results[0].Admin_Pwd)
            if(pass === results[0].Admin_Pwd)
            {
                /*Query to count the votes as per name*/
                connection.query("SELECT * FROM MovieList GROUP BY Movie_Name",(err,result) => {
                    if(err) throw err;
                    else {
                        var obj = {det:result};
                        res.render('movie_admin',obj);
                    }
                    
                });
            }
            else {
                res.render('admin_login')
            }
        });
})

//User Login
router.get('/userlogin',function(req,res){
    console.log("User login");
    res.render('user_login');
})

//User Register

router.get('/reg',function(req,res){
    console.log("User Registration");
    res.render('user_register');
})

router.post('/userreg',function(req,res){
    console.log("User Reg");
    var i=3;
    var id="U0"+(i++);
    
    var name=req.body.Name;
    var email=req.body.Email;
    var pwd=req.body.Pwd;
    
    connection.query('INSERT INTO UserList VALUES(?,?,?,?)',[id,name,email,pwd]);
    res.render('user_login');
})

module.exports = router;