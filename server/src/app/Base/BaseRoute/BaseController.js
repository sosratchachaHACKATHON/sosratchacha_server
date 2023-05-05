const baseService = require('./BaseService');
const baseProvider = require('./BaseProvider');
const {response, errResponse} = require('../../../../../config/response')
const baseResponse = require('../../../../../config/baseresponseStatus')
exports.test = async function(req, res){
    const name = req.param('name');
    if(name == null){
        return res.send(response(baseResponse.NULL_NAME))
    }
    const result = await baseProvider.test(name);
    
    return res.send(result);
}