const {response, errResponse} = require('../../../../config/response')
const UserDao = require('./UserDao');
const baseResponse = require('../../../../config/baseresponseStatus')
const pool = require('../../../../config/dbConnection')

exports.createUser = async function(name, email, nickname, password){
    try{
        const connection = await pool.getConnection(async (conn) => conn);
        const result = await UserDao.createUser(connection, name, email, nickname, password);
        console.log(result);
        connection.release();
        return response(baseResponse.SUCCESS);
    }catch(error){
        console.log(error)
        return errResponse(baseResponse.DB_ERROR);
    }
}