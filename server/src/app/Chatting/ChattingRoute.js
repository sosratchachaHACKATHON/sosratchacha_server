const jwt = require('../../../../config/jwtMiddleware');

module.exports = function(app){
    const chattingController = require('./ChattingController');

    //1. 채팅 업로드
    app.post('/app/chatting', jwt.jwtMiddleware, chattingController.createChatting);

    //2. 채팅 조회
    app.get('/app/chatting', jwt.jwtMiddleware, chattingController.getChatting);
}