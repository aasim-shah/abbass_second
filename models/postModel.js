const mongoose = require("mongoose")
const JWT = require("jsonwebtoken")

const postSchema = mongoose.Schema({
    id  : String,
    username  : String,
    title : String,
    category : String,
    photo_url : String,
    description:String,
    content_html:String,
    created_at : {type : Date , default  : Date.now},
    userRef : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
   
   
}, {timestamps : true})




const Post = mongoose.model('Post' , postSchema)
module.exports = Post;