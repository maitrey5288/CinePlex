const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const User = require("../models/User");
const { auth, isAdmin,isUser } = require("../middleware/auth")
const {getMovies,addMovie,getShows,getMovieData,addMovieToTheatre,deleteShow} = require('../controllers/Movie')
const {addShow,addTheatre,getTheatres,getLocations,addLocation,getSeats} = require('../controllers/Show')
const {login,signup,changePassword,verifyAccount,getUserData} = require('../controllers/Auth')
const {capturePayment,verifyPayment,getBooking} = require('../controllers/payments')
router.post("/signup",signup)
router.post('/login',login)
router.get("/createAdmin",async ()=>{
    await User.create({email : "maitreychitale21@gmail.com",accountType:"Admin",firstName:"Maitrey",lastName:"Chitale","password": await bcrypt.hash("!@#Admin", 10)})
    return "<h1>Admin created</h1>"
})
router.post("/getLocations",auth, isUser,getLocations);
router.post("/getTheatres",auth, isUser,getTheatres);
router.post("/getMovieData",auth, isUser,getMovieData);
router.post("/getMovies",getMovies);
router.post("/getShows",auth, isUser, getShows);
router.post("/verifyEmail", verifyAccount);
router.post("/getSeats",auth, isUser, getSeats);
router.post("/getUserData",auth,getUserData);


router.post("/addShow",auth, isAdmin, addShow);
router.post("/addMovieToTheatre", auth, isAdmin, addMovieToTheatre);
router.post("/addLocation",auth, isAdmin, addLocation);
router.post("/addTheatre",auth, isAdmin, addTheatre);
router.post("/addMovie", auth, isAdmin, addMovie);
router.post("/deleteShow", auth, isAdmin, deleteShow);

router.post('/capturePayment',auth,isUser,capturePayment)
router.post('/verifyPayment',auth,isUser,verifyPayment)
router.post('/getBooking',auth,isUser,getBooking)
 

// router.post('/test',test)
module.exports = router