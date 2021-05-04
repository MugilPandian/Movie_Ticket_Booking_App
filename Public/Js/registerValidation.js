function isValid() {
    var name=document.getElementById("name").value;
    var nameReg=/^[A-Za-z ]+$/;
    alert(name.match(/^[A-Za-z ]+$/));
    alert(name.length);
    if(name.match(nameReg)===null){
        document.getElementById("nameHelp").innerHTML="";
    }
    else if(name.length==0) {
        document.getElementById("nameHelp").innerHTML="Enter Your Name";
        return false;
    }
    else {
        document.getElementById("nameHelp").innerHTML="Enter a Valid Name";
        return false;
    }
    
    var email=document.getElementById("email");
    var emaiReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.value.match(emailReg))
        document.getElementById("emailHelp").innerHTML="";
    else if(email.value.length===0) {
        document.getElementById("emailHelp").innerHTML="Enter an Email ID";
        return false;
    }
    else {
        document.getElementById("emailHelp").innerHTML="Enter a Valid Email ID";
        return false;
    }

    var pwd=document.getElementById("password");
    if(pwd.value.length===0) {
        document.getElementById("pwdHelp").innerHTML="Enter a Password";
        return false;
    }
    else if(pwd.value.length<9) {
        document.getElementById("pwdHelp").innerHTML="Password must contain atleast 8 characters";
        return false;
    }
    else 
        document.getElementById("pwdHelp").innerHTML="";

    var cpwd = document.getElementById("Cpassword");
    if(cpwd.value.length===0) {
        document.getElementById("cpwdHelp").innerHTML="Enter a Password to Confirm";
        return false;
    }

    if(pwd.value === cpwd.value){
        alert("Registration Successfull !");
    }
    else {
        document.getElementById("pwdHelp").innerHTML="Passwords do not match";
        return false;
    }
}