import React, { useState } from 'react'
import { MdOutlineChair } from "react-icons/md";
import { MdChair } from "react-icons/md";
const Seat = ({selected,row,col,status,setSelectedSeats,setAmount,amount,cost}) => {
   
    const[isselected,setSelected] = useState(selected)



    const addSeat = (seatId) => {
      setSelected(true);
      setSelectedSeats(prevSeats => [...prevSeats, seatId]);
    
    setAmount(amount+cost)
    }
    const removeSeat = (seatId) => {
      setSelected(false);
      setSelectedSeats(prevSeats => prevSeats.filter(id => id !== seatId));
      setAmount(amount-cost)
    };
  

  return (
    <>
    {!isselected && status=='unbooked' && <div onClick={()=>addSeat(row+col)} className={`sm:w-[17px] sm:h-[17px] sm:text-xs w-[13px] h-[13px] text-[10px] flex items-center justify-center hover:shadow-md hover:shadow-black  text-white hover:border-white hover:bg-textcolor cursor-pointer border border-textcolor`}><p>{col}</p></div>}
    {isselected && status=='unbooked' && <div onClick={()=>removeSeat(row+col)} className={`sm:w-[17px] sm:h-[17px] sm:text-xs w-[13px] h-[13px] text-[10px] flex items-center justify-center  text-white  bg-textcolor cursor-pointer border border-textcolor`}><p>{col}</p></div>}
    {status!='unbooked' && <div   className={`sm:w-[17px] sm:h-[17px] sm:text-xs w-[13px] h-[13px] text-[10px] flex items-center justify-center  text-white   bg-slate-900`}><p>{col}</p></div>}

    </>
  )
}

export default Seat