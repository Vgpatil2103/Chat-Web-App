//to make connection with the server
const socket = io("http://localhost:3000");

let username = " ";

document.getElementById("join-btn").addEventListener("click", (event) => {
  event.preventDefault();

  username = document.getElementById("username-input").value;

  if (username != "") {
    document.getElementById("name").innerText = username;
    document.querySelector(".form-username").style.display = "none";
    document.querySelector(".chatroom-container").style.display = "block";

    //from client to server we send the username
    socket.emit("username enter", username);
  } else {
    alert("Username Cannot Be empty");
  }
});

document.getElementById("send-btn").addEventListener("click", (event) => {
  event.preventDefault();

  //to get username and message
  const data = {
    username: username,
    message: document.getElementById("msg-input").value,
  };

  addMessage(data, true);
  document.getElementById("msg-input").value="";
  //send the msg to server to display al clients
  socket.emit("message", data);
});

//flag=>to check we have recveived a msg or it is sent
function addMessage(data, flag) {
  //we have to check the msg that we have sent it or other have sent it
  let msgDIv = document.createElement("div");
  msgDIv.innerText = `${data.username}:${data.message}`;

  if (flag) {
    msgDIv.setAttribute("class", "message sent");
  } else {
    msgDIv.setAttribute("class", "message recieved");
  }
  document.getElementById("msg-container").appendChild(msgDIv);
}

//from server to clinets
socket.on("username enter", (username) => {
  let msgDIv = document.createElement("div");
  msgDIv.innerHTML = `<div style="text-align: center;"><p> ${username} has joined the chat 🟢</p></div>`;

  document.getElementById("msg-container").appendChild(msgDIv);
});

//to display the message to all clients
socket.on("message", (data) => {
  if (data.username !== username) {
    addMessage(data, false);
  }
});
socket.on("username left",(data)=>{
    if(data!=username){
        let msgDIv = document.createElement("div");
        msgDIv.innerHTML = `<div style="text-align: center;"><p> ${data} has left the chat 🔴 </p></div>`;

  document.getElementById("msg-container").appendChild(msgDIv);
    }
})
document.getElementById("exit-btn").addEventListener("click", () => {
    socket.emit('username left', username); // Emitting 'username left' with the username
    document.querySelector(".form-username").style.display = "block";
    document.querySelector(".chatroom-container").style.display = "none";
    document.getElementById("username-input").value="";
    document.querySelector(".chatroom-container").value = "";


});

