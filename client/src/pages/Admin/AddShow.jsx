import React, { useEffect, useState } from 'react'
import { apiConnector } from "../../API/apiconnector";
import { movieAPI } from "../../API/apis";
import toast from 'react-hot-toast';
 
import "react-datepicker/dist/react-datepicker.css";
import { useMediaQuery } from 'react-responsive';
const AddShow = ({movie}) => {
    const [selectedtheatre, setSelectedTheatre] = useState("");
   
    const currentDate = new Date();

// Extract year, month, and day
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
const day = String(currentDate.getDate()).padStart(2, '0');

// Format the date as yyyy-mm-dd
const formattedDate = `${year}-${month}-${day}`;

 
const small = useMediaQuery({ query: '(max-width: 385px)' })
    const [date, setDate] = useState(formattedDate);
   
    const { GETTHEATRES_API} = movieAPI;
    const [theatres,setTheatres] = useState([])
    const [showType, setShowType] = useState('2D');
    const { ADDSHOWDATA_API } = movieAPI;
    const[loading,setLoading] = useState(false);
 
    const [durationmin,setDurationmin ] = useState(0);
    const [durationhr,setDurationhr ] = useState(0);
 
    function changehandler(e) {
      setSelectedTheatre(e.target.value);
    }
async function getTheatres(){
  try {
    setLoading(true);
const res = await apiConnector("POST", GETTHEATRES_API, {});

if(res.data.success == false){
toast.error(res.data.message)
}
else{
setTheatres(res.data.data);
}
setLoading(false);

} catch (e) {
toast.error(e.message);
}
}

useEffect(() => {
  getTheatres()
}, [])
function changeMinutes(e){
 
  if(e.target.value == -1){
    setDurationmin(60);
  }
  else if(e.target.value >= 61 || e.target.value <= 0){
    setDurationmin(0);
  }
   
  else{
    setDurationmin(e.target.value)
  }
}
function changeHr(e){
  if(e.target.value == -1){
    setDurationhr(23);
  }
  else if(e.target.value >= 24 || e.target.value <= 0){
    setDurationhr(0);
  }
  else{
    setDurationhr(e.target.value)
  }
}
    async function submitHandler(){
        try {
            setLoading(true);
            
      const res = await apiConnector("POST", ADDSHOWDATA_API, {
        theatreId: selectedtheatre,movieId : movie._id,time:(durationhr+':'+durationmin),date,type:showType
      });
       
      if(res.data.success == false){
        toast.error(res.data.message)
      }
      else{
        toast.success("show created successfully")
      }
      setLoading(false);
      
    } catch (e) {
      toast.error(e.message);
    }
    }

  return (
    <div className={'w-[95%] md:w-[70%] bg-bg-4 flex flex-col flex-wrap p-2 rounded-lg mt-2 '+ (small && "  text-[3vw]")}>
      
<div className='flex text-white w-full flex-wrap'>
             
            <div className='flex justify-start items-center w-full flex-wrap sm:min-w-72 sm:w-[50%] '>
            <p    className='text-textcolor   inline-block'>Theatre : </p>
            <div>
            <select
            id ='theatre'
            className="bg-bg-1 my-3 p-2 rounded-md inline-block"
            onChange={e => setSelectedTheatre(e.target.value)}
            defaultValue={""}
            value={selectedtheatre}
            >
            <option value="" disabled>
                Choose a theatre
            </option>
            {theatres.map((theatre, index) => {
                return (
                <option value={theatre._id} key={index}>
                    {theatre.name}
                </option>
                );
            })}
            </select>
</div>
            </div>

 </div>


 

        <div className='flex w-full flex-wrap  my-2'>


        <div className='flex justify-start flex-wrap items-center gap-1 w-full sm:min-w-72 sm:w-[50%] '>
                            <p htmlFor='durationhr'  className='text-textcolor' >Time :</p>
                            <div className=' flex'>
                          <div className='flex justify-center  items-center text-white'>
                            <input className='bg-bg-1 w-11 text-center border border-black rounded-md ' id='durationhr' name='durationhr'    value={durationhr} onChange={changeHr} type='number' placeholder='oh'/>
                          <p  className='text-white mx-1' >H</p>
                          </div>
                          <div className='flex  justify-center items-center text-white'>
                            <input className='bg-bg-1  w-11 text-center border border-black rounded-md' id='durationmin' name='durationmin'   value={durationmin} onChange={changeMinutes} type='number' placeholder='om'/>
                          <p  className='text-white mx-1' >m</p>
                          </div>
                          </div>
          </div>
 
           <div className='flex flex-wrap gap-2 items-center  w-full mt-2 sm:min-w-72 sm:w-[50%]'>
                <p className='text-textcolor  w-max  ' htmlFor='date'>Date :</p>
                <input className='bg-bg-1 p-2 rounded-md text-white' value={date}   onChange={(e) => setDate(e.target.value)}  min={formattedDate} type='date' />
           </div> 

        </div>
<div className='flex w-full flex-wrap  my-2'>
         <div className='flex gap-4 flex-wrap w-full sm:min-w-72 sm:w-[50%] '>
         <div>
        <p className='text-textcolor'>Show Type :</p>
         </div>
         <div className='flex gap-1'>
        <div className='flex gap-1'>
        <input className='accent-textcolor inline-block'  type="radio" id="2D" value="2D" checked={ showType ===  "2D"} onChange={() => setShowType("2D")}/> 
        <p className='text-white'  htmlFor="2D"> 2D </p> 
        </div>
        <div className='flex gap-1'>

        <input className='accent-textcolor inline-block' type="radio" id="3D" value="3D" checked={ showType ===  "3D"} onChange={() => setShowType("3D")}/> 
        <p  className='text-white'   htmlFor="3D"> 3D </p> 
        </div>
        </div>
        </div>
<div className='flex gap-4 flex-wrap min-w-72 w-[50%] '>

</div>
</div>
          <div className='flex justify-end px-3 py-3 flex-wrap'>

          <button onClick={submitHandler} className="px-3 py-1 rounded-lg bg-textcolor hover:shadow-lg hover:bg-textcolor/95 hover:shadow-black text-white font-semibold">Submit</button>
          </div>

        


    </div>
  )
}

export default AddShow

 