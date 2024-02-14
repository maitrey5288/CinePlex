import React, { useContext, useState } from 'react'
import { movieAPI } from "../API/apis";
import toast from 'react-hot-toast';
import { apiConnector } from '../API/apiconnector';
import { ProgressContext } from '../context/Context';
import { useMediaQuery } from 'react-responsive';
const AddTheatre = ({getLocations,selectedLocation1,setTheatres,setLocations,locations}) => {
  const { setProgress,progress } = useContext(ProgressContext);
  const small = useMediaQuery({ query: '(max-width: 385px)' })
    const { ADDTHEATRE_API } = movieAPI;
const[theatre ,setTheatre] = useState('')
const [loading, setLoading] = useState(false);
async function submitHandler(){
    try {
      setProgress(10)
      setLoading(true);
      const res = await apiConnector("POST", ADDTHEATRE_API, {
        location: selectedLocation1,name:theatre,
      });
      setProgress(50)
      
      if(res.data.success){
        toast.success("Theatre Added");
        
        setTheatres(oldArray => [...oldArray, res.data.data]);
        setProgress(70)
       
        await getLocations();
       
        setProgress(80)
      }
      
      setProgress(100)
      
      setLoading(false);
    } catch (e) {
      setProgress(100)
        toast.error(e.message);
        setLoading(false);
      }
}

return (
    <div className='flex w-full flex-wrap  justify-start my-2 items-center bg-bg-4 p-3 rounded-md'>
    {loading && <div>Loading</div>}
   {!loading && <div className='flex flex-wrap gap-2 justify-center items-center'>
   
    <label className='text-textcolor'>Theatre Name</label>
    <input className={' p-1 rounded-lg bg-bg-2  text-white' + (small && " w-[80%] text-[4vw]")} value={theatre} onChange={(e)=>{setTheatre(e.target.value)}} placeholder='Enter Theatre name'/>

  <button onClick={submitHandler} className="px-3 py-1 rounded-lg bg-textcolor hover:shadow-lg hover:bg-textcolor/95 hover:shadow-black text-white font-semibold">Submit</button> 
</div>}
</div>
  )
}

export default AddTheatre