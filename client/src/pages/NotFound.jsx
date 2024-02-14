import React from 'react'
import { Link } from 'react-router-dom'
import './css/notfound.css'
import errorImg from "../assets/Error.svg"
const NotFound = () => {
  return (
    <>
    <div className="container mx-auto h-[80vh]">
      <div className="text">
        <h1>Page Not Found</h1>
        <p>We can't seem to find the page you're looking for. Please check the URL for any typos.</p>
       
        <ul className="menu">
          <li><Link to={'/'}>Go to Homepage</Link></li>
          <li><Link to={'/movies'}>Search Movies</Link></li>
          <li><Link to={'/movies'}>Book tickets</Link></li>
        </ul>
      </div>
      <div><img className="image" src={errorImg} alt=""></img><a className='text-gray-400/40' href="https://storyset.com/web">Web illustrations by Storyset</a></div>

    </div>
     
      
   
      </>
    
  
  )
}

export default NotFound