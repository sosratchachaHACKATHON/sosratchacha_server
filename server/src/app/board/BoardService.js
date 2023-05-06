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

exports.getBoard = async function(userInfo, boardType){
    try{
        const connection = await pool.getConnection(async (conn) => conn);

        const boardReadResult = await boardDao.selectBoard(connection, userInfo, boardType);
        connection.release();

        return response(baseResponse.SUCCESS, boardReadResult);
    }catch(error){
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.createComment = async function(userInfo, boardId, content){
    try{
        const connection = await pool.getConnection(async (conn) => conn);

        const commentUploadResult = await boardDao.insertComment(connection, userInfo, boardId, content);
        connection.release();

        return response(baseResponse.SUCCESS, commentUploadResult);
    }catch(error){
        console.log(error)
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.getBoardDetail = async function(boardId){
    try{
        const connection = await pool.getConnection(async (conn) => conn);

        const boardDetailResult = await boardDao.selectBoardDetail(connection, boardId);
        connection.release();

        return response(baseResponse.SUCCESS, {"contentWithComments": boardDetailResult[0], "picURL": boardDetailResult[1]});
    }catch(error){
        console.log(error)
        return errResponse(baseResponse.DB_ERROR);
    }
}