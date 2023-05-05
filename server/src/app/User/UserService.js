const {response, errResponse} = require('../../../../config/response')
const UserDao = require('./UserDao');
const baseResponse = require('../../../../config/baseresponseStatus')
const {pool} = require('../../../../config/dbConnection')

exports.createUser = async function(email, name, password, nickname){
    const connection = await pool.getConnection(async (conn) => conn);
    try{
        const result = await UserDao.createUser(connection, email, name, password, nickname);
        console.log(result);
        
        return response(baseResponse.SUCCESS);
    }catch(error){
        return errResponse(baseResponse.DB_ERROR);
    }finally{
        connection.release();
    }
}