// Get form elements
var form = document.getElementById("form");
var error_message = document.getElementById("error-message");

// Get input fields
var _newUsername = document.getElementById("newUser");
var _newEmail = document.getElementById("newEmail");
var _newPassword = document.getElementById("newPass");
var _repeatedPassword = document.getElementById("repeatedPass");
var submitBtn = document.getElementById("submitBtn");

var _useremail = document.getElementById("useremail");
var _password = document.getElementById("pass");


// Load user data from localStorage
var storedData = JSON.parse(localStorage.getItem("userList"));
var userList = Array.isArray(storedData) ? storedData : [];

// Handle form submission
if(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let errors = [];
        
        if(_newUsername) {
            var user = {
                userName: _newUsername.value,
                email: _newEmail.value,
                password: _newPassword.value
            };

            var userExists = false;
            var emailExits = false;
        
            // Check if username or email already exists
            for(var i = 0; i < userList.length; i++) {
                if(_newUsername.value === userList[i].userName) {
                    userExists = true;
                    if(_newEmail.value === userList[i].email) {
                        emailExits = true;
                    }
                }
            }

            if(userExists) {
                errors.push("Username already exists");
            }
            if(emailExits) {
                errors.push("Email already exists");
            }
        
            // If we have a _newUsername input then we are in the signup page
            const validationErrors = getSignupFormErrors(_newUsername.value, _newEmail.value, _newPassword.value, _repeatedPassword.value);
            errors = [...errors, ...validationErrors];
            // Display errors or submit form
            if(errors.length > 0) {
                error_message.innerText = errors.join(". ");
            } else {
                userList.push(user);
                localStorage.setItem("userList", JSON.stringify(userList));
                localStorage.setItem("username", JSON.stringify({name: user.userName}));

                alert("User is added successfully");
                window.location.href = "interests.html";
            }

            console.log(storedData);
            console.log(userList);
           
        }

        if(_useremail){
            let error = []
            var user = {
                email: _useremail.value,
                password: _password.value
            };

            var emailExits = false;
            var passwordCorrect = false;

            for(var i = 0; i < userList.length; i++) {
                if(_useremail.value === userList[i].email) {
                    emailExits = true;
                    if(_password.value === userList[i].password) {
                        passwordCorrect = true;
                    }
                    if(emailExits && passwordCorrect){
                        console.log("emailExits && passwordCorrect");
                        
                        var registeredUserName = userList[i].userName;
                        console.log(registeredUserName);
                        
                        var userName;
                        user["userName"] = registeredUserName;
                        console.log(user);
                        
                    }
                }              
            }

            
            // If we have a _useremail input then we are in the signip page
            const validationErrors = getSigninFormErrors( _useremail.value,_password.value);
            errors = [...errors, ...validationErrors];
            // Display errors or submit form
            if(errors.length > 0) {
                error_message.innerText = errors.join(". ");
            }else{
                if(emailExits){
                    if(passwordCorrect){
                        alert("welcome back");        
                        localStorage.setItem("username", JSON.stringify({name: user.userName}));
                        const username = JSON.parse(localStorage.getItem("username"));
                        console.log(username.name);             
                        window.location.href = "home.html";
                    }else{
                        error.push("Password is not correct. Please try again");
                    }
                }
            }

            console.log("storedData:");
            console.log(storedData);
            console.log("userlist");
            console.log(userList);
            
            
        }
        
        
    });
}

// Validation functions
function getSignupFormErrors(username, email, password, repeatedPassword) {
    let errors = [];
    
    if(username === '' || username == null) {
        errors.push('User name is required');
        _newUsername.parentElement.classList.add('incorrect');
    }
    
    if(email === ''||  email == null) {
        errors.push('Email is required');
        _newEmail.parentElement.classList.add('incorrect');
    }
    
    if(password === '' || password == null) {
        errors.push('Password is required');
        _newPassword.parentElement.classList.add('incorrect');
    }
    
    if(password.length < 8) {
        errors.push('Password must have at least 8 characters');
        _newPassword.parentElement.classList.add('incorrect');
    }
    
    if(password !== repeatedPassword) {
        errors.push('Password does not match repeated password');
        _newPassword.parentElement.classList.add('incorrect');
        _repeatedPassword.parentElement.classList.add('incorrect');
    }

    return errors;
}

function getSigninFormErrors(_useremail, _password) {
    let errors = [];
    
    if(_useremail === '' || _useremail == null) {
        errors.push('Email is required');
        _useremail.parentElement.classList.add('incorrect');
    }
    
    if(_password === '' || _password == null) {
        errors.push('Password is required');
        _password.parentElement.classList.add('incorrect');
    }
    
    return errors;
}

// Remove error styling on input
var allInputs = [_newUsername, _newEmail, _newPassword, _repeatedPassword];

allInputs.forEach(input => {
    if(input) {
        input.addEventListener('input', () => {
            if(input.parentElement.classList.contains('incorrect')) {
                input.parentElement.classList.remove('incorrect');
                error_message.innerText = '';
            }
        });
    }
});