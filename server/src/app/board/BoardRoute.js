const {imageUploader} = require('../../../../config/ImageUploader');

module.exports = function(app){
    const boardController = require('./BoardController');
    //1. 사진 및 위치 정보 업로드하기
    app.post('/app/board', imageUploader.any('image'), boardController.createBoard);
}