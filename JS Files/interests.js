
localStorage.removeItem(interestsList);
var interestsList = [];


function addInterest(){
    interestsList.innerHTML = "";
    var interest = document.getElementById("interest").value;
    if(!interest) return;
    interestsList.push(interest);
    console.log(interestsList);
    showList();
    document.querySelector("#interest").value = "";
}



function showList(){
    var interestsDiv = document.querySelector("#Interests");
    interestsDiv.innerHTML ="";
    var goToWebsiteBtn;

    interestsList.forEach(function(ele){
        var interestName = document.createElement("text");
        interestName.innerText = ele;
        interestName.style.padding = "15px";

        var div = document.createElement("div");
        div.style.backgroundColor ="white";
        div.style.padding = "10px";
        div.style.margin = "1px";
        div.style.borderRadius = "5px";
        
     
        var deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "✘";
        deleteBtn.style.backgroundColor = "red";
        deleteBtn.style.color = "white";
        deleteBtn.style.margin = "0px 2px";
        deleteBtn.style.float ="right";
        deleteBtn.style.border = "none";
        deleteBtn.style.borderRadius ="5px";
        deleteBtn.onclick = function(){
            interestsList.splice(i,1);
            showList();
        };



        goToWebsiteBtn = document.createElement("button");
        goToWebsiteBtn.innerHTML = "Go To Website";
        goToWebsiteBtn.style.color = "white";
        goToWebsiteBtn.style.backgroundColor = "rgb(84, 59, 228)";
        goToWebsiteBtn.style.border = "none";
        goToWebsiteBtn.style.borderRadius = "5px";
        goToWebsiteBtn.style.padding = "10px 20px";
        goToWebsiteBtn.style.margin = "20px";
        goToWebsiteBtn.onclick = function(){
            window.location.href = "home.html"
        }


        div.appendChild(interestName);
        div.appendChild(deleteBtn);
        interestsDiv.appendChild(div);
    })   
    
    interestsDiv.appendChild(goToWebsiteBtn);

    localStorage.setItem("interestsList", JSON.stringify(interestsList));
    console.log(interestsList);
}

   
