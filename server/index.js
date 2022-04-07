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

let channels = [{
    name:"Channel 1",
    users:[]
},
{
    name:"Channel 2",
    users:[]
}
]

io.on("connection",(socket) =>{
    socket.join("Channel 1")
    //Get connected user
    io.emit("get_user")

    socket.on("message",(data) =>{
        socket.broadcast.emit("message",{user:data.user,message:data.message})
    })

    socket.on("update_channel",(data) =>{
        if(!channels.find(chan => chan.name === "Channel 1").users.some(user => user.name === data.name)){
         channels.find(chan => chan.name === "Channel 1").users.push({...data,socketId:socket.id})
         socket.broadcast.emit("user_join",channels.find(chan => chan.name === "Channel 1").users)
        }
        socket.emit("get_users",channels)
    })
    
    socket.on("disconnect",() =>{
        const newChannels =  channels.find(chan => chan.name === "Channel 1").users.filter(user => user.socketId !== socket.id)
        if(newChannels !== undefined){
            channels.find(chan => chan.name === "Channel 1").users = newChannels
            socket.broadcast.emit("user_leave",channels)
        }
    })

})


server.listen(3001,() =>{
    console.log('Server listening 3001')
})