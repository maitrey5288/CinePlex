import React, { useContext } from 'react'
import { UserContext } from '../context/Context'
import hero from '../assets/hero.png'
 
import HomeCarousal from './User/HomeCarousal'
import Footer from './User/Footer'
import wave from '../assets/wave.png'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useMediaQuery } from 'react-responsive'
const Home = () => {
  const small = useMediaQuery({ query: '(max-width: 610px)' })
    const {user} = useContext (UserContext);
    const navigate = useNavigate();

    function bookmovie(){
      if(user)

    { 
      
      if(user.accountType == 'Admin') 
      toast.error("admin can't book")
      navigate("/movies")
  
}
else{
  navigate("/login")
  
    }
    }


  return (
    <div className='w-[100vw] '>
<div className='w-full hero-bg   py-3 min-h-max flex flex-col relative justify-center  herobottom'>

 
    <div className=' flex flex-wrap w-full max-w-[1320px] mx-auto flex-row-reverse  justify-center items-center px-1'>
    <div className='w-[40%] sm:min-w-96 hidden md:block'>
       
        <img className=' sm:w-[600px] mx-auto' src={hero}></img>
      </div>
      <div className='w-[80%] sm:w-[60%] sm:min-w-96 flex flex-col gap-10 justify-center tems-center'>
      <div className={"sm:pl-10 text-wrap  font-semibold text-white "+ (small ? " w-[80vw] text-[8vw]" : "  text-6xl")}>Unleash Your Cinematic Odyssey with <p className=" bg-gradient-to-br from-textcolor via-[#BD86FF] to-textcolor inline-block bg-clip-text text-transparent">
CineZen
</p></div>
      <div className={'text-white/50 sm:pl-10  sm:w-full text-wrap ' + (small && " text-[3vw] w-[80vw]")}><p>Immerse yourself in the magic of the big screen.Effortless booking, exclusive rewards, and a world of genres await. Your ticket to unparalleled movie experiences starts here. Book now and let the reel adventure begin!</p></div>
      <div className={ small ? "w-full px-2 flex justify-center " : " pl-10 "}>
     <button onClick={bookmovie} className= {' sm:px-4 px-1 py-2 sm:text-3xl font-semibold text-white button-bg rounded-xl  ' + (small && " w-[90vw]") }>{user ? "Book Movie Now" :"Get Started" }</button>

      </div>
      </div>
     
    </div>
  
 </div>
 
   <HomeCarousal/>



    </div>
  )
}

export default Home