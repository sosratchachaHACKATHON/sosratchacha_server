module.exports = function(app){
    const userController = require('./UserController');
    //1. 회원가입 만들기
    app.post('/app/user/sign-up', userController.createUser);


}