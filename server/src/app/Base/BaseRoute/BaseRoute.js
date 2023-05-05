module.exports = function(app){
    const baseController = require('./BaseController');

    // 0. 테스트 API
    app.get('/app/test', baseController.test);
}