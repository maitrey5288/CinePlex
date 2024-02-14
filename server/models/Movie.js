const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      
    },
    image :{
        type:String,
        default : 'https://res.cloudinary.com/drwfkszpm/image/upload/v1705929259/MovieBooking/csieeriwb7mhdszhhqri.png'
    },
    language: {
        type: String,
        required: true,
        
    },
    rating : {
        type : Number,
        default : -1,
    },
    releaseDate :{
        type : Date,
    },
    genre : [{

        type: String,
		
    }],
    directors :[{
        type: String,
		 
    }],
    topCast :[{
        type: String,
		 
    }],
    description : {
        type :String,
    },
    duration :{
        type : String,
    },
    theatres :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Theatre",
    }],



})

module.exports = mongoose.model("Movie", movieSchema)