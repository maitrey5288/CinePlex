import React, { useContext, useEffect, useState } from 'react'
import './seats.css'
import { apiConnector } from '../../API/apiconnector';
import { movieAPI } from "../../API/apis";
 
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import RowLetter from '../../components/RowLetter';
import Seats from '../../components/Seats';
import { buyCourse } from "../../payment/payment"
import { ProgressContext, UserContext } from '../../context/Context';
import { useMediaQuery } from 'react-responsive';
 
export default function BookMovie(){
  const small = useMediaQuery({ query: '(max-width: 350px)' })
  const {setProgress} = useContext(ProgressContext);
 const [normalrows,setnormalrows]=useState(['A','B','C']);
 const [executiverows,setexecutiverows] =useState(['D','E','F','G','H']);
 const [premiumrows,setpremiumrows] = useState(['I','J','K']);
 const [leftcols,setleftcols] = useState([1,2,3,4,5,6,7,8]); 
 const [rightcols,setrightcols] = useState([ 9,10,11,12,13,14,15,16]); 
    const {showId} = useParams();
    const {GETSEATS_API}  = movieAPI;
    const [seats,setSeats] = useState(false);
    const [loading,setLoading] = useState(false);
    const [showData,setShowData] = useState('');
 const navigate = useNavigate();
    const [amount,setAmount] = useState(0);
    const [selectedSeats , setSelectedSeats] = useState([])
    async function getSeatsData() {
        try {
          setProgress(10);
          setLoading(true);
          const res = await apiConnector("POST",GETSEATS_API , {
            showId,
          });
          setProgress(50);
          await setSeats(res.data.data);
          setProgress(60);
          setShowData(res.data.showDetails)
          setProgress(70);
         
          setLoading(false);
          
          setProgress(100);
        } catch (e) {
          setProgress(100);
          toast.error(e.message);
        }
      }

      useEffect(() => {
        getSeatsData();
      

      }, [])
      useEffect(() => {
       
      

      }, [seats])
      useEffect(() => {
       
      

      }, [selectedSeats])
      const {user} = useContext(UserContext);
  async function buyHandler(){
    
     
      buyCourse(selectedSeats,showId, user,navigate,setSelectedSeats,setAmount)
 
  
  }

  return (<>{   !loading && <div className='flex flex-col justify-center items-center'>
 <div className="movie-container flex flex-col items-center ">
  
    <div className='text-textcolor  sm:w-[25%] mt-4 flex gap-2'>
        <div>
        <div className='flex gap-1'>Movie: </div>
        <div className='flex gap-1'>Theatre: </div>
        <div className='flex gap-1'>Time: </div>
        </div>
        <div>
        <p className='text-white'>{showData?.movie}</p>
        <p className='text-white'>{showData?.theatre}</p>
        <p className='text-white'>{showData?.time}</p>
        </div>
    </div>
  
  
  
 

<div className='flex flex-col items-center'>
  <div className="container w-[70%] sm:w-[50%] mx-auto mt-10">
    <div className="screen h-[70px] w-full sm:w-full bg-white"></div>
  
  </div>
  
  <div className='flex gap-3 max-w-[100vw] overflow-auto '>

    
    
<div className='flex flex-col gap-1 mt-2 mb-4'>

 <div className='flex gap-1'>
 <p className='text-textcolor'>Normal : </p>
 <p className='text-white'> 200rs</p>
</div>
<div className='flex sm:gap-8 gap-4  mt-1 mb-4 justify-center items-center'>
      <Seats cost={200} setAmount={setAmount} amount={amount} rows={normalrows} leftcols={leftcols} rightcols={rightcols} setSelectedSeats={setSelectedSeats} seats={seats}/>
</div>
<div className='flex gap-1'>
 <p className='text-textcolor'>Executive : </p>
 <p className='text-white'> 250rs</p>
</div>
<div className='flex sm:gap-8 gap-4 mt-1 mb-4 justify-center items-center'>
      <Seats cost={250} setAmount={setAmount} amount={amount} rows={executiverows} leftcols={leftcols} rightcols={rightcols} setSelectedSeats={setSelectedSeats} seats={seats}/>
</div>
<div className='flex gap-1'>
 <p className='text-textcolor'>Premium : </p>
 <p className='text-white'> 280rs</p>
</div>
<div className='flex sm:gap-8 gap-4 mt-1 mb-4 justify-center items-center'>
      <Seats cost={280} setAmount={setAmount} amount={amount} rows={premiumrows} leftcols={leftcols} rightcols={rightcols} setSelectedSeats={setSelectedSeats} seats={seats}/>
</div>

</div>
   
</div>
</div>
 
</div>
<div className={'text-white  gap-3 flex flex-col mb-4 justify-center items-center sm:w-[460px]  '+ (small ? " w-[80%]" : " w-[345px]")}>
  <div className='flex '>
  <p className='text-textcolor'>Selected Seats :</p>{selectedSeats.length > 0 ? selectedSeats.toString() : "NA"}
  </div>

  

   
  <button disabled={amount==0}  className={`button-bg w-full py-1 rounded-xl ${amount==0 && "cursor-not-allowed"}`} onClick={buyHandler}>Pay ₹{amount}</button>
  
</div>
  
 </div>}
 </>
  )
}

 