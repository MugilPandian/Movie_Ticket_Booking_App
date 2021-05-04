const express = require('express');
// const app = express.Router();
const app = express();
const connection = require('../../Model/database.js');
const session = require('express-session');

app.use(session({secret:"scientist21062001",
                resave:false,
                saveUninitialized:false}))



connection.connect((err) => {
    if(err) throw err;
    console.log('Connection successful');
})

//Admin Login
app.get('/adminlogin',async(req,res)=>{
    console.log("Admin login");
    res.render('admin_login');
})


app.post('/admin_validate',async(req,res)=>{
    var email=req.body.Email;
    var pass=req.body.Pwd;
        connection.query('SELECT Admin_Pwd FROM AdminList WHERE Admin_Email = ?',[email],(err,results)=>{
            console.log(results[0].Admin_Pwd)
            req.session.loggedin = true;
            req.session.username = email;
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
app.get('/userlogin',async(req,res)=>{
    console.log("User login");
    res.render('user_login');
})

//User validation
app.post('/user_validate',async(req,res)=>{
    var email=req.body.Email;
    var pwd=req.body.Pwd;
    connection.query('SELECT User_Pwd FROM UserList WHERE Email_ID = ?',[email],(err,results)=>{
        req.session.loggedin = true;
        req.session.username = email;
        if(pwd===results[0].User_Pwd){
            res.render('movie_user');
        }
        else{
            res.render('user_login');
        }
    })
} )

//User Register

app.get('/reg',async(req,res)=>{
    console.log("User Registration");
    res.render('user_register');
})

app.post('/userreg',async(req,res)=>{
    console.log("User Reg");
    var i=3;
    var id="U0"+(i++);
    
    var name=req.body.Name;
    var email=req.body.Email;
    var pwd=req.body.Pwd;
    
    connection.query('INSERT INTO UserList VALUES(?,?,?,?)',[id,name,email,pwd]);
    res.render('user_login');
})

//Movies
app.post('/movie',async(req,res)=>{
    var movie=req.body.sel;
    var seat=req.body.SEAT;
    if(movie.length>0&&seat>0){
        console.log(movie+" "+seat);
        connection.query('UPDATE MovieList SET Seats_Available = Seats_Available - ?,Seats_Booked=Seats_Booked + ? WHERE Movie_Name = ?',[seat,seat,movie]);
        res.render('booked',{a:movie,b:seat});
    }
})


//404
app.get('*',(req,res)=>{
    res.render('pag404');
    console.log('page not found');
})

//LOGOUT
app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.render('user_login');
})

module.exports = app;

module.exports= app;