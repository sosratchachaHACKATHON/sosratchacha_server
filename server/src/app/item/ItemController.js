const ItemService = require('./ItemService');
const {response, errResponse} = require('../../../../config/response')
const baseResponse = require('../../../../config/baseresponseStatus')


exports.createItem=async function(req,res){
    const {content,type,picUrl} = req.body;
    const userInfo = req.verifiedToken;
    if(!content){
        return res.send(errResponse(baseResponse.CONTENT_EMPTY))
    }
    if(!type){
        return res.send(errResponse(baseResponse.ITEMTYPE_EMPTY))
    }
    if(!picUrl){
        return res.send(errResponse(baseResponse.PICURL_EMPTY))
    }
    const createItemResponse = await ItemService.createItem(content,type,picUrl,userInfo)
    return res.send(createItemResponse)
}

exports.getItem = async function(req,res){
    const userInfo = req.verifiedToken;
    const {itemType} = req.query;
    if(!itemType){
        return res.send(errResponse(baseResponse.ITEMTYPE_EMPTY))
    }
    if(itemType != '간식' && itemType != '의류'){
        return res.send(errResponse(baseResponse.ITEMTYPE_ERROR))
    }
    const getItemResponse = await ItemService.getItem(userInfo, itemType);
    return res.send(getItemResponse)
}

exports.getItemDetail = async function(req, res){
    const {itemId} = req.params;
    if(!itemId){
        return res.send(errResponse(baseResponse.ITEMID_EMPTY))
    }

    const getItemDetailResponse = await ItemService.getItemDetail(itemId);
    return res.send(getItemDetailResponse)
}