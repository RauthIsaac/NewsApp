var allItems=[];
var searchItems=[];
var countryLinks = document.querySelectorAll('nav li');
var searchInput = document.querySelector('#search');
var dateFrom = document.querySelector('#DateFrom');
var dateTo = document.querySelector('#DateTo');
var logOutBtn = document.querySelector('#logOutBtn');


const username = JSON.parse(localStorage.getItem("username"));
console.log(username.name);

const interestsList = JSON.parse(localStorage.getItem("interestsList"));
console.log(interestsList);



/*********************************************/
var userData = {
    Name: username.name,
    Interests : interestsList
}

var userExists = false;

var storedUserNameAndInterests = JSON.parse(localStorage.getItem("userNameAndInterests"));
var userNameAndInterests = Array.isArray(storedUserNameAndInterests) ? storedUserNameAndInterests : [];

if(userNameAndInterests.length == 0) userNameAndInterests.push(userData)
else{
    for(var i=0; i<userNameAndInterests.length; i++){
        if(userData.Name == userNameAndInterests[i].Name){
            console.log("userData is already added to the list");
            userExists = true;
            break;
        }
    }
    if(!userExists){
        console.log("New UserData will be added");
        userNameAndInterests.push(userData);
    }
}    

console.log(userNameAndInterests);

localStorage.setItem("userNameAndInterests", JSON.stringify(userNameAndInterests));
var newUserData = JSON.parse(localStorage.getItem("userNameAndInterests"))
console.log(newUserData);
/*********************************************/




for( var i=0 ; i<countryLinks.length;i++)
{
   countryLinks[i].addEventListener('click',function(eventInfo)
   {
       var countryCode = eventInfo.target.getAttribute('countryCode');
       getNews(countryCode);
       console.log(eventInfo.target);
   })
}


/********************************************************************************/


 function getNews (Title,From,To)
 {

    var myHttp = new XMLHttpRequest();

    if(From != "" && To != "")
    {
       myHttp.open('GET',`https://newsapi.org/v2/everything?q=${Title}&from=${From}&to=${To}&apiKey=de9b549ad89e453db4c348617c925e0c`);
       console.log(`https://newsapi.org/v2/everything?q=${Title}&from=${From}&to=${To}&apiKey=de9b549ad89e453db4c348617c925e0c`);
    }
    else if(From != "" && To == "")
    {
        myHttp.open('GET',`https://newsapi.org/v2/everything?q=${Title}&from=${From}&apiKey=de9b549ad89e453db4c348617c925e0c`);
        console.log(`https://newsapi.org/v2/everything?q=${Title}&from=${From}&apiKey=de9b549ad89e453db4c348617c925e0c`);
    }
    else if(From == "" && To != "")
    {
        myHttp.open('GET',`https://newsapi.org/v2/everything?q=${Title}&to=${To}&apiKey=de9b549ad89e453db4c348617c925e0c`);
        console.log(`https://newsapi.org/v2/everything?q=${Title}&to=${To}&apiKey=de9b549ad89e453db4c348617c925e0c`);
    }
    else
    {
        myHttp.open('GET',`https://newsapi.org/v2/everything?q=${Title}&apiKey=de9b549ad89e453db4c348617c925e0c`);
        console.log(`https://newsapi.org/v2/everything?q=${Title}&apiKey=de9b549ad89e453db4c348617c925e0c`);
    }
   
    myHttp.send();

    myHttp.addEventListener('readystatechange',function()
    {
        if(myHttp.readyState==4)
        {
           allItems = JSON.parse(myHttp.response).articles;
           displayNews();
        }

    }
)}

function displayNews()
{
    var box = ``;
    for(var i=0 ; i < allItems.length ; i++)
    {
        box += `<div class="col-md-3">
                    <div class="item">
                    <img class="w-100" src="${allItems[i].urlToImage}"/>
                    <h2>${allItems[i].title}</h2>
                    <p>${allItems[i].publishedAt}</p>
                    <p>${allItems[i].description}</p>
                    </div>
                </div>`
    }
    document.getElementById('rowData').innerHTML = box;
}



/**********************************************************************/
if(logOutBtn){
    logOutBtn.onclick = function(){
        window.location.href = "../signUp.html";
    }
}