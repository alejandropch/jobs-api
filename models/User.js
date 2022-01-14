const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const schema = UserSchema = new Schema({
    username:{
        type:String,
        required:[true,"You have to provide an username"],
        minLength:3,
        maxLength:30,

    },
    password:{
        type:String,
        required:[true,"You have to provide a password"],
        minLength:3,
    },
    email:{
        type:String,
        required:[true,"You have to provide an email"],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Provide a valid email"],
        unique:true
    }
})


schema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)

})


schema.methods.createJWT = function () {
    return jwt.sign(
      { userID: this._id, username: this.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_LIFETIME }
    )
}
  
schema.methods.comparePasswords = function(candidatePassword){
 
  return bcrypt.compare(candidatePassword, this.password)
}
module.exports = model('User', schema)