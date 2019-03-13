let mongoose= require('mongoose')

mongoose.connect('mongodb://localhost/testuser', {useNewUrlParser: true});

let Schema = mongoose.Schema

let publishSchema =new Schema({
   publishTitle:{
       type:String,
       required:true
   },
   publishIntro:{
       type: String,
       required: true
   },
   publishImgUrl:{
       type:String,
       required:true
   },
   publishDate:{
       type: Date,
       default: Date.now
   },
   publishIdentifying:{
       type:String,
       required:true
   },
   publishMainBodyUrl:{
       type:String,
       required:true
   },
    UTCtodata:{
        type:String
    }
})

module.exports = mongoose.model('Publish', publishSchema)



