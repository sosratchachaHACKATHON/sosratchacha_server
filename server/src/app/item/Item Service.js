const {response, errResponse} = require('../../../../config/response')
const baseResponse = require('../../../../config/baseresponseStatus')
const itemDao = require('./ItemDao')
const pool = require('../../../../config/dbConnection')

exports.createItem = async function(content,type,picUrl,userInfo){
    try{
        const connection = await pool.getConnection(async (conn) => conn);
        
        const itemUploadResult = await boardDao.insertBoard(connection,content,type,picUrl,userInfo);
        connection.release();

        if(itemUploadResult[0] == null){
            return errResponse(baseResponse.DB_ERROR);
        }
        if(itemUploadResult[1] == null){
            return errResponse(baseResponse.DB_ERROR);
        }
        return response(baseResponse.SUCCESS, itemUploadResult[0], boardUploadResult[1]);
        
    }catch(error){
        console.log(error)
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.getItem = async function(userInfo, itemType){
    try{
        const connection = await pool.getConnection(async (conn) => conn);

        const itemReadResult = await itemDao.selectBoard(connection, userInfo, itemType);
        connection.release();

        return response(baseResponse.SUCCESS, itemReadResult);
    }catch(error){
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.getitemDetail = async function(itemId){
    try{
        const connection = await pool.getConnection(async (conn) => conn);

        const itemDetailResult = await itemDao.selectBoardDetail(connection, itemId);
        connection.release();

        return response(baseResponse.SUCCESS, {"content": itemDetailResult[0]});
    }catch(error){
        console.log(error)
        return errResponse(baseResponse.DB_ERROR);
    }
}