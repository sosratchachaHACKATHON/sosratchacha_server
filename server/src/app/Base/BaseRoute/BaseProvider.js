const {response, errResponse} = require('../../../../../config/response')
const baseResponse = require('../../../../../config/baseresponseStatus')

exports.test = async function(name){
    const helloNAME = `Hello ${name}!`

    return response(baseResponse.SUCCESS, helloNAME);
}