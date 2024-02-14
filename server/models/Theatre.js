const mongoose = require("mongoose")

const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      
    },
    shows : [
        {
            type: mongoose.Schema.Types.ObjectId,
			ref: "Show",
        }
    ],
    movies:[
        {
            type: mongoose.Schema.Types.ObjectId,
			ref: "Movie",
        }
    ],
    location:{
            type: mongoose.Schema.Types.ObjectId,
			ref: "Location",
        }
    

})

module.exports = mongoose.model("Theatre", theatreSchema)