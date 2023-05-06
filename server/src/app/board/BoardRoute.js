const {imageUploader} = require('../../../../config/ImageUploader');
const jwt = require('../../../../config/jwtMiddleware');

module.exports = function(app){
    const boardController = require('./BoardController');
    //1. 사진 및 위치 정보 업로드하기
    app.post('/app/board', imageUploader.any('image'), boardController.createBoard);
    //2. 게시판 조회하기
    app.get('/app/board', jwt.jwtMiddleware, boardController.getBoard);
    //3. 게시판 댓글 작성하기
    app.post('/app/board/:boardId/comment', jwt.jwtMiddleware, boardController.createComment);
    //4. 게시판 댓글, 내용 조회하기
    app.get('/app/board/:boardId', boardController.getBoardDetail);
}