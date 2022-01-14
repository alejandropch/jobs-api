const Boom = require('@hapi/boom')
const User = require('../models/User')

const register = async (req,res,next) => {
     const {username, password, email} = req.body
    if(!username || !password || !email) {  
        throw Boom.badRequest("You must fill the user form with value data")
    }
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(201).json({msg:`user ${user.username} created`, token})
}

const login = async (req,res,next) => {
    const {email, password} = req.body
    
    if(!email || !password){
        throw Boom.badRequest("You must provide an email and password")
    }

    const user = await User.findOne({email})
    const isMatch =await user.comparePasswords(password)
    if(!isMatch){
        throw Boom.badRequest("Invalid credentials")
    }
    const token = user.createJWT()

    res.json({username:user.username, token})
}

module.exports= {register, login}