const {response, errResponse} = require('../../../../config/response')
const UserDao = require('./UserDao');
const baseResponse = require('../../../../config/baseresponseStatus')
const pool = require('../../../../config/dbConnection')
const crypto = require('crypto');
require("dotenv").config();

exports.createUser = async function(name, email, nickname, password){
    try{
        const connection = await pool.getConnection(async (conn) => conn);
        const hashed = await crypto
        .createHash("sha512", process.env.AES_128_KEY)
        .update(password)
        .digest("hex");
            
        const result = await UserDao.createUser(connection, name, email, nickname, hashed);
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
        const hashed =  await crypto
        .createHash("sha512", process.env.AES_128_KEY)
        .update(password)
        .digest("hex");

        const result = await UserDao.loginUser(connection,email,hashed);
        connection.release();
        if(result != null) return response(baseResponse.SUCCESS);
        else return errResponse(baseResponse.SIGNIN_FAIL)
    }catch(error){
        console.log(error)
        return errResponse(baseResponse.DB_ERROR);
    }
    
}

