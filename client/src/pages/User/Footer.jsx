import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className='absolute bottom-0 w-full bg-bg-1 z-50 py-3 px-11 flex items-center justify-between border-t-gray-400/25 border-t'>
    
      <div className='text-gray-100 flex flex-wrap gap-3 text-xl'>
        
         <Link className='hover:text-textcolor duration-300' to="https://github.com/maitrey5288">

        <FaFacebook/>
         </Link> 
         <Link  className='hover:text-textcolor duration-300'   to="https://www.linkedin.com/in/maitrey-chitale-23250a22a/">
        <FaLinkedin/>
        </Link> 
         <Link  className='hover:text-textcolor duration-300'  to="https://github.com/maitrey5288">
        <FaGithub/>
         </Link> 
         <Link className='hover:text-textcolor duration-300'   to="https://github.com/maitrey5288">
        <FaInstagram/>
        </Link> 
      </div>
      <p className='text-gray-400/80 '>© 2023 Maitrey Chitale. All rights reserved.</p>



    </div>
  )
}

export default Footer