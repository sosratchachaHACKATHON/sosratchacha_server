const jwt = require('../../../../config/jwtMiddleware');


module.exports = function(app){
    const baseController = require('./ItemController');

    // 0. 테스트 API
    app.get('/app/test', sellController.test);
}

module.exports = function(app){
    const sellontroller = require('./ItemController');
    //1. 사진 업로드하기
    app.post('/app/items', imageUploader.any('image'), boardController.createBoard);
    //2. 아이템 조회하기
    app.get('/app/item',jwt.jwtMiddleware, itemController.getItem);
    }