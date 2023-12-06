const mongoose = require("mongoose")
const JWT = require("jsonwebtoken")

const userSchema = mongoose.Schema({
    fullname : String,
    email : {type : String , required : true , unique : true} ,
    phone : String,
    password : String,
    isAdmin : {type : Boolean , default : false},
    tokens : [{
        token : String,
    }],
   
}, {timestamps : true})


userSchema.methods.AuthUser = async function(){
    const token = JWT.sign({_id : this._id} , 'mysuperSecret' , {expiresIn: "7h"})
    this.tokens = this.tokens.concat({token : token})
    await this.save()
    return token;
}

const User = mongoose.model('User' , userSchema)
module.exports = User;