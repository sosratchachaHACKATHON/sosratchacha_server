// node_modules의 express 패키지를 가져온다.
var express = require('./config/express');
const http=require('http');
const path = require('path');
var expressForStatic = require("express");
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const botName='ChatCord BOT';

const {userJoin,getCurrentUser,userLeave,getRoomUsers} = require('./server/src/app/User/UserDao');

//app이라는 변수에 express 함수의 변환 값을 저장한다.
var app = express();
const server = http.createServer(app);
const io=socketio(server);
io.on('connection',socket=>{            //새로운 소켓 객체가 생성되고 이 콜백 함수에 전달
    socket.on('joinRoom',({nickname,room})=>{
        const user=userJoin(socket.id,nickname,room);
        socket.join(user.room);
        socket.emit('message',formatMessage(botName,'Welcome to chatCord'));   //서버의 새로운 사용자에게 메세지 날리기 잘들어갔다고
    })

    socket.broadcast.to(user.room).emit('message',(formatMessage(botName,`${user.nickname} has joined the chat`)));   //들어온사람이외에게 메세지 날리기
    io.to(user.room).emit("roomUsers",{                               //대화하고 있는 상대방 알기 + 채팅방 정보알기
        room:user.room,
        users:getRoomUsers(user.room)
    }); 

    socket.on("chatMessage", (msg) => {            //채팅기능
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit("message", formatMessage(user.nickname, msg));
    });

    socket.on('disconnect',()=>{
        const user=userLeave(socket.id);
        if(user){
            io.to(user.room).emit('message',formatMessage(botName,`${user.nickname} has left the room`));
        }
        io.to(user.room).emit("roomUsers",{
            room:user.room,
            users:getRoomUsers(user.room)
        });        
});
});

const port = app.listen(8000);
// express 서버를 실행할 때 필요한 포트 정의 및 실행 시 callback 함수를 받습니다
app.listen(port, function() {
    console.log(`start!express server on port 8000`);
})

module.exports = app;