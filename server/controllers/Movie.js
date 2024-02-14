 
const Movie = require('../models/Movie')
const Genre = require('../models/Genre')
const Show = require('../models/Show');
const Theatre = require('../models/Theatre');
const Location = require('../models/Location');
const cloudinary = require('cloudinary').v2
function isFileTypeSupported(type,supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadToCloudinary(file,folder,quality){
    const options = {folder}
    
    if(quality){
        options.quality = quality;
    }

    options.resource_type = 'auto'

   return await cloudinary.uploader.upload(file.tempFilePath ,options)


}

//createRating
exports.getMovies = async (req, res) => {
    try{
        const {location,theatre} = req.body
        console.log("lcoation: ",location,"theatre: ",theatre)
        if((!location || location=='') && !theatre){
            console.log("first")
        const moviesData =await Movie.find();
        
        return res.status(200).json({
            data : moviesData,
            success : true,

        })
    }
     else if(location && (!theatre || theatre==''))   {
        console.log("second")
        const LocationData =await Location.findById(location).populate({ 
            path: 'theatres',
            populate: {
              path: 'movies',
             
            } 
         })
        let moviesData=[];

        LocationData.theatres.forEach(theatre => {
            moviesData = moviesData.concat(theatre.movies);
        });


        return res.status(200).json({
            data : moviesData,
            success : true,

        })



     }

     console.log("third")
     const theatredata =await Theatre.findById(theatre).populate({path:"movies"} );
     console.log(theatredata);
     return res.status(200).json({
        data : theatredata?.movies,
        success : true,

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
exports.getMovieData = async (req, res) => {
    try{
        
        
       const {movieId} =  req.body;
            
     
            const moviesData =await Movie.findById(movieId).populate("theatres");
           console.log("hi here",moviesData)
            return res.status(200).json({
                data : moviesData,
                success : true,
    
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
exports.addMovie = async (req, res) => {
    try{
        
        const {name,language,genre,directors,description,duration,releaseDate} = req.body;

        const file = req.files.image;
        console.log(file);

        const supportedTypes  = ['jpg','png','jpeg',"gif","webp"]
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){

            return res.status(400).json({
                success:false,
                message :"file format not supported",
            })
        }


        const response = await uploadToCloudinary(file ,process.env.FOLDER_NAME);
        console.log(response)

        const moviesData =await Movie.create({
            name ,language,releaseDate,genre,directors,description,duration,image:response.secure_url
        });
        
        return res.status(200).json({
            data : moviesData,
            success : true,

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

exports.getShows = async (req, res) => {
    try{
        
        
       const {theatreId,movieId,showtype} =  req.body;
            
if(movieId)
           { const theatreDetails =await Theatre.findById(theatreId).populate({path : "shows",match :{
                movie : movieId , type : showtype
            }});
            console.log(theatreDetails)
            return res.status(200).json({
                data : theatreDetails.shows,
                success : true,
    
            })}
            else if(showtype)
           { const theatreDetails =await Theatre.findById(theatreId).populate({path : "shows",match :{
                  type : showtype
            }});

           console.log(theatreDetails,"hWay4bsexhys drucn")
            return res.status(200).json({
                data : theatreDetails.shows,
                success : true,
    
            })}
            else if(theatreId){

                const theatreDetails =await Theatre.findById(theatreId).populate({path : "shows", populate : {path:'movie'}});
  
             console.log(theatreDetails,"hWay4bsexhys drucn")
              return res.status(200).json({
                  data : theatreDetails.shows,
                  success : true,
      
              })

            }else{
                const showDetails =await Show.find().populate("movie").populate("theatre")
  
                console.log(theatreDetails,"hWay4bsexhys drucn")
                 return res.status(200).json({
                     data : showDetails,
                     success : true,
         
                 })
            }
         
        
        
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.addMovieToTheatre = async (req, res) => {
    try{
        
        
       const {theatreId,movieId} =  req.body;
            
     
            const theatreDetails =await Theatre.findById(theatreId).populate("shows");
            const movieDetials = await Movie.findByIdAndUpdate(movieId,{       $push: {
                theatres: theatreDetails._id,
              },},{new :true})
              console.log(movieDetials)
            return res.status(200).json({
        
                success : true,
    
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
 

exports.deleteShow = async (req,res) => {

    try{
        console.log("ine delete sjow")
        const {showId} = req.body;
        console.log("show",showId)
        const showDetails = await Show.findByIdAndDelete(showId).populate();
        console.log(showDetails);

        const theatreUpdate =await  Theatre.findByIdAndUpdate(showDetails.theatre, {  $pull: {
            shows: showDetails._id
        }},{new:true}).populate({path : "shows", populate : {path:'movie'}});

        const areMoreShows = await Show.find({movie:showDetails.movie,theatre : showDetails.theatre});
        console.log("aremoe",areMoreShows)
        if(!areMoreShows || areMoreShows.length == 0){
            console.log("here")
            const movieDetails = await Movie.findByIdAndUpdate(showDetails.movie,{$pull: {
                theatres: showDetails.theatre 
            }})
                        console.log(movieDetails,"movoes",)
        }

        return res.status(200).json({
            data : theatreUpdate?.shows,
            success : true,

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