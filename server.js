//created a server on port 3000

const express=require("express");

const {createServer}=require("http");
const { Server } = require("socket.io");


const app=express();
const httpServer=createServer(app);


const io = new Server(httpServer,{
    cors:{
        origin:'https://github.com'
    }
});

io.on("connection",(socket)=>{
    console.log(`User connected: ${socket.id}`);
    //from client side
    //need to pass the data to client to notify the user is enterd
    socket.on("username enter",(data)=>{
        console.log("username enter",data) ;
        io.emit("username enter",data);//send the message to all the clients
    });

    socket.on("message",(data)=>{
        io.emit("message",data);
    });

    socket.on("username left", (username) => {
        io.emit("username left", username); // Emitting the username who left to all clients
    });
    
});

//socket-> to make connection



httpServer.listen(3000,()=>{
console.log("listening on 3000");
});

//for createing chat app  we need socket.io library which helps us to chat client->server
