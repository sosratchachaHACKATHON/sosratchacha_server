const userController = require('./UserController')

module.exports = function(app){
    
    //1. 회원가입 만들기
    app.post('/app/user/sign-up', userController.createUser);


}