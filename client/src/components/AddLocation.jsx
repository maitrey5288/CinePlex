import React, { useContext, useState } from 'react'
import { movieAPI } from "../API/apis";
import toast from 'react-hot-toast';
import { apiConnector } from '../API/apiconnector';
import { ProgressContext } from '../context/Context';
import { useMediaQuery } from 'react-responsive';
const AddLocation = ({setSelectedTheatre1,setTheatres,setSelectedLocation1,setLocations}) => {
  const { setProgress,progress } = useContext(ProgressContext);
  const small = useMediaQuery({ query: '(max-width: 385px)' })
    const { ADDLOCATION_API } = movieAPI;
    const[location,setLocation] = useState('');
    const [loading, setLoading] = useState(false);
async function submitHandler(){
    try {
      setProgress(10)
      setLoading(true);
      const res = await apiConnector("POST", ADDLOCATION_API, {
        location: location,
      });
      setProgress(50)
      
      if(res.data.success){
        toast.success("Location Added")
        setLocations(oldArray => [...oldArray, res.data.data]);
        setProgress(70)
        setSelectedTheatre1('')
        setSelectedLocation1('')
        setTheatres([])
        setLocation('')
        
      }
        setProgress(100)
        
        
        setLoading(false);
      } catch (e) {
        setProgress(100)
        setLoading(false);
        console.log(e);
        toast.error(e.response?.data?.message);
      }
}
  return (
    <div className='flex w-full flex-wrap justify-start my-2 items-center bg-bg-4 p-3 rounded-md'>
    {loading && <div>Loading</div>}
   {!loading && <div className='flex flex-wrap gap-2 justify-center items-center'>
            <label className='text-textcolor'>Location Name</label>
            <input className={' p-1 rounded-lg bg-bg-2  text-white' + (small && " w-[80%] text-[4vw]")} value={location} onChange={(e)=>{setLocation(e.target.value)}} placeholder='Enter Location name'/>
    
            <button onClick={submitHandler} className="px-3 py-1 rounded-lg bg-textcolor hover:shadow-lg hover:bg-textcolor/95 hover:shadow-black text-white font-semibold">Submit</button> 
    </div>}

    
    </div>
  )
}

export default AddLocation