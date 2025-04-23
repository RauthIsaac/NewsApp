var _username = document.getElementById("user");
var _password = document.getElementById("pass");
var _newUsername = document.getElementById("newUser");
var _newPassword = document.getElementById("newPass");
var _repeatedPassword = document.getElementById("repeatedPass");
var signInBtn = document.getElementById("signInBtn");
var signUpBtn = document.getElementById("signUpBtn");
var submitBtn = document.getElementById("submitBtn")

var userList=[];
var user;

if(signInBtn){

signInBtn.onclick = function(){
    user = {
        userName: _username.value,
        password: _password.value,
    }

    if(!_username.value || !_password.value){
        alert("Please enter both username and password");
        return;
    }

    var userExists = false;
    var passwordCorrect = false;

    for(var i = 0; i < userList.length; i++){
        if(_username.value === userList[i].userName){
            userExists = true;
            if (_password.value == userList[i].password) {
                passwordCorrect = true;
                break;
            }
        }
    }

    console.log(userExists);
    console.log(passwordCorrect);


    if(userExists){
        if(passwordCorrect){
            console.log("Welcome");
            window.location.href = "interests.html";
        } else{
            alert("Incorrect Password! Please try again.");
        }
    }

    localStorage.setItem("userList", JSON.stringify({userList}));
    const username = JSON.parse(localStorage.getItem("serList"));
    console.log(userList);

    localStorage.setItem("username", JSON.stringify({name: _username.value}));
    console.log(username);


    _username.value = "";
    _password.value = "";
    
}

}


if(signUpBtn){
signUpBtn.addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = "signUp.html" 
})
}



if(submitBtn){
submitBtn.addEventListener('click', function(event) {
    event.preventDefault();

    user = {
        userName: _newUsername.value,
        password: _newPassword.value,
    }
    if(!_newUsername.value || !_newPassword.value || !_repeatedPassword.value){
        alert("Please complete your data");
        return;
    }

    var userExists = false;
    var passwordCorrect = false;

    for(var i = 0; i < userList.length; i++){
        if(_newUsername.value === userList[i].userName){
            userExists = true;
            if (_newPassword.value == userList[i].password) {
                passwordCorrect = true;
                break;
            }
        }
    }
    

    if(userExists){
        alert("Username already exists! Please choose another one.");
    }else{
        if(_newPassword.value !== _repeatedPassword.value){
            alert("Password does not match! Please try again.");
        }else{
            userList.push(user);
            alert("user is added sucssefully");
            window.location.href = "interests.html";
        }
    }


    
        
    localStorage.setItem("userList", JSON.stringify({userList}));
    const username = JSON.parse(localStorage.getItem("serList"));
    console.log(userList);

    localStorage.setItem("username", JSON.stringify({name: _newUsername.value}));
    console.log(username);

})


}



