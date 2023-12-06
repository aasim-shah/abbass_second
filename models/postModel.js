const mongoose = require("mongoose")
const JWT = require("jsonwebtoken")

const postSchema = mongoose.Schema({
    username  : String,
    title : String,
    description:String,
    userRef : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
   
   
}, {timestamps : true})




const Post = mongoose.model('Post' , postSchema)
module.exports = Post;