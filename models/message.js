let mongoose= require('mongoose')

mongoose.connect('mongodb://root:qwer0219@47.106.70.114:27017/testuser?authSource=admin', {useNewUrlParser: true});

let Schema = mongoose.Schema

let MessageSchema =new Schema({
   message_content:{
       type:String,
       required:true
   },
    message_type:{
        type:String,
        required:true
    },
    message_nickname:{
        type:String,
        required:true
    },
    message_time:{
        type: Date,
        default: Date.now
    },
    message_likenum:{
        type:String,
    },
    message_ChatHead:{
        type: String,
        default: '/images/avatar.jpg'
    },
    UTCtodata:{
       type:String
    }
})

module.exports = mongoose.model('Message', MessageSchema)



