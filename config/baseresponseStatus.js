module.exports = {

    // 단순 API SUCCESS
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },

    //400번대 에러 - 클라이언트 요청 오류
    NULL_NAME : {"isSuccess": false, "code": 4000, "message":"이름을 입력해주세요."},
    NULL_UESR_EMAIL : {"isSuccess": false, "code": 4001, "message":"이메일을 입력해주세요."},
    NULL_UESR_PASSWORD : {"isSuccess": false, "code": 4002, "message":"비밀번호를 입력해주세요."},
    NULL_UESR_NICKNAME : {"isSuccess": false, "code": 4003, "message":"닉네임을 입력해주세요."},
    NULL_USER_NAME : {"isSuccess": false, "code": 4004, "message":"이름을 입력해주세요."},
    TOKEN_EMPTY: {"isSuccess": false, "code": 4005, "message":"토큰을 입력해주세요."},
    TOKEN_VERIFICATION_FAILURE: {"isSuccess": false, "code": 4006, "message":"토큰 검증 실패"},

    SIGNIN_FAIL: {"isSuccess": false, "code": 4007, "message":"로그인 실패"},

    XCOORDI_EMPTY: {"isSuccess": false, "code": 4008, "message":"x좌표를 입력해주세요."},
    YCOORDI_EMPTY: {"isSuccess": false, "code": 4009, "message":"y좌표를 입력해주세요."},
    WHERE_EMPTY: {"isSuccess": false, "code": 4010, "message":"장소를 입력해주세요."},
    TYPE_EMPTY: {"isSuccess": false, "code": 4011, "message":"타입을 입력해주세요."},
    CONTENT_EMPTY: {"isSuccess": false, "code": 4012, "message":"내용을 입력해주세요."},
    BOARDTYPE_EMPTY: {"isSuccess": false, "code": 4013, "message":"게시판 타입을 입력해주세요."},
    FILE_EMPTY: {"isSuccess": false, "code": 4014, "message":"파일을 입력해주세요."},

    BOARDTYPE_ERROR: {"isSuccess": false, "code": 4015, "message":"게시판 타입을 확인해주세요. throw or lost만 가능합니다."},
    BOARDID_EMPTY: {"isSuccess": false, "code": 4016, "message":"게시판 id를 입력해주세요."},
    
    ITEMTYPE_EMPTY: {"isSuccess": false, "code": 4017, "message":"아이템 타입을 입력해주세요."},
    PICTURE_EMPTY: {"isSuccess": false, "code": 4018, "message":"사진을 입력해주세요."},
    ITEMTYPE_ERROR: {"isSuccess": false, "code": 4019, "message":"아이템 타입을 확인해주세요. 간식, 의류만 가능합니다."},
    ITEMID_EMPTY: {"isSuccess": false, "code": 4020, "message":"아이템 id를 입력해주세요."},
    
    //500번대 에러 - 서버 오류
    DB_ERROR : {"isSuccess": false, "code": 5000, "message":"데이터베이스 오류입니다."}
}