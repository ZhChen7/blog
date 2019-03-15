let mongoose= require('mongoose')

mongoose.connect('mongodb://root:qwer0219@47.106.70.114:27017/testuser?authSource=admin', {useNewUrlParser: true});

let Schema = mongoose.Schema

let userSchema =new Schema({
    email:{
        type:String,
        required:true
    },
    nickname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('User', userSchema)
