const BASE_URL = process.env.REACT_APP_API_BASE_URL

// movie ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/movie/sendotp",
  SIGNUP_API: BASE_URL + "/movie/signup",
  LOGIN_API: BASE_URL + "/movie/login",
  VERIFY_API : BASE_URL + "/movie/verifyEmail",
  RESETPASSTOKEN_API: BASE_URL + "/movie/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/movie/reset-password",
 
}

export const movieAPI = {
  
  GETMOVIES_API : BASE_URL + "/movie/getMovies",
  GETMOVIEDATA_API : BASE_URL + "/movie/getMovieData",
  ADDMOVIE_API : BASE_URL + "/movie/addMovie",
  GETSHOWDATA_API : BASE_URL + "/movie/getShows",
  ADDSHOWDATA_API : BASE_URL + "/movie/addShow",
  GETTHEATRES_API : BASE_URL + "/movie/getTheatres",
  GETLOCATIONS_API : BASE_URL + "/movie/getLocations",
  ADDLOCATION_API : BASE_URL + "/movie/addLocation",
  ADDTHEATRE_API : BASE_URL + "/movie/addTheatre",
  GETSEATS_API : BASE_URL + "/movie/getSeats",
  GET_USERDATA : BASE_URL + '/movie/getUserData',
  GET_BOOKING : BASE_URL + '/movie/getBooking',
  DELETE_SHOW : BASE_URL + '/movie/deleteShow',
  

  GET_PAYMENT_DATA : BASE_URL + '/movie/capturePayment',
  PAYMENT_VERIFY_API : BASE_URL + '/movie/verifyPayment',
  


}







