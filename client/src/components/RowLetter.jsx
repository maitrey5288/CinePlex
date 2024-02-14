import React, { useEffect, useState } from 'react'

const RowLetter = (rows) => {
     

    return (
    <div className='w-[4%] bg-textcolor text-white rounded-md text-xs flex flex-col gap-1 px-1'>
    {  rows.map((row)=>{
     return <li className='text-center flex gap-1'>
              
<div   className={`w-[17px] h-[17px] text-xs   `}><p>{row} </p></div> 
                  
            
         </li>

     })}
</div>
  )
}

export default RowLetter