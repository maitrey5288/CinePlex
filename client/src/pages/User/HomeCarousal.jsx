import React, { useContext, useEffect, useState } from 'react'
import Carousel from "react-multi-carousel";
import Card from './Card';
import { apiConnector } from '../../API/apiconnector';
import { movieAPI } from '../../API/apis';
import { ProgressContext } from '../../context/Context';
 
const HomeCarousal = ({shows}) => {
  

  const [loading,setLoading] = useState(false)
  const [moviedata,setMoviedata] = useState([])
  const {GETMOVIES_API} = movieAPI
const {setProgress} = useContext(ProgressContext);
  async function getMoviesData(){
    setProgress(10);
    setLoading(true)
    const res = await apiConnector("POST" ,GETMOVIES_API,{location:'',theatre:''} );
    setProgress(50);
    setMoviedata(res.data.data); 
    setProgress(70);
 
    setLoading(false)
    setProgress(100);
  }

  useEffect(() => {
    setProgress(100);
     getMoviesData();
     return () => {
      setMoviedata([])
    }
  }, [])
  

  return (
    <div className='w-[100vw] p-2 relative flex flex-col items-center carousal-bg'>
  <p className='inline-block    text-center text-white font-semibold text-2xl border-b-4 border-textcolorb py-2'>Now Playing</p>
    <div className='w-[100vw]  home-scrollbar'>
    <div className='flex overflow-x-auto gap-10 p-8 w-[100vw] '>
  
        {
              
            moviedata?.map((movie)=>{
            
            return <Card key={movie._id} movie={movie}/>
            
        })}
       
              </div>
              
    </div>
    </div>
  )
}

export default HomeCarousal