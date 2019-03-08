let mongoose= require('mongoose')

mongoose.connect('mongodb://localhost/testuser', {useNewUrlParser: true});

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
