const {response, errResponse} = require('../../../../config/response')
const UserResponse = require('../../../../config/baseresponseStatus')
const UserService = require('./UserService');

exports.createUser = async function(req, res){
    // 1. Body에서 받아오기
    // TODO : 이름도 넣기
    const {email, name, password, nickname} = req.body;

    if(email == null){
        return res.send(errResponse(UserResponse.NULL_UESR_EMAIL));
    }
    if(name == null){
        return res.send(errResponse(UserResponse.NULL_USER_NAME));
    }
    if(password == null){
        return res.send(errResponse(UserResponse.NULL_UESR_PASSWORD));
    }
    if(nickname == null){
        return res.send(errResponse(UserResponse.NULL_UESR_NICKNAME));
    }

    const signUpResponse = await UserService.createUser(email, password, nickname);
    return res.send(signUpResponse)
}