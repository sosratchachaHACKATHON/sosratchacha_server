const {response, errResponse} = require('../../../../config/response')
const UserDao = require('./UserDao');
const baseResponse = require('../../../../config/baseresponseStatus')
const pool = require('../../../../config/dbConnection')
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
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
        if(result != null){
            let AccessToken = await jwt.sign(
                {
                  id: result.id,
                  name: result.name,
                  nickname: result.nickname,
                  email: result.email
                }, // 토큰의 내용(payload)
                process.env.AES_128_KEY, // 비밀키
                {
                  expiresIn: "3h",
                  subject: "userInfo",
                } // 유효 기간 3시간
              );
            return response(baseResponse.SUCCESS, AccessToken);
        }
        else return errResponse(baseResponse.SIGNIN_FAIL)
    }catch(error){
        console.log(error)
        return errResponse(baseResponse.DB_ERROR);
    }
    
}

