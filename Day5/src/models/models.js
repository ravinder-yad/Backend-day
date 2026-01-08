const mongoose = require ('mongoose')

const cours = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
})

const course = mongoose.model('cours', cours)

module.exports = {course}