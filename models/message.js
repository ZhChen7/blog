let mongoose= require('mongoose')

mongoose.connect('mongodb://localhost/testuser', {useNewUrlParser: true});

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



