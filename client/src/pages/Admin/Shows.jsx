import React, { useContext, useEffect, useState } from "react";
import { apiConnector } from "../../API/apiconnector";
import { movieAPI } from "../../API/apis";
import toast from "react-hot-toast";
 
import { useNavigate, useParams } from "react-router-dom";
 
import AddShowWithMovie from "./AddShowWithMovie";
import { ProgressContext } from "../../context/Context";
import MediaQuery,{ useMediaQuery } from "react-responsive";
 import { IoMdAddCircleOutline } from "react-icons/io";
const Shows = () => {
  const small = useMediaQuery({ query: '(max-width: 385px)' })
    const navigate = useNavigate();
    const [shows,setShows] =useState([]); 
    const [loading, setLoading] = useState(false);

    const [theatres,setTheatres] =useState([]); 
    const [selectedtheatre, setSelectedTheatre] = useState("");

    const [locations,setLocations] =useState([]); 
    const [selectedlocation, setSelectedLocation] = useState("");

   const [addShowButton,setAddShowButton] = useState(false);

    const {theatreId} = useParams();
    const {GETSHOWDATA_API,DELETE_SHOW,GETLOCATIONS_API} = movieAPI;
    const { setProgress} = useContext(ProgressContext);
    async function getShows(){
        try {
          
          if(theatreId)
           {
            setProgress(10)
            setLoading(true);
            
            const res = await apiConnector("POST", GETSHOWDATA_API, {
              theatreId
            });
            setProgress(50)
            setShows(res.data.data);
            setProgress(70)
            
            
            setLoading(false);
            setProgress(100)
          }
          else if(selectedtheatre){
              setProgress(10)
              setLoading(true);
              
              const res = await apiConnector("POST", GETSHOWDATA_API, {
                theatreId:selectedtheatre
              });
              setProgress(50)
              setShows(res.data.data);
              setProgress(70)
              
              setProgress(100)
              setLoading(false);
            }
            else{
              setProgress(10)
              setShows([])
              setProgress(100)
            }
          } catch (e) {
            setProgress(100)
            toast.error(e.message);
          }




    }

    async function deleteShow(show){
      try {
        setProgress(10)
        setLoading(true);
        const res = await apiConnector("POST", DELETE_SHOW, {
          showId : show._id
        });
        setProgress(50)
        setShows(res.data.data);
        setProgress(70)
      
        setLoading(false);
        setProgress(100)
      } catch (e) {
        setProgress(100)
        toast.error(e.message);
      }



    }
 
  async function getLocations(){
    try{setProgress(10)
    setLoading(true)
    const res = await apiConnector("POST", GETLOCATIONS_API ,{});
    setProgress(50)
    setLocations(res.data.data);
    setProgress(70)
    
    
    setLoading(false)
    setProgress(100)
  }
  catch(e){
    setProgress(100)
    toast("error occurred")
    navigate(-1);
  }
  }

  useEffect(() => {
    setProgress(10)
    setSelectedTheatre('')
    setShows([])
    locations.forEach(l => {
        if(l._id == selectedlocation){
            
            if(l.theatres) setTheatres( l.theatres)
            else {
          setTheatres([])
         
        }
                
        }
    });
          setProgress(100)
  }, [selectedlocation])

  useEffect( () => {
    
    getShows()
  }, [selectedtheatre])
  
  useEffect(() => {
    getLocations();
    
     
    getShows();
    return () => {
      setShows([])
    }
  }, [])
  
  return (
    <> 
     <div className="bg-bg-2 text-white  w-full  pt-4    ">
     <div className="text-3xl text-white w-full flex flex-col items-center ">
        <p className="border-b-4 border-textcolor">Shows</p>
        
      </div>
        <div className="sm:w-[70%] w-full p-3 mx-auto flex flex-wrap justify-evenly">
       {!theatreId && <div className="flex justify-evenly items-center">
    
    <div className="flex gap-3 flex-wrap items-center">
    <p className="text-textcolor md:text-xl w-max">Select Location</p>
      <select
      className={"bg-bgcarousalcontent   p-2 sm:text-base  rounded-md text-white " +( small&& " text-[4vw]")}
        onChange={e => setSelectedLocation(e.target.value)}
    
         value={selectedlocation}
      >
        <option value="">
         All
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
  
   
    </div>}
  

  
   
      {!theatreId && selectedlocation != '' && <><div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <p className="text-textcolor text-xl">Select Theatre</p>
            <select
              className="bg-bgcarousalcontent my-3 p-2 rounded-md text-white"
              onChange={e => setSelectedTheatre(e.target.value)}
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
     <div className="w-[70%] p-3 mx-auto"> 
      <div className="w-full flex justify-center flex-col items-center">
      
      <MediaQuery minWidth={350}>
          <div className="w-full justify-end flex" >

            <button
              onClick={()=>setAddShowButton(!addShowButton)}
              className="px-3  py-1 flex   items-center  gap-1 rounded-lg bg-textcolor hover:shadow-lg hover:bg-textcolor/95 hover:shadow-black text-white font-semibold text-sm"
            >
             <IoMdAddCircleOutline /> <p> Add Show</p>
            </button>
         
          </div>
          </MediaQuery>
          <MediaQuery maxWidth={349}>
          <div >

            <button
              onClick={()=>setAddShowButton(!addShowButton)}
              className="px-3  py-1 flex   items-center gap-1 rounded-lg bg-textcolor hover:shadow-lg hover:bg-textcolor/95 hover:shadow-black text-white font-semibold text-[4vw]"
            >
             <IoMdAddCircleOutline /> <p> Add Show</p>
            </button>
         
          </div>
          </MediaQuery>
  {addShowButton && <div className="w-full  ">
  <AddShowWithMovie shows={shows} setShows={setShows} selectedtheatreForListing={selectedtheatre}/>
    </div>  }


   {shows?.length>0 ? <div className="mx-auto flex flex-col text-white w-full bg-bgcarousalcontent mt-5  rounded-lg border border-gray-600" >
  <div className="flex gap-3 justify-evenly bg-bgcarousalcontent  rounded-t-lg py-3">
            <div className="flex w-[50%] justify-start pl-10 items-center"><p>Movie</p></div>
            <div className="flex w-[10%] justify-start pl-10 items-center"><p>Type</p></div>
            <div className="flex w-[20%] justify-center items-center">Date</div>
            <div className="flex w-[20%] justify-center items-center">Action</div>
        </div> 

    {shows?.map((show, index) => {
    return (
        <div className={`flex py-2 gap-3 justify-evenly hover:bg-slate-500 bg-slate-700 border-b border-bgcarousalcontent rounded-sm`}>
            <div className="flex w-[50%] justify-start pl-10 items-center"><p>{show?.movie?.name}</p></div>
            <div className="flex w-[10%] justify-center items-center"><button  >{show?.type}</button></div>
            <div className="flex w-[20%] justify-center items-center"><button  >{show?.date.split('T')[0]} {show?.time}</button></div>
            <div className="flex   justify-center items-center px-2 py-1 rounded-lg bg-textcolor hover:shadow-lg hover:bg-textcolor/95 hover:shadow-black text-white font-semibold"><button  onClick={()=>{deleteShow(show)}}>Delete</button></div>
        </div>
    );
  })}
    </div> : <div className="sm:text-3xl text-[5vw] w-full text-center mt-2 text-white" >{selectedtheatre == '' ? "Select Theatre and location to view Shows":"NO Shows Present!!!"}</div>}
      
    </div>  
      
      </div>
 </>


  );
};

export default Shows;
