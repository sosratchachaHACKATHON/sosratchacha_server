const moment=require('moment');  // 날짜 및 시간 관련 기능을 단순화하는 데 사용

function formatMessage(nickname,text){
    return{
        nickname,
        text,
        time:moment().format('h:mm a')
    };
}

module.exports=formatMessage;
