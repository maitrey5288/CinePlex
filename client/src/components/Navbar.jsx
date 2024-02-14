import React, { useContext, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/Context'
import { IoPersonSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { motion} from "framer-motion"
import MediaQuery from 'react-responsive'
import { IoReorderThreeSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
 
import logo from "../assets/camera-shutter.svg"
const Navbar = ({logoutHandler}) => {
  const [dropDOpen,setDropDOpen] = useState(false);
  const {user} = useContext(UserContext);
  const location = useLocation();
 
  const [selected,setselected] = useState(false);
  const navigate = useNavigate();
   return (
  <>
    <div className={`  border-b-textcolor border-b-[0.5px] z-50 w-[100vw] flex justify-between overflow-visible    bg-bg-2 py-2  px-[3%]  top-0   fixed`}>
       
            <Link to={'/'}>
            <div className='text-textcolor text-xl font-semibold flex gap-1'>
            <img className='w-6 h-6' src={logo}></img>
            
          {/* <div className='flex'> <p className='text-white'>C</p>ine<p className='text-white'>Z</p>en</div>  */}
          <div className='flex'> <p className='text-white'>{`CineZen ${user?.accountType == 'Admin' ? "- [Admin]"  : ""}`}</p></div> 
            </div>
            </Link>
{user && <MediaQuery maxWidth={639}>
                    <motion.div  layout className=' relative flex-col  flex justify-center items-center   overflow-visible'>
           
                    <motion.div layout onClick={()=>setDropDOpen(!dropDOpen)}>{dropDOpen ?<IoClose className='text-textcolor text-2xl'/>  :<IoReorderThreeSharp className='text-textcolor text-3xl'/>}</motion.div>
                   
                 { <motion.div layout className={`absolute top-[100%] right-0 ${!dropDOpen && "w-0 h-0"} bg-w hite rounded-md  overflow-hidden bg-bg-3 text-white`}>
                    {(user?.accountType == 'Admin') ?<div className='flex flex-col  '>
                <Link to={'/'}><p className={location.pathname == '/'? "bg-textcolor px-2  py-1 font-semibold" : ' font-semibold  px-2 py-1' }>{dropDOpen && "Home"}</p></Link>
                <Link to={'/admin/movies'}><p className={location.pathname.startsWith('/admin/movie')? "bg-textcolor px-2  py-1 font-semibold" : ' font-semibold  px-2 py-1' }>{dropDOpen && "Movies"}</p></Link>
                  <Link to={'/admin/theatres'} ><p className={location.pathname.startsWith('/admin/theatres')? "bg-textcolor  py-1 px-2   font-semibold": 'font-semibold px-2  py-1' }>{dropDOpen && "Theatres"}</p></Link>
                  <Link to={'/admin/shows'} ><p className={location.pathname.startsWith('/admin/shows')? "bg-textcolor  py-1 px-2 font-semibold": ' font-semibold  px-2 py-1' }>{dropDOpen && "Shows"}</p></Link>
                   <p className=  ' font-semibold bg-white/40 px-2 py-1' onClick={logoutHandler} >{dropDOpen && "Logout"}</p> 
                 

                  </div> : user?.accountType == 'User' &&<div className='flex flex-col  '>

                  <Link to={'/'}><p className={location.pathname=='/'? "bg-textcolor px-2  py-1 font-semibold  " : 'text-textcolor font-semibold  py-1 px-2' }>{dropDOpen && "Home"}</p></Link>
                  <Link to={'/movies'}><p className={location.pathname=='/movies'? "bg-textcolor px-2  py-1 font-semibold  " : 'text-textcolor font-semibold  py-1 px-2' }>{dropDOpen && "Movies"}</p></Link>
                  <Link to={'/getBooking'} ><p className={location.pathname=='/getBooking'? "bg-textcolor  px-2  py-1 font-semibold  ": 'text-textcolor font-semibold px-2  py-1' }>{dropDOpen && "Bookings"}</p></Link>


                </div>   }
                    </motion.div>}

                 
                    </motion.div>
                    </MediaQuery>}
            <MediaQuery minWidth={640}>
            <div>
                {
                  
                  (user?.accountType == 'Admin') ?<div className='flex gap-3'>
                <Link to={'/'}><p className={location.pathname == '/'? "bg-textcolor px-2 py-1 rounded-2xl text-white" : 'text-textcolor font-semibold px-2 py-1' }>Home</p></Link>
                <Link to={'/admin/movies'}><p className={location.pathname.startsWith('/admin/movie')? "bg-textcolor px-2 py-1 rounded-2xl text-white" : 'text-textcolor font-semibold px-2 py-1' }>Movies</p></Link>
                  <Link to={'/admin/theatres'} ><p className={location.pathname.startsWith('/admin/theatres')? "bg-textcolor px-2 py-1 rounded-2xl text-white": 'text-textcolor font-semibold px-2 py-1' }>Theatres</p></Link>
                  <Link to={'/admin/shows'} ><p className={location.pathname.startsWith('/admin/shows')? "bg-textcolor px-2 py-1 rounded-2xl text-white": 'text-textcolor font-semibold px-2 py-1' }>Shows</p></Link>

                  </div> 
                  
                  : user?.accountType == 'User' ? <div className='flex gap-3'>

                  <Link to={'/'}><p className={location.pathname=='/'? "bg-textcolor px-2 py-1 rounded-2xl text-white" : 'text-textcolor font-semibold px-2 py-1' }>Home</p></Link>
                  <Link to={'/movies'}><p className={location.pathname=='/movies'? "bg-textcolor px-2 py-1 rounded-2xl text-white" : 'text-textcolor font-semibold px-2 py-1' }>Movies</p></Link>
                  <Link to={'/getBooking'} ><p className={location.pathname=='/getBooking'? "bg-textcolor px-2 py-1 rounded-2xl text-white": 'text-textcolor font-semibold px-2 py-1' }>Bookings</p></Link>


                 </div> 
                : <p className='text-textcolor'>Welcome ! ! !</p>}  
            </div>
            </MediaQuery> 
          {user ?
            <MediaQuery minWidth={640}>
      <motion.div layout onClick={()=> {setselected(!selected)}} onHoverStart={() => setselected(true)}  onHoverEnd={() => setselected(false)} className='cursor-pointer text-textcolor flex-col  flex justify-center items-center relative overflow-visible '>
         <motion.div layout className='flex justify-center items-center  ' > <IoPersonSharp/> {selected ? <IoIosArrowUp/> : <IoIosArrowDown/>} </motion.div>
          <motion.div layout className={`absolute top-[100%] bg-white rounded-md  ${selected ? "block p-2 " : "w-0 h-0"}`} onClick={logoutHandler}>{selected &&"Logout"}</motion.div> 
       </motion.div> 
       </MediaQuery> 
       
       :<motion.div layout onClick={()=> {setselected(!selected)}} onHoverStart={() => setselected(true)}  onHoverEnd={() => setselected(false)} className='cursor-pointer text-textcolor flex-col  flex justify-center items-center relative overflow-visible '>
         <motion.div layout className='flex justify-center items-center  ' > <IoPersonSharp/> {selected ? <IoIosArrowUp/> : <IoIosArrowDown/>} </motion.div>
          <motion.div layout className={`absolute top-[100%] bg-white rounded-md  ${selected ? "  p-2 " : "w-0 h-0"}`}>{selected &&<div className='w-16 text-center border-b rounded-md hover:bg-textcolor hover:text-white' onClick ={()=> {navigate('/login')}} >Log In</div>}{selected &&<div className='w-16 text-center rounded-md hover:bg-textcolor hover:text-white' onClick ={()=> {navigate('/signup')}} >Sign Up</div>}</motion.div> 
        
       </motion.div>}
         
                
    </div>






    <div className={`  border-b-textcolor border-b-[0.5px] w-[100vw] flex justify-between overflow-visible    bg-bg-2 py-2  px-[3%]       `}>
       
            <Link to={'/'}>
            <div className='text-textcolor text-xl font-semibold flex'>

            <p className='text-white'>C</p>ine<p className='text-white'>Z</p>en
            </div>
            </Link>

            <MediaQuery maxWidth={639}>
                    <motion.div className='flex justify-center items-center text-textcolor text-2xl'><IoReorderThreeSharp /></motion.div>
            </MediaQuery>
            <MediaQuery minWidth={640}>
            <div>
                {(user?.accountType == 'Admin') ?<div className='flex gap-3'>
                <Link to={'/admin/movies'}><p className={location.pathname.startsWith('/admin/movie')? "bg-textcolor px-2 py-1 rounded-2xl text-white" : 'text-textcolor font-semibold px-2 py-1' }>Movies</p></Link>
                  <Link to={'/admin/theatres'} ><p className={location.pathname.startsWith('/admin/theatres')? "bg-textcolor px-2 py-1 rounded-2xl text-white": 'text-textcolor font-semibold px-2 py-1' }>Theatres</p></Link>
                  <Link to={'/admin/shows'} ><p className={location.pathname.startsWith('/admin/shows')? "bg-textcolor px-2 py-1 rounded-2xl text-white": 'text-textcolor font-semibold px-2 py-1' }>Shows</p></Link>

                  </div> : user?.accountType == 'User' ? <div className='flex gap-3'>

                  <Link to={'/movies'}><p className={location.pathname=='/movies'? "bg-textcolor px-2 py-1 rounded-2xl text-white" : 'text-textcolor font-semibold px-2 py-1' }>Movies</p></Link>
                  <Link to={'/getBooking'} ><p className={location.pathname=='/getBooking'? "bg-textcolor px-2 py-1 rounded-2xl text-white": 'text-textcolor font-semibold px-2 py-1' }>Bookings</p></Link>


                </div> : <p className='text-textcolor'>Welcome ! ! !</p>}  
            </div>


          {user ?  <motion.div layout onClick={()=> {setselected(!selected)}} onHoverStart={() => setselected(true)}  onHoverEnd={() => setselected(false)} className='cursor-pointer text-textcolor flex-col  flex justify-center items-center relative overflow-visible '>
         <motion.div layout className='flex justify-center items-center  ' > <IoPersonSharp/> {selected ? <IoIosArrowUp/> : <IoIosArrowDown/>} </motion.div>
          <motion.div layout className={`absolute top-[100%] bg-white rounded-md  ${selected ? "block p-2 " : "w-0 h-0"}`} onClick={logoutHandler}>{selected &&"Logout"}</motion.div> 
       </motion.div> :<motion.div layout onClick={()=> {setselected(!selected)}} onHoverStart={() => setselected(true)}  onHoverEnd={() => setselected(false)} className='cursor-pointer text-textcolor flex-col  flex justify-center items-center relative overflow-visible '>
         <motion.div layout className='flex justify-center items-center  ' > <IoPersonSharp/> {selected ? <IoIosArrowUp/> : <IoIosArrowDown/>} </motion.div>
          <motion.div layout className={`absolute top-[100%] bg-white rounded-md  ${selected ? "  p-2 " : "w-0 h-0"}`}>{selected &&<div className='w-16 text-center border-b hover:bg-textcolor hover:text-white' onClick ={()=> {navigate('/login')}} >Log In</div>}{selected &&<div className='w-16 text-center hover:bg-textcolor hover:text-white' onClick ={()=> {navigate('/signup')}} >Sign Up</div>}</motion.div> 
        
       </motion.div>}
         
                </MediaQuery> 
    </div>
    
   

</>
  )
}

export default Navbar