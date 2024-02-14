const mongoose = require("mongoose")

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      
    },
    theatres:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Theatre",
    },]
    



})

module.exports = mongoose.model("Location", locationSchema)