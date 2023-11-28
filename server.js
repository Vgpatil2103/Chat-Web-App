//created a server on port 3000

const express=require("express");

const {createServer}=require("http");
const { Server } = require("socket.io");


const app=express();
const httpServer=createServer(app);


const io = new Server(httpServer,{
    cors:{
        origin:'http://127.0.0.1:5500'
    }
});

io.on("connection",(socket)=>{
    console.log(`User connected: ${socket.id}`);
});

//socket-> to make connection
// socket.on("message",(data)=>{

// })


httpServer.listen(3000,()=>{
console.log("listening on 3000");
});

//for createing chat app  we need socket.io library which helps us to chat client->server