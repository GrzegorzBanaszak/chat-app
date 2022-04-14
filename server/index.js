const express = require('express');
const http = require("http")
const socketIo = require('socket.io')
const cors = require('cors')

const router = require("./router.js")

const app = express();
app.use(cors())
app.use(router)
const server = http.createServer(app)
const io = socketIo(server,{
    cors:{
        origin:["http://localhost:3000"],
        methods:["GET","POST","DELETE"]
    },
})




const PORT = 3001

/*
    user data
    socketId
    channel

    channel_1
*/

let usersData = new Array(0);

io.on("connection",(socket) =>{

    socket.join("channel1")

    socket.on("send_message",(data) =>{
        socket.to(data.message.channel).emit("receive_message",{message:data.message})
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


server.listen(process.env.PORT || PORT,() =>{
    console.log('Server listening 3001')
})