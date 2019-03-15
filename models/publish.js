let mongoose = require('mongoose')

mongoose.connect('mongodb://root:qwer0219@47.106.70.114:27017/testuser?authSource=admin', {useNewUrlParser: true});

let Schema = mongoose.Schema

let publishSchema = new Schema({
    publishTitle: {
        type: String,
        required: true
    },
    publishIntro: {
        type: String,
        required: true
    },
    publishImgUrl: {
        type: String,
        required: true
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    wholepublishIdentifying: {
        type: String,
        required: true
    },
    publishIdentifying: {
        type: String,
    },
    publishMainBodyUrl: {
        type: String,
        required: true
    },
    UTCtodata: {
        type: String
    }
})

module.exports = mongoose.model('Publish', publishSchema)



