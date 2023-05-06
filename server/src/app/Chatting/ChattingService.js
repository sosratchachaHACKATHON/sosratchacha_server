const {response, errResponse} = require('../../../../config/response')
const baseResponse = require('../../../../config/baseresponseStatus')
const chattingDao = require('./ChattingDao')
const pool = require('../../../../config/dbConnection')

exports.createChatting = async function(userId, message){
    try{
        const connection = await pool.getConnection(async (conn) => conn);

        const chattingUploadResult = await chattingDao.insertChatting(connection, userId, message);

        connection.release();
        return response(baseResponse.SUCCESS, chattingUploadResult);
    }catch(error){
        console.log(error)
        return errResponse(baseResponse.DB_ERROR);
    }
}