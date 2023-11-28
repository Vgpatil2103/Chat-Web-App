//to make connection with the server
const socket=io("http://localhost:3000");


let username=' ';

document.getElementById("join-btn").addEventListener("click",(event)=>{
    event.preventDefault();

    username=document.getElementById("username-input").value;
    
    if(username!=""){
        document.getElementById("name").innerText=username;
        document.querySelector(".form-username").style.display="none";
        document.querySelector(".chatroom-container").style.display="block";
        socket.emit(username,"joined the chat");
    }
    else{
        alert("Username Cannot Be empty");
    }

})

document.getElementById("send-btn").addEventListener("click",(event)=>{
event.preventDefault();
document.getElementById("msg-input").value="";
//to get username and message
const data={
    username:username,
    message:document.getElementById("msg-input").value
}

addMessage(data,true);

});

//flag=>to check we have recveived a msg or it is sent
function addMessage(data,flag){
    //we have to check the msg that we have sent it or other have sent it
 let msgDIv=document.createElement("div");
 msgDIv.innerText=`${data.username}:${data.message}`;

if(flag){
msgDIv.setAttribute("class","message sent")
}
else{
    msgDIv.setAttribute("class","message recieved")
}
document.getElementById("msg-container").appendChild(msgDIv);

}