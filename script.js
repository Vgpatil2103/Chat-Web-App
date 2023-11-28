let username=' ';

document.getElementById("join-btn").addEventListener("click",(event)=>{
    event.preventDefault();

    username=document.getElementById("username-input").value;
    
    if(username!=""){
        document.getElementById("name").innerText=username;
        document.querySelector(".form-username").style.display="none";
        document.querySelector(".chatroom-container").style.display="block";
    }
    else{
        alert("Username Cannot Be empty");
    }

})