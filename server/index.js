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

/*
    user data
    socketId
    channel

    channel_1
*/

let usersData = new Array(0);

io.on("connection",(socket) =>{
    socket.on("send_message",(data) =>{
        socket.to(usersData).emit("receive_message",{user:data.user,message:data.message})
    })

    socket.on("update_channel",(data) =>{
        if(usersData.length === 0 || usersData.some(user => user.name !== data.user.name)){
            usersData.push({...data.user,channel:data.channel,socketId:socket.id})
            socket.broadcast.emit("on_join",usersData)
        }

        if(usersData.some(user => user.channel !== data.channel) && usersData.some(user => user.name === data.user.name)){
            const filterdUsers = usersData.filter(user => user.name !== data.user.name)
            usersData = [...filterdUsers,{...data.user,channel:data.channel,socketId:socket.id}]
            socket.broadcast.emit("on_join",usersData)
        }
        console.log(io.sockets.adapter.rooms.has(data.channel))
        socket.join(data.channel)
        socket.emit("user_join",usersData)
    })

    // socket.on("channel_change",(data) =>{

    // })
    
    socket.on("disconnect",() =>{
       const filtredUsers = usersData.filter(user => user.socketId !== socket.id)
       if(filtredUsers !== undefined){
           usersData = filtredUsers
           socket.broadcast.emit("user_leave",usersData)
       }
    })

})


server.listen(3001,() =>{
    console.log('Server listening 3001')
})