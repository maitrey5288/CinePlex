import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
 
import Admin from './pages/Admin/Admin';
import AddMovie from './pages/Admin/AddMovie';
import MovieDetails from './pages/Admin/MovieDetails';
import AddShow from './pages/Admin/AddShow';
import Theatres from './pages/Admin/Theatres';
import Profile from './pages/User/Profile';
import Movies from './pages/User/Movies';
import BookMovie from './pages/User/BookMovie';
import UserMovieDetails from './pages/User/UserMovieDetails';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import ForgotPassword from "./pages/ForgotPassword";
// import UpdatePassword from "./pages/UpdatePassword";
// import VerifyEmail from "./pages/VerifyEmail";
import { useEffect, useState } from 'react';
import VerifyEmail from './pages/VerifyEmail';
import { VerifyNotifier } from './pages/VerifyNotifier';
import {UserContext,ProgressContext} from './context/Context'
import { movieAPI } from "./API/apis";
import { apiConnector } from './API/apiconnector';
import {endpoints} from "./API/apis"
import LoadingBar from 'react-top-loading-bar';
import AdminRoute from './components/AdminRoute';
import UserRoute from './components/UserRoute';
import Home from './pages/Home';
import Bookings from './pages/User/Bookings';
import { useMediaQuery } from 'react-responsive';
import toast from 'react-hot-toast';
import AdminMovies from './pages/Admin/AdminMovies';
import Shows from './pages/Admin/Shows';
import NotFound from './pages/NotFound';
import Footer from './pages/User/Footer';

 

function App() {
  function getToken(){
    try {
        return localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
    } catch (error) {
        return null
    }
}
 const {GET_USERDATA} = movieAPI;
const[progress,setProgress] = useState(0);
const[loading,setLoading] = useState(false);
const[token,setToken] = useState(  getToken());
 const[user,setUser] = useState (  null);
 const[userloading,setUserloading] = useState (  true);

const navigate = useNavigate();


 async function getUser(){
  setUserloading(true);
  if(token)
{  try{ const res = await apiConnector("POST",GET_USERDATA,{});
  setUser(res.data.user);
}
catch(e){
  setUserloading(false);
  navigate('/');
}}
else{
  setUserloading(false);
  navigate('/');
}
setUserloading(false);
}
function logoutHandler(){
  setToken(null);
  localStorage.removeItem("token");
  setUser(null);
  toast.success("Logged out Successfully")
  navigate('/login')
}


 useEffect(() => {
   
    getUser();
 
   return () => {
     setUser(null);
   }
 }, [])
 
 
   console.log(token,user, localStorage.getItem("user"),JSON.parse(localStorage.getItem("user")) )
 
   const isTabletOrMobile = useMediaQuery({ query: '(max-width: 480px)' })

   if(userloading){

    return <div>Loading</div>


   }

else
  return (
<div className='absolute top-0 w-full pb-12 min-h-[100vh] bg-bg-1'>
<LoadingBar
        color='#810FE6'
        progress={progress}
        height={2}
        onLoaderFinished={() => setProgress(0)}
      />
{!loading && 
<UserContext.Provider value={{user,setUser,token,setToken,isTabletOrMobile}}>
<ProgressContext.Provider value={{progress,setProgress}}>
      <Navbar logoutHandler={logoutHandler}/>
      
 

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route  path="/signup" element={<Signup />} />
        <Route  path="/login"  element={   <Login /> } />
        <Route  path="/verify/:token"  element={    <VerifyEmail/> }  />
        <Route  path="/verify"   element={    <VerifyNotifier/>  }  />

    {/* <Route 
          path="forgot-password"
          element={
         
              <ForgotPassword />
          
          }
        />   */}

     
    {/* <Route
          path="update-password/:id"
          element={
         
              <UpdatePassword />
          
          }
        />  */}
        <Route path='/admin' element={<AdminRoute userloading={userloading}/>}>

        <Route path='/admin' element ={<Admin/>}/>
        <Route path='/admin/movies' element ={<AdminMovies theatre={false} />}/>
        <Route path='/admin/addmovie' element ={<AddMovie/>}/>
        <Route path= '/admin/MovieDetails/:movieId' element={<MovieDetails/>}/>
        <Route path= '/admin/addShow/:movieId' element={<AddShow/>}/>
        <Route path= '/admin/theatres' element={<Theatres  />}/>
        <Route path= '/admin/shows/:theatreId' element={<Shows/>}/>
        <Route path= '/admin/shows/' element={<Shows/>}/>
        <Route path= '/admin/movies/:theatreId' element={<AdminMovies theatre={true} />}/>
        </Route> 
        

        <Route path='/' element={<UserRoute userloading={userloading}/>}>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/movies' element={<Movies/>}/>
        <Route path='/bookmovie/:showId' element={<BookMovie/>}/>
        <Route path='/MovieDetails/:movieId' element={<UserMovieDetails/>}/>
        <Route path='/getBooking' element={<Bookings/>}/>
        </Route>
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
    
      <Footer />
      </ProgressContext.Provider>
      </UserContext.Provider>
}</div>
  );
}

export default App;
