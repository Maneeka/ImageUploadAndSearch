const mongoose = require('mongoose')

const uploadSchema = mongoose.Schema({
    tags: [String],
    selectedFile: String,    //convert img to string
    favorite: {
        type: Boolean,
        default: false
    },
    uploadedAt: {
        type: Date,
        default: new Date()
    }
})

const uploadedImage = mongoose.model('uploadedImage', uploadSchema)

module.exports = uploadedImage