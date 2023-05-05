const {response, errResponse} = require('../../../../config/response')
const baseResponse = require('../../../../config/baseresponseStatus')
const boardDao = require('./BoardDao')
const pool = require('../../../../config/dbConnection')

exports.createBoard = async function(xCoordi, yCoordi, where, type, content, boardType, fileName){
    try{
        
        const connection = await pool.getConnection(async (conn) => conn);
        
        const boardUploadResult = await boardDao.insertBoard(connection, xCoordi, yCoordi, where, type, content, boardType, fileName);
        connection.release();

        if(boardUploadResult[0] == null){
            return errResponse(baseResponse.DB_ERROR);
        }
        if(boardUploadResult[1] == null){
            return errResponse(baseResponse.DB_ERROR);
        }
        return response(baseResponse.SUCCESS, boardUploadResult[0], boardUploadResult[1]);
        
    }catch(error){
        console.log(error)
        return errResponse(baseResponse.DB_ERROR);
    }
}