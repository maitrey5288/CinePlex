import React, { useState } from 'react'
import movieimg from '../../assets/movie.png'
import { useNavigate } from 'react-router-dom'
const Card = ({movie}) => {
  
   
  const navigate = useNavigate()
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <div onClick={()=>navigate(`/admin/movieDetails/${movie._id}`)}  onMouseOver={handleMouseOver}
    onMouseOut={handleMouseOut} className={` bg-bg-2   card w-[200px]   hover:shadow-md    cursor-pointer  rounded-lg   flex flex-col justify-start`}>
            <div className='h-[300px] w-[200px] relative'>

            <img className={`${isHovering && 'blur-sm' } rounded-t-lg w-full object-fill h-[300px]   duration-300`} src={movie?.image} alt={"movieimg"}></img>
            {isHovering && (
          <div className='absolute top-0 w-full  h-full flex items-center justify-center'>
            <button className='px-2 py-1  w-max h-max rounded-md  w3-animate-top bg-textcolor text-white'>Book Now</button>
          </div>
        )}
            </div>
            <div className='p-3 flex flex-col justify-between h-full'>
            <div>

                <div className='flex justify-between'>
                   <div className='text-white font-semibold w-[75%] text-sm '> {movie.name}</div>
                   <div className='text-gray-300 w-[24%] text-center'> </div>
                </div>
                <div className='text-gray-300'>{movie.genre.toString()}</div>
            </div>
            <div className='flex justify-between '>

            <div className='text-gray-300'>{movie.releaseDate}</div>
            <div className='text-gray-300'>{movie.duration}</div>
            </div>
      
            </div>
    </div>
  )
}

export default Card