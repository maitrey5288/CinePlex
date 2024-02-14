 
const Movie = require('../models/Movie')
const Genre = require('../models/Genre')
const Show = require('../models/Show')
const Theatre = require("../models/Theatre")
const Location = require("../models/Location")
const mongoose = require('mongoose')
exports.addShow = async (req, res) => {
    try{
        
        const{movieId,theatreId,time,date,type} = req.body;
      
         
        console.log(theatreId)
        const theatreDetails1 = await Theatre.findByIdAndUpdate(theatreId).populate({path : "shows",match :{
            movie : movieId ,time : time,date:date
        }});
 
        if(theatreDetails1.shows.length>0){

            return res.status(200).json({
                success : false,
                message : "show already exists"
            })
        }
        
     
        
        const showDetails = await Show.create({
            time,date,type,movie:movieId,theatre:theatreDetails1._id
        })
        const theatreDetails = await Theatre.findByIdAndUpdate(theatreId, {
            $push: {
              shows: showDetails._id,
              movies : new mongoose.Types.ObjectId(movieId)
            },
          },{new : true}).populate({path : "shows", populate:{path : "movie"}});
          console.log("theatre it is",theatreDetails)
          Movie.findById(movieId)
          .then(movie => {
            if (movie) {
              // Check if the theater is already present in the theaters array
              let a = movie
              console.log(a, "theatre")
              const isTheaterPresent = a.theatres.includes(theatreId);
        
              if (!isTheaterPresent) {
                // Add the theater to the theaters array
                a.theatres.push(theatreId);
        
                // Save the updated movie
                return a.save();
              } else {
                console.log(`${theatreId} is already present in the theaters array for ${movie.title}.`);
                return movie; // No need to save, just return the movie
              }
            } else {
              console.log('Movie not found.');
              return null;
            }
          })
          .then(updatedMovie => {
            if (updatedMovie) {
              console.log(`${theatreId} added to the theaters array for ${updatedMovie.title}.`);
            }
          })
          .catch(err => {
            console.error('Error:', err);
          });


        return res.status(200).json({
            message : "show created successfully",
            success : true,
            data : theatreDetails.shows,
        })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
 
exports.addTheatre = async (req, res) => {
    try{
        
        const{name,location} = req.body;
        const theatreDetails = await Theatre.create({name});
        const locationDetails = await Location.findByIdAndUpdate(location,{$push:{theatres : theatreDetails._id}},{new :true}).populate("theatres")
       const addLocationInTheatre = await Theatre.findByIdAndUpdate(theatreDetails._id,{location : locationDetails._id});

        return res.status(200).json({
            message : "theatre added successfully",
            success : true,
            data : theatreDetails,
            locationDetails : locationDetails
        })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,

        })
    }
}
exports.getTheatres = async (req, res) => {
    try{
        
        const {location} = req.body;
        if(location && location != ''){
            const locationDetails = await Location.findById(location).populate('theatres')
            return res.status(200).json({
           
                success : true,
                data : locationDetails.theatres,
            })
        }
        const theatreDetails = await Theatre.find();

        return res.status(200).json({
           
            success : true,
            data : theatreDetails,
        })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
exports.getLocations = async (req, res) => {
    try{
        
        
        const Locations = await Location.find().populate({path:"theatres"});
      
       console.log(Locations)

        return res.status(200).json({
           
            success : true,
            data:Locations
        })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.addLocation = async (req, res) => {
    try{
        
        const{location} = req.body;
        const Locations = await Location.create({name : location});
      
       

        return res.status(200).json({
           
            success : true,
            message : "Location created successfully",
            data : Locations
        })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


exports.getSeats = async(req,res) =>{

    try{
        
        const{showId} = req.body;
        console.log(showId)
        const showDetails = await Show.findById(showId).populate("movie").populate("theatre")
        
       console.log(showDetails.seats,showDetails);
 
        return res.status(200).json({
           
            success : true,
        
            data : showDetails.seats,
            showDetails : {
                movie : showDetails.movie.name , theatre :showDetails.theatre.name, time :showDetails.time
            }
        })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }


}