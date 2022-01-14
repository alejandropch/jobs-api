const jwt = require("jsonwebtoken")
const Boom = require('@hapi/boom')
const authentication = (req, res, next) => {

    const {authorization: auth} = req.headers
    const token = auth.split(' ')[1]
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {
            userID: payload.userID,
            username:payload.username}
        next()
    }catch(e){
        throw Boom.unauthorized("Your authentication has failed")

    }


}
module.exports= authentication