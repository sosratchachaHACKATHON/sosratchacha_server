const BoardService = require('./BoardService');
const {response, errResponse} = require('../../../../config/response')
const baseResponse = require('../../../../config/baseresponseStatus')

exports.createBoard = async function(req, res){
    const {xCoordi, yCoordi, where, type, content, boardType} = req.body;
    const fileName = `https://sosratchacha.s3.ap-northeast-2.amazonaws.com/${req.files[0].key}`;

    if(!xCoordi){
        return res.send(errResponse(baseResponse.XCOORDI_EMPTY))
    }
    if(!yCoordi){
        return res.send(errResponse(baseResponse.YCOORDI_EMPTY))
    }
    if(!where){
        return res.send(errResponse(baseResponse.WHERE_EMPTY))
    }
    if(!type){
        return res.send(errResponse(baseResponse.TYPE_EMPTY))
    }
    if(!content){
        return res.send(errResponse(baseResponse.CONTENT_EMPTY))
    }
    if(!boardType){
        return res.send(errResponse(baseResponse.BOARDTYPE_EMPTY))
    }
    if(!fileName){
        return res.send(errResponse(baseResponse.FILE_EMPTY))
    }

    const createBoardResponse = await BoardService.createBoard(xCoordi, yCoordi, where, type, content, boardType, fileName);
    return res.send(createBoardResponse)
}

exports.getBoard = async function(req, res){
    const {boardType} = req.query;
    if(!boardType){
        return res.send(errResponse(baseResponse.BOARDTYPE_EMPTY))
    }
    if(boardType != 'throw' && boardType != 'lost'){
        return res.send(errResponse(baseResponse.BOARDTYPE_ERROR))
    }
    const getBoardResponse = await BoardService.getBoard(boardType);
    return res.send(getBoardResponse)
}

exports.createComment = async function(req, res){
    const userInfo = req.verifiedToken;
    const {boardId} = req.params;
    const {content} = req.body;
    if(!boardId){
        return res.send(errResponse(baseResponse.BOARDID_EMPTY))
    }
    if(!content){
        return res.send(errResponse(baseResponse.CONTENT_EMPTY))
    }
    const createCommentResponse = await BoardService.createComment(userInfo, boardId, content);
    return res.send(createCommentResponse)
}

exports.getBoardDetail = async function(req, res){
    const {boardId} = req.params;
    if(!boardId){
        return res.send(errResponse(baseResponse.BOARDID_EMPTY))
    }

    const getBoardDetailResponse = await BoardService.getBoardDetail(boardId);
    return res.send(getBoardDetailResponse)
}