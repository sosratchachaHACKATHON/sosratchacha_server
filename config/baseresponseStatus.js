module.exports = {

    // 단순 API SUCCESS
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },

    //400번대 에러 - 클라이언트 요청 오류
    NULL_NAME : {"isSuccess": false, "code": 4000, "message":"이름을 입력해주세요."},
    NULL_UESR_EMAIL : {"isSuccess": false, "code": 4001, "message":"이메일을 입력해주세요."},
    NULL_UESR_PASSWORD : {"isSuccess": false, "code": 4002, "message":"비밀번호를 입력해주세요."},
    NULL_UESR_NICKNAME : {"isSuccess": false, "code": 4003, "message":"닉네임을 입력해주세요."},
    NULL_USER_NAME : {"isSuccess": false, "code": 4004, "message":"이름을 입력해주세요."},

    //500번대 에러 - 서버 오류
    DB_ERROR : {"isSuccess": false, "code": 5000, "message":"데이터베이스 오류입니다."}
}