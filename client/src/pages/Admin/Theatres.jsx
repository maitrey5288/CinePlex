import React, { useContext, useEffect, useState } from "react";
import { apiConnector } from "../../API/apiconnector";
import { movieAPI } from "../../API/apis";
import toast from "react-hot-toast";
import AddLocation from "../../components/AddLocation";
import AddTheatre from "../../components/AddTheatre";
import { useNavigate } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import { ProgressContext } from "../../context/Context";
import MediaQuery, { useMediaQuery } from "react-responsive";
 
const Theatres = () => {
  const small = useMediaQuery({ query: '(max-width: 385px)' })
    const [theatres,setTheatres] =useState([]); 
    const [locations,setLocations] =useState([]); 
    const [selectedtheatre1,setSelectedTheatre1] = useState('');
    const [selectedlocation1,setSelectedLocation1] = useState('');
    const[loading,setLoading] = useState(false);
    const[addlocation,setAddLocation] = useState(false); 
    const[addTheatre,setAddTheatre] = useState(false); 
    const { GETTHEATRES_API,GETLOCATIONS_API,ADDLOCATION_API} = movieAPI;
    const { setProgress,progress } = useContext(ProgressContext);
    const navigate = useNavigate();
  function setAddTheatreFunction(){
    setAddTheatre(!addTheatre)
    setAddLocation(false)
  }
  function setAddLocationFunction(){
    setAddLocation(!addlocation)
    setAddTheatre(false)

  }
    function viewMovies(theatre){
      
      navigate(`/admin/movies/${theatre._id}`)
    }

    function viewShows(theatre){
      
      navigate(`/admin/shows/${theatre._id}`)
    }

    
   

    async function getLocations(){
     try{ setProgress(10)
        setLoading(true)
        const res = await apiConnector("POST", GETLOCATIONS_API ,{});
       
        setProgress(50)
        setLocations(res.data.data) 

        setProgress(70)

        setLoading(false)
        setProgress(100)
        }
        catch(e){
          setProgress(100)
          toast.error("error occured")
          navigate(-1);
        }
    }
 

  useEffect(() => {
    getLocations();
  }, [])
  useEffect(() => {
    setProgress(10)
    locations.forEach(l => {
         
        if(l._id == selectedlocation1){
            if(l.theatres)
            setTheatres( l.theatres);
        else
        setTheatres([])
            
        }
    });
    setProgress(100)
  }, [selectedlocation1])
  
 

  return (
    <>
    <div className="w-full bg-bg-2">
      
    
    <div className="sm:w-[70%] w-full p-3 mx-auto ">
      <div className="text-3xl text-white w-full flex flex-col items-center ">
      <p className="border-b-4 border-textcolor my-3">Theatres</p>
      </div>
      
    <div className="flex flex-wrap justify-evenly items-center">
    
      <div className="flex flex-wrap justify-evenly gap-3 items-center">
        <p className="text-textcolor md:text-xl w-max">Select Location</p>
        <select
          className={"bg-bgcarousalcontent   p-2 sm:text-base  rounded-md text-white " +( small&& " text-[4vw]")}
          onChange={(e)=>setSelectedLocation1(e.target.value)}
          defaultValue={""}
           value={selectedlocation1}
        >
          <option value="" disabled>
            Choose a location
          </option>
         
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
    

    

   { selectedlocation1 != '' && <><div className="flex justify-between items-center py-2  ">
      <div className="flex gap-3 items-center">
       
      </div>

      
    </div>
    </>  }

      </div>



    </div>
      <div className="w-full sm:w-[70%] p-3 mx-auto  ">
      <div className="w-full flex sm:justify-between justify-evenly gap-2 flex-wrap  px-5">
      <MediaQuery minWidth={350}>
          <div >

            <button
              onClick={setAddLocationFunction}
              className="px-3  py-1 flex   items-center gap-1 rounded-lg bg-textcolor hover:shadow-lg hover:bg-textcolor/95 hover:shadow-black text-white font-semibold text-sm"
            >
             <IoMdAddCircleOutline /> <p> Add Location</p>
            </button>
         
          </div>
          </MediaQuery>
          <MediaQuery maxWidth={349}>
          <div >

            <button
              onClick={setAddLocationFunction}
              className="px-3  py-1 flex   items-center gap-1 rounded-lg bg-textcolor hover:shadow-lg hover:bg-textcolor/95 hover:shadow-black text-white font-semibold text-[4vw]"
            >
             <IoMdAddCircleOutline /> <p> Add Location</p>
            </button>
         
          </div>
          </MediaQuery>
          <MediaQuery minWidth={350}>
          <div >

            <button
              onClick={setAddTheatreFunction}
              className="px-3  py-1 flex   items-center gap-1 rounded-lg bg-textcolor hover:shadow-lg hover:bg-textcolor/95 hover:shadow-black text-white font-semibold text-sm"
            >
             <IoMdAddCircleOutline /> <p> Add Theatre</p>
            </button>
         
          </div>
          </MediaQuery>
          <MediaQuery maxWidth={349}>
          <div >

            <button
              onClick={setAddTheatreFunction}
              className="px-3  py-1 flex   items-center gap-1 rounded-lg bg-textcolor hover:shadow-lg hover:bg-textcolor/95 hover:shadow-black text-white font-semibold text-[4vw]"
            >
             <IoMdAddCircleOutline /> <p> Add Theatre</p>
            </button>
         
          </div>
          </MediaQuery>
    </div> 
    {addlocation && <AddLocation  setLocations={setLocations} setAddLocation={setAddLocation} setSelectedLocation1={setSelectedLocation1} setTheatres={setTheatres} setSelectedTheatre1={setSelectedTheatre1}/>}
    {addTheatre && <AddTheatre getLocations={getLocations} locations={locations} setLocations={setLocations}  selectedLocation1={selectedlocation1} setTheatres={setTheatres}  />}
   {theatres.length>0 ? <div className="mx-auto flex flex-col text-white w-full bg-bgcarousalcontent mt-5  rounded-lg border border-gray-600" >
  <div className="flex gap-3 justify-evenly bg-bgcarousalcontent  rounded-t-lg py-3">
            <div className="flex w-[50%] justify-start pl-10 items-center"><p>Name</p></div>
            
            <div className="flex w-[20%] justify-center items-center">View</div>
        </div> 

    {theatres?.map((theatre, index) => {
    return (
        <div className={`flex py-2 gap-3 justify-evenly hover:bg-slate-500 bg-slate-700 border-b border-bgcarousalcontent rounded-sm`}>
            <div className="flex w-[50%] justify-start pl-10 items-center"><p>{theatre.name}</p></div>
            <div className="flex w-[20%] justify-center items-center gap-1">
            <div className="flex   justify-center items-center px-2 py-1 rounded-lg bg-textcolor hover:shadow-lg hover:bg-textcolor/95 hover:shadow-black text-white font-semibold"><button  onClick={()=>{viewMovies(theatre)}}>Movies</button></div>
            <div className="flex   justify-center items-center px-2 py-1 rounded-lg bg-textcolor hover:shadow-lg hover:bg-textcolor/95 hover:shadow-black text-white font-semibold"><button  onClick={()=>{viewShows(theatre)}}>Shows</button></div>
           
           
            </div>
        </div>
    );
  })}
    </div> : <div className="text-3xl w-full text-center text-white" >NO Theatres Present!!!</div>}
    </div>
    </>

  );
};

export default Theatres;
