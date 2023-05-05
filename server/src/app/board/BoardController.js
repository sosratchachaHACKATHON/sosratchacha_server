const BoardService = require('./BoardService');
const {response, errResponse} = require('../../../../config/response')
const UserResponse = require('../../../../config/baseresponseStatus')

exports.createBoard = async function(req, res){
    return res.send(response(UserResponse.SUCCESS))
}