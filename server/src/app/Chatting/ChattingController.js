const {response, errResponse} = require('../../../../config/response')
const baseResponse = require('../../../../config/baseresponseStatus')
const chattingService = require('./ChattingService')

exports.createChatting = async function (req, res) {
    const userInfo = req.verifiedToken;
    const {message} = req.body;

    if(!message){
        return res.send(errResponse(baseResponse.MESSAGE_EMPTY))
    }

    const result = await chattingService.createChatting(userInfo.id, message);
    return res.send(response(baseResponse.SUCCESS, result));
}

exports.getChatting = async function(req, res){
    const userInfo = req.verifiedToken;

    const result = await chattingService.getChatting(userInfo.id, userInfo.nickname);
    return res.send(result);
}