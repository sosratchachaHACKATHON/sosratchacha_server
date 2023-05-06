// node_modules의 express 패키지를 가져온다.
var express = require('./config/express');
const path = require('path');
var expressForStatic = require("express");

//app이라는 변수에 express 함수의 변환 값을 저장한다.
var app = express();

// 정적 파일 불러오기
app.use(expressForStatic.static(path.join(__dirname + "/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
})

const port = app.listen(8000);
// express 서버를 실행할 때 필요한 포트 정의 및 실행 시 callback 함수를 받습니다
app.listen(port, function() {
    console.log(`start!express server on port 8000`);
})




module.exports = app;