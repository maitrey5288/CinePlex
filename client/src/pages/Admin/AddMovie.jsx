import React, { useContext, useRef, useState } from 'react' 
import { apiConnector } from '../../API/apiconnector';
import { movieAPI} from "../../API/apis";
import toast from 'react-hot-toast';
import { IoMdCloudUpload } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
 
import { UserContext } from '../../context/Context';
const AddMovie = () => {
  const [formData,setFormData]  = useState({name:"",durationhr:0})
  const {ADDMOVIE_API} = movieAPI
  const [image,setImage] = useState(false)
  const [loading,setLoading] = useState(false)
  const [date, setDate] = useState(new Date());
  const [durationmin,setDurationmin ] = useState(0);
  const {token}  = useContext(UserContext);
 function changeHandler (e){
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }
  const currentDate = new Date();

  // Extract year, month, and day
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
  const day = String(currentDate.getDate()).padStart(2, '0');
  
  // Format the date as yyyy-mm-dd
  const formattedDate = `${year}-${month}-${day}`;
  
   
  async function submitHandler (e){
    toast.loading("Submiting")
    const finaldata = new FormData();
    finaldata.append('image',image) 
    finaldata.append('name',formData.name) 
    finaldata.append('language',formData.language) 
    finaldata.append('releaseDate',date) 
    finaldata.append('duration',(formData.durationhr + "h "+ durationmin + 'm')) 
    finaldata.append('genre',formData.genre) 
    finaldata.append('directors',formData.directors) 
    finaldata.append('topcast',formData.topcast) 
    finaldata.append('description',formData.description) 
    finaldata.append('token',token) 
    setLoading(true)
    try{
    e.preventDefault()
    const res = await apiConnector("POST" ,ADDMOVIE_API,
      finaldata );
    if(res.data.success){
      toast.dismiss();
      toast.success("Movie added successfully")
      setLoading(false)
    }else{
      toast.dismiss();
      toast.error("error")
    }
    setLoading(false)
  }
    catch(error){
      toast.dismiss();
      toast.error(error.message)
      setLoading(false)
    }
    
  }
  const inputRef = useRef(null);
    
    
  const handleImageClick = () => {
      inputRef.current.click();
    };

    const handleImageChange = (event) => {
      
      setImage(event.target.files[0])
      
 

    };
function changeMinutes(e){
  if(e.target.value >= 61 || e.target.value <= 0){
    setDurationmin(0);
  }
  else{
    setDurationmin(e.target.value)
  }
}

  return (
    <div className='min-h-[100vh] bg-bg-1 w-[100vw] flex flex-wrap flex-col items-center'>
          <div className='w-[70%]  bg-bg-4   shadow-lg shadow-black rounded-xl md:my-8 p-4'>
              <div>
                <div className='flex flex-wrap gap-5'>
                  
                  <div className='cursor-pointer'>
           
           {image ?  (<div className='relative' ><img src={URL.createObjectURL(image)} className='sm:w-52 sm:h-80 w-[90%] h-[8vw] rounded-md  shadow-2xl'/><div onClick={()=>setImage(false)} className=' bg-textcolorb rounded-full p-[0.5%] hover:p-[1%] hover:shadow-black hover:shadow text-white absolute -top-1 -right-1'><TiDelete/></div> </div>)
            :( <div onClick={handleImageClick} 
             className='bg-bg-3 border border-textcolorb/80 sm:w-52 sm:h-80 w-[90%] h-[80vw] rounded-md hover:shadow-4xl  shadow-2xl bg-richblack-800 flex gap-3 flex-col items-center justify-center p-4'>
                  <div  className='text-textcolorb  text-3xl'>
  
                  <IoMdCloudUpload/>
                  </div>
                  <div className=' w-full text-center text-white/60 sm:text-base text-[3.5vw]'>Drag and drop an image, or <p className='text-yellow-50'>Browse</p> Max 6MB each</div>
                  <div className="w-full text-center flex flex-wrap items-center justify-center gap-3 sm:text-base text-[3.5vw]">
                      <div className="text-gray-200 text-xs font-semibold leading-tight sm:text-base text-[3.5vw]">&#x2022; <p>Aspect ratio 9:16</p></div>
                      <div className="text-gray-200 text-xs font-semibold leading-tight sm:text-base text-[3.5vw]">&#x2022; <p>Recommended size 1024x576</p></div>
                  </div>
              </div>)}
             
              </div>
            
              <input
              type='file'
              ref={inputRef}
              onChange={handleImageChange}
              style={{display : 'none'}}
              ></input>
           
                  <div className='py-10 flex flex-col flex-wrap gap-1 sm:w-[60%] w-full'>
                      <div className='sm:text-3xl w-full text-[]'>
                        <label htmlFor='nameinp' className='text-textcolorb  font-semibold sm:w-[130px] inline-block'>Name : </label>
                        <input className=' bg-bg-3 text-white px-1 rounded-md w-[80%]' id='nameinp' name='name' value={formData.name} onChange={changeHandler} placeholder='Enter Movie Name'/>
                      </div>
                     
                        <div className='flex items-center gap-1 justify-start'>
                          <p className='text-textcolorb w-max sm:w-[130px] font-semibold' >lang : </p>
                           
                          <select
                            className=" bg-bg-3 my-3  rounded-md text-white"
                            onChange={changeHandler}
                            name='language'
                            value={formData.language}
                          >
                            <option value="Hindi"  >
                              Hindi
                            </option>
                            <option value="English"  >
                              English
                            </option>
                            <option value="Marathi">
                              Marathi
                            </option>
                            <option value="Telugu">
                              Telugu
                            </option>
                            
                          </select>
                        </div>
                  
                          <div>
                            <label htmlFor='releaseDate' className='text-textcolorb w-[130px] inline-block font-semibold'>Release Date : </label>
                            <input className='border border-black rounded-md bg-bg-3 text-white w-auto' type='date'  max={formattedDate} selected={date} onChange={(e) => setDate(e.target.value)}  />

                          </div>
                          <div className='flex flex-wrap'>
                            <label className='text-textcolorb w-max sm:w-[130px] inline-block font-semibold' htmlFor='durationhr'>Duration :</label>
                          <div className='flex justify-center w-[15%] items-center   flex-col'>
                            <input className=' bg-bg-3 text-white text-center border-black rounded-md w-full sm:w-[50%]' id='durationhr' name='durationhr' min={0}  value={formData.durationhr} onChange={changeHandler} type='number' placeholder='oh'/>
                            <p className='text-white'> hh</p>
                          </div>
                          <p className='text-textcolorb'>:</p>
                          <div className='flex w-[15%] justify-center items-center flex-col'>
                            <input className=' bg-bg-3 text-white w-full sm:w-[50%] text-center border-black rounded-md' id='durationmin' name='durationmin'  value={durationmin} onChange={changeMinutes} type='number' placeholder='om'/>
                            <p className='text-white'> mm</p>
                          </div>
                          <div className='flex justify-start'>
                          </div>
                          </div>
                     
                   
                          <div>
                          <label className='text-textcolorb font-semibold sm:w-[130px] inline-block' htmlFor='genre text-textcolorb font-semibold'>Genre : </label>
                          <input className=' bg-bg-3 rounded-md px-1 text-white w-full' id='genre' name='genre'  value={formData.genre} onChange={changeHandler}  placeholder='Enter genres'/>
                          </div>
                          <div> 
                          <label className='text-textcolorb font-semibold sm:w-[130px] inline-block' htmlFor='directors text-textcolorb font-semibold'>Directors : </label>
                          <input className=' bg-bg-3 rounded-md px-1 text-white w-full' id='directors' name='directors' value={formData.directors} onChange={changeHandler}  placeholder='Enter director names'/>
                          </div>
                          <div>
                          <label className='text-textcolorb font-semibold sm:w-[130px] inline-block' htmlFor='topcast text-textcolorb font-semibold'>Top cast : </label>
                          <input className=' bg-bg-3 rounded-md px-1 text-white w-full' id='topcast' name='topcast' value={formData.topcast} onChange={changeHandler}  placeholder='Top cast'/>
                          </div>
                      
                  </div>
                </div>



                <div className='flex flex-col mt-5 ml-3 gap-2'>
                        <label className='text-3xl text-textcolorb font-semibold' htmlFor='description'>Description : </label>
                        
                        <textarea className=' bg-bg-3 p-1 rounded-md text-white' id='description' name='description' value={formData.description} onChange={changeHandler} placeholder='Description'/>
                     
                </div>
                <div className='flex justify-end px-9'>
                  <button onClick={submitHandler} className='border-textcolorb mt-3 border bg-textcolorb/80  rounded-xl text-white px-3 py-2 text-lg hover:bg-textcolorbl hover:translate-y-[-2px] hover:duration-300'>Submit</button>
                </div>
              </div>
          </div>
    </div>
  )
}

export default AddMovie