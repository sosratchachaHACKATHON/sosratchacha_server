const jwt = require('../../../../config/jwtMiddleware');

module.exports = function(app){
    const chattingController = require('./ChattingController');

    //1. 채팅 업로드
    app.post('/app/chatting', jwt.jwtMiddleware, chattingController.createChatting);
}