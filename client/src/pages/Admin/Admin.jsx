import React from 'react'
import Card from './Card';
import { movieAPI} from "../../API/apis";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiConnector } from '../../API/apiconnector';
import AddLocation from "../../components/AddLocation";
import AddTheatre from "../../components/AddTheatre";
 
const Admin = () => {
    const navigate = useNavigate();
    const [theatres,setTheatres] =useState([]); 
    const [locations,setLocations] =useState([]); 
    const [selectedtheatre,setSelectedTheatre] = useState('');
    const [selectedlocation,setSelectedLocation] = useState('');
   
    const[addlocation,setAddLocation] = useState(false); 
    const[addTheatre,setAddTheatre] = useState(false); 
    const { GETTHEATRES_API,GETLOCATIONS_API,ADDLOCATION_API} = movieAPI;
   const [loading,setLoading] = useState(false)
    const [moviedata,setMoviedata] = useState([])
    const {GETMOVIES_API} = movieAPI

    async function getMoviesData(){
      setLoading(true)
      const res = await apiConnector("POST" ,GETMOVIES_API,{location:selectedlocation,theatre:selectedtheatre} );
      setMoviedata(res.data.data); 
      console.log("movies",res.data)
      setLoading(false)
    }
 
    function theatrechangehandler(e) {
        setSelectedTheatre(e.target.value);
        
    }
     function locationchangehandler(e) {
         
          setSelectedLocation(e.target.value);
        
       
        
        
    }

    async function getLocations(){
        setLoading(true)
        const res = await apiConnector("POST", GETLOCATIONS_API ,{});
console.log(res.data.data , "FSgrefbd")
        setLocations(res.data.data);
        
        
        setLoading(false)
    }
 

  

  useEffect(() => {
    locations.forEach(l => {
        if(l._id == selectedlocation){
            if(l.theatres)
            {setTheatres( l.theatres);}
        else
       { setTheatres([])}
          
        }
    });
  }, [selectedlocation])

  useEffect( () => {
    getMoviesData()
  }, [selectedlocation,selectedtheatre])
  
  useEffect(() => {
    getLocations();
    // getMoviesData();
  }, [])

  return (
    loading ? <>Loading</> : (<div className="bg-bg-1 text-white  w-full h-[200vh]     px-32">
        <div className='text-3xl text-white w-full flex flex-col items-center my-2'>
                <p>All Movies</p>
                <div className={`h-1 w-36 mt-1 bg-textcolor`}></div>
        </div>
        <div className='w-full flex justify-evenly mt-4'>                    
            <div>
                <input className='w-44 h-8 bg-neutral-500/25 border-textcolor border rounded-md p-2' placeholder='Search'></input>
            </div>
            <button onClick={()=>navigate("/admin/addmovie")} className='px-3 py-1 rounded-lg bg-textcolor hover:shadow-lg hover:bg-textcolor/95 hover:black text-white font-semibold'>
                Add +
            </button>
        </div>
        <div className="w-[70%] p-3 mx-auto flex justify-between">
     
      
    <div className="flex justify-between items-center">
    
      <div className="flex gap-3 items-center">
        <p className="text-textcolor text-xl">Select Location</p>
        <select
          className="bg-bgcarousalcontent my-3 p-2 rounded-md text-white"
          onChange={locationchangehandler}
      
           value={selectedlocation}
        >
          <option value="">
           All
          </option>
          {console.log(locations,"Lofas")}
          { 
            locations?.map((location, index) => {
            
            return (
              <option  value={location._id} key={index}>
                {location.name}
              </option>
            );
          })}
        </select>
      </div>
    
     
      </div>
    

    
<div>
   { selectedlocation != '' && <><div className="flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <p className="text-textcolor text-xl">Select Theatre</p>
        <select
          className="bg-bgcarousalcontent my-3 p-2 rounded-md text-white"
          onChange={theatrechangehandler}
          defaultValue={""}
          value={selectedtheatre}
        >
          <option value="">
            All
          </option>
          {theatres?.map((theatre, index) => {
            return (
              <option value={theatre._id} key={index}>
                {theatre.name}
              </option>
            );
          })}
        </select>
      </div>

     
    </div>
     
    </>  } </div>


      </div>
        <div  className=' w-full flex-wrap   justify-center mt-9 flex gap-4'>
        {
            moviedata?.map((movie)=>{
            
            return <Card key={movie._id} movie={movie}/>
        })}
        </div>

    </div>)
  )
}

export default Admin