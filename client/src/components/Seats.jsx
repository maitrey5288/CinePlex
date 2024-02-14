import React from 'react'
import Seat from './Seat'

export default function Seats   ({rows,leftcols ,rightcols ,setSelectedSeats,seats,setAmount,amount,cost})  {
const curdate = new Date();
const fifteen = 16 * 60 * 1000;
console.log(seats['A1']?.status && Math.abs( curdate.getTime() - new Date( seats['A1']?.date).getTime())> fifteen , "diff")
  return (
    <>
     <div className='w-[4%] bg-textcolor text-white rounded-md text-xs flex flex-col gap-1 px-1 py-[2px] justify-center items-center'>
 

    {  rows.map((row)=>{
     return <li className='text-center flex gap-1'>
              
<div   className={`sm:w-[17px] sm:h-[17px] sm:text-xs w-[13px] h-[13px] text-[10px] `}><p>{row} </p></div> 
                  
            
         </li>

     })}
     </div>
    <ul className='flex gap-1 flex-col'>
    { rows?.map((row)=>{
        return <li className=' flex gap-1'>
             {
                 leftcols?.map((col)=>{
                     return <Seat cost={cost} setAmount={setAmount} amount={amount} row={row} col={col} setSelectedSeats={setSelectedSeats}  status={ Math.abs( curdate.getTime() - new Date( seats[(row+col)]?.date).getTime())> fifteen ? seats[(row+col)]?.status : 'locked'} selected={false}/>
                 })
             }
         </li>

     })}
     </ul>
     <ul className='flex gap-1 flex-col'>
     { rows?.map((row)=>{
        return <li className=' flex gap-1'>
             {
                 rightcols?.map((col)=>{
                     return <Seat cost={cost} setAmount={setAmount} amount={amount} row={row} col={col} setSelectedSeats={setSelectedSeats} status={ Math.abs( curdate.getTime() - new Date( seats[(row+col)]?.date).getTime())> fifteen ? seats[(row+col)]?.status : 'locked'} selected={false} />
                 })
             }
         </li>

     })}
     </ul>
     <div className='w-[4%] bg-textcolor text-white rounded-md text-xs flex flex-col gap-1 px-1 py-[2px] justify-center items-center'>
 

    {  rows.map((row)=>{
     return <li className='text-center flex gap-1'>
              
<div   className={`sm:w-[17px] sm:h-[17px] sm:text-xs w-[13px] h-[13px] text-[10px `}><p>{row} </p></div> 
                  
            
         </li>

     })}
     </div>
     </>
  )
}

 