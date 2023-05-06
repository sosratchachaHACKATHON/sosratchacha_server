//var express = require('./config/express');  //이러면 양방향 통신이 안됨
var express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const botName = 'ChatCord BOT';

const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./server/src/app/User/UserDao');

var app = express();
const server = http.createServer(app);
const io = socketio(server);

//먼저 connection 맺어줘야한다. emit이 보내는거고 on은 받는거다
io.on('connection',socket =>{
    socket.on('joinRoom',({username,room})=>{
        const user=userJoin(socket.id,username,room);
        socket.join(user.room);
        socket.emit('message',formatMessage(botName,'Welcome to chatCord'));

        socket.broadcast.to(user.room).emit('message',formatMessage(botName,`${user.username} has joined the chat`));
        io.to(user.room).emit("roomUsers",{
            room:user.room,
            users:getRoomUsers(user.room)
        }); 
    });
    
    //Listen for chatMessage
    socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.id);
    
        io.to(user.room).emit("message", formatMessage(user.username, msg));
    });
    socket.on('disconnect',()=>{
        const user=userLeave(socket.id);
        if(user){
            io.to(user.room).emit('message',formatMessage(botName,`${user.username} has left the room`));
        }
        io.to(user.room).emit("roomUsers",{
            room:user.room,
            users:getRoomUsers(user.room)
        });        
});
});
var pathComp= require("express-static");
app.use(pathComp(__dirname+"/public"));
const PORT = 8000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
