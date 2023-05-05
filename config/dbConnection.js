const mysql = require('mysql2/promise');
require("dotenv").config();

const pool = mysql.createPool({  // 커넥션 풀 생성
    host: process.env.DB_HOST,
    user: process.env.DB_ID,
    port: process.env.DB_PORT,
    password: process.env.DB_PWD,
    database: process.env.DB_TABLE,
    connectionLimit: 5  // 커넥션 풀이 몇개의 커넥션을 가지게끔 할 것인지 설정.
});

module.exports = pool;