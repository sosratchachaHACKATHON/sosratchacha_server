const {response, errResponse} = require('../../../../config/response')
const UserDao = require('./UserDao');
const baseResponse = require('../../../../config/baseresponseStatus')
const pool = require('../../../../config/dbConnection')
const bcrypt = require('bcrypt');
require("dotenv").config();

exports.createUser = async function(name, email, nickname, password){
    try{
        const connection = await pool.getConnection(async (conn) => conn);
        const hashed = bcrypt.hashSync(password, 10);
        //console.log(`password: ${password}, hashed: ${hashed}`);
            
        const result = await UserDao.createUser(connection, name, email, nickname, hashed);
        console.log(result);
        connection.release();
        return response(baseResponse.SUCCESS);
    }catch(error){
        console.log(error)
        return errResponse(baseResponse.DB_ERROR);
    }
    
}

exports.loginUser = async function(email,password){
    try{
        const connection = await pool.getConnection(async (conn) => conn);
        const hashed = bcrypt.hashSync(password, 10);
        const result = await UserDao.loginUser(connection,email,hashed);
        console.log(result);
        connection.release();
        return response(baseResponse.SUCCESS);
    }catch(error){
        console.log(error)
        return errResponse(baseResponse.DB_ERROR);
    }
    
}

