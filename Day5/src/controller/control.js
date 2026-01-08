const { course } = require("../models/models")

const add = async (req, res)=>{
    console.log(req.body);
    
    const {name} = req.body 
    const add = await course.create({
        name
    })

    res.send(add)
}

module.exports = {add}