const express = require('express');
const app = express();
const http = require("http")
const {Server} = require('socket.io')
const cors = require('cors')

app.use(cors())

const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:["http://localhost:3000","http://192.168.0.104:3000"],
        methods:["GET","POST","DELETE"]
    },
})

io.on("connection",(socket) =>{
    console.log(socket.id)

    
    socket.on("message",(data) =>{
        console.log(data)
        socket.broadcast.emit("message",{user:data.user,message:data.message})
    })
})


server.listen(3001,() =>{
    console.log('Server listening 3001')
})