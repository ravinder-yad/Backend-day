const mongoose = require ('mongoose')

const config = ()=>{
    mongoose.connect('mongodb://localhost:27017/date1')
    .then(()=>{
        console.log("yas");
        
    }).catch (()=>{
        console.log("no");
    })
}

module.exports = {config}