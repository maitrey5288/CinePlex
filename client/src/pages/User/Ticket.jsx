import React, { useContext, useState } from 'react'
import {AnimatePresence, AnimateSharedLayout, motion} from "framer-motion"
 
import QRCode from 'react-qr-code';
import { UserContext } from '../../context/Context';
import MediaQuery, { useMediaQuery } from 'react-responsive';
 
export const Ticket = ({ticket}) => {
  const small = useMediaQuery({ query: '(max-width: 914px)' })
  const xsmall = useMediaQuery({ query: '(max-width: 300px)' })
  const {isTabletOrMobile} = useContext(UserContext)
  const [isOpen,setIsOpen] = useState(false);
  const [flipped,setFlipped] = useState(false);
  function onclickListner(){
    setIsOpen(!isOpen);
    setFlipped(!flipped);
  }
  function hoverstarter(){
    setIsOpen(true);
    setFlipped(true);
  }
  function HoverEnder(){
    setIsOpen(false);
    setFlipped(false);
  }
 
 
  
  return (
    <>
<MediaQuery minWidth={640}>
    <motion.div layout onClick={onclickListner} onHoverStart={hoverstarter} onHoverEnd={HoverEnder} id='card1' className={'  sm:ml-[10%] mt-[5%] mx-auto rounded-[20px] ' + (isOpen ? ' w-[80%] sm:w-[60%]' : " w-[90%] sm:w-[35%]") }>
  
 

 <motion.div  layout className="cursor-pointer  hover:shadow hover:shadow-black     w-full h-min-[13rem]  flex    rounded-[20px]">
       
    <motion.div  layout className="bg-green-200 min-h-[30vw] w-[50%] sm:w-[70%] sm:min-h-52 flex flex-col justify-center gap-2 sm:justify-evenly rounded-l-[20px] p-2">
      <motion.div layout className="flex gap-1">
        <motion.div layout className="flex flex-col px-3 w-full">
          <motion.div layout className="  text-black/80 font-semibold text-[3vw] sm:text-sm">
            <p>Movie</p> 
          </motion.div>
          <motion.div layout className={"  font-semibold   sm:text-xl overflow-auto no-scrollbar text-[4vw] " +(!isOpen && "sm:h-6") }>
           <p>{ticket?.movie}</p> 
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div layout className={"flex " + (xsmall && " flex-wrap")}>
        <motion.div layout className="flex flex-col px-3 w-full">
          <motion.div layout className="  text-black/80 font-semibold text-[3vw] sm:text-sm">
            <p>Theatre </p>
          </motion.div>
          <motion.div layout className="  font-semibold text-[4vw] sm:text-xl"><p>{ticket?.theatre}</p></motion.div>
        </motion.div>
        <motion.div layout className="flex flex-col px-3 w-full">
          <motion.div layout className="  text-black/80 font-semibold text-[3vw] sm:text-sm">
            <p>Time </p>
          </motion.div>
          <motion.div layout className="  font-semibold text-[4vw] sm:text-xl"><p>{ticket?.time}</p></motion.div>
        </motion.div>
      </motion.div>

      <motion.div layout className="flex">
        <motion.div layout className="flex flex-col px-3 w-full">
          <motion.div layout className="  text-black/80 font-semibold text-[3vw] sm:text-sm">
            <p>Type</p> 
          </motion.div>
          <motion.div layout className="  font-semibold text-[4vw] sm:text-xl"><p>{ticket?.type}</p></motion.div>
        </motion.div>
        <motion.div layout className="flex flex-col px-3 w-full">
          <motion.div layout className="  text-black/80 font-semibold text-[3vw] sm:text-sm">
            <p>Cost</p>
          </motion.div>
          <motion.div layout className="  font-semibold text-[4vw] sm:text-xl"><p>{ticket?.amount}</p></motion.div>
        </motion.div>
      </motion.div>
      {isOpen  && <motion.div  >
<div layout className=' px-3 '>
<motion.h2 layout className="  text-black/80 font-semibold text-[3vw] sm:text-sm">
            <p>Seats</p> 
          </motion.h2>   <div layout className="overflow-auto  font-semibold text-[4vw] sm:text-xl"><p>{ticket?.seat.toString()}</p></div>
<div layout className="  text-black/80 font-semibold text-[3vw] sm:text-sm">
            <p>Location</p> 
          </div>   <div layout className="  font-semibold text-[4vw] sm:text-xl"><p>{ticket?.location}</p></div>
<div layout className="  text-black/80 font-semibold text-[3vw] sm:text-sm">
            <p>Seats</p> 
          </div>   <div layout className="  font-semibold text-[4vw] sm:text-xl"><p>Date :  {new Date(ticket?.date).toISOString().split('T')[0]}</p></div>
 
</div>
  </motion.div>}
    </motion.div>
    
        <motion.div layout onClick={()=>setFlipped(false)} className="bg-green-500 sm:min-h-52 min-h-[30vw] w-[50%] sm:w-[30%] sm:min-w-[100px] box-border flex flex-col justify-center items-center  border-dashed border-l-[3px] border-green-200   rounded-r-[20px] relative before:absolute before:w-3 before:h-3 before:bg-bg-1 before:rounded-full before:-left-1.5 before:-top-1.5 after:absolute after:w-3 after:h-3 after:bg-bg-1 after:rounded-full after:-left-1.5 after:-bottom-1.5">
   
      
     {!isOpen ? <motion.div layout className="w-full sm:min-h-52 text-center flex flex-col items-center justify-center ">
        <motion.div><p>{new Date(ticket?.date).toLocaleString('en-US', { month: 'short' })}</p></motion.div>
        <motion.div layout className="text-[7vw] sm:text-5xl font-semibold"><p>{new Date(ticket?.date).getDate()}</p></motion.div>
        <motion.div><p>{new Date(ticket?.date).getFullYear()}</p></motion.div>
      </motion.div>
    
         
      :<motion.div layout className="w-full min-h-52 text-center flex flex-col items-center justify-center">
      <QRCode
                        title="GeeksForGeeks"
                        value={JSON.stringify({hi : "true" , "id" : "Dsf"})}
                        bgColor={"transparent"}
                        fgColor={"bg-green-500"}
                        size={(xsmall ? 50 : small ? 100 : 150)}
                    />
             
      </motion.div>   }
    </motion.div>           
 
   
  </motion.div>
 

  </motion.div>
  </MediaQuery>
<MediaQuery maxWidth={639}>
    <motion.div layout onClick={onclickListner} onHoverStart={hoverstarter} onHoverEnd={HoverEnder} id='card1' className={'  sm:ml-[10%] mt-[5%] mx-auto rounded-[20px] ' + (isOpen ?  ' bg-bg-4 p-2 w-[80%] sm:w-[60%]' : " w-[90%] sm:w-[35%]") }>
  
 

 <motion.div  layout className="cursor-pointer  hover:shadow hover:shadow-black     w-full h-min-[13rem]  flex    rounded-[20px]">
       
    <motion.div  layout className="bg-green-200 min-h-[30vw] w-[50%] sm:w-[70%] sm:min-h-52 flex flex-col justify-center gap-2 sm:justify-evenly rounded-l-[20px] p-2">
      <motion.div layout className="flex gap-1">
        <motion.div layout className="flex flex-col px-3 w-full">
          <motion.div layout className="  text-black/80 font-semibold text-[3vw] sm:text-sm">
            <p>Movie</p> 
          </motion.div>
          <motion.div layout className={"  font-semibold   sm:text-xl overflow-auto no-scrollbar text-[4vw] " +(!isOpen && "sm:h-6") }>
           <p>{ticket?.movie}</p> 
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div layout className={"flex " + (xsmall && " flex-wrap")}>
        <motion.div layout className="flex flex-col px-3 w-full">
          <motion.div layout className="  text-black/80 font-semibold text-[3vw] sm:text-sm">
            <p>Theatre </p>
          </motion.div>
          <motion.div layout className="  font-semibold text-[4vw] sm:text-xl"><p>{ticket?.theatre}</p></motion.div>
        </motion.div>
        <motion.div layout className="flex flex-col px-3 w-full">
          <motion.div layout className="  text-black/80 font-semibold text-[3vw] sm:text-sm">
            <p>Time </p>
          </motion.div>
          <motion.div layout className="  font-semibold text-[4vw] sm:text-xl"><p>{ticket?.time}</p></motion.div>
        </motion.div>
      </motion.div>

      <motion.div layout className="flex">
        <motion.div layout className="flex flex-col px-3 w-full">
          <motion.div layout className="  text-black/80 font-semibold text-[3vw] sm:text-sm">
            <p>Type</p> 
          </motion.div>
          <motion.div layout className="  font-semibold text-[4vw] sm:text-xl"><p>{ticket?.type}</p></motion.div>
        </motion.div>
        <motion.div layout className="flex flex-col px-3 w-full">
          <motion.div layout className="  text-black/80 font-semibold text-[3vw] sm:text-sm">
            <p>Cost</p>
          </motion.div>
          <motion.div layout className="  font-semibold text-[4vw] sm:text-xl"><p>{ticket?.amount}</p></motion.div>
        </motion.div>
      </motion.div>
      
    </motion.div>
    
        <motion.div layout onClick={()=>setFlipped(false)} className="bg-green-500 sm:min-h-52 min-h-[30vw] w-[50%] sm:w-[30%] sm:min-w-[100px] box-border flex flex-col justify-center items-center  border-dashed border-l-[3px] border-green-200   rounded-r-[20px] relative before:absolute before:w-3 before:h-3 before:bg-bg-1 before:rounded-full before:-left-1.5 before:-top-1.5 after:absolute after:w-3 after:h-3 after:bg-bg-1 after:rounded-full after:-left-1.5 after:-bottom-1.5">
   
      
     {!isOpen ? <motion.div layout className="w-full sm:min-h-52 text-center flex flex-col items-center justify-center ">
        <motion.div><p>Feb</p></motion.div>
        <motion.div layout className="text-[7vw] sm:text-5xl font-semibold"><p>02</p></motion.div>
        <motion.div><p>2024</p></motion.div>
      </motion.div>
    
         
      :<motion.div layout className="w-full min-h-52 text-center flex flex-col items-center justify-center">
      <QRCode
                        title="GeeksForGeeks"
                        value={JSON.stringify({hi : "true" , "id" : "Dsf"})}
                        bgColor={"transparent"}
                        fgColor={"bg-green-500"}
                        size={(xsmall ? 50 : small ? 100 : 150)}
                    />
             
      </motion.div>   }
    </motion.div>           
 
   
  </motion.div>
  {isOpen  && <motion.div className='mt-2 text-white' >
<div layout className=' px-3 '>
<motion.h2 layout className="  text-white/80  font-semibold text-[3vw] sm:text-sm">
            <p>Seats</p> 
          </motion.h2>   <div layout className="overflow-auto  font-semibold text-[4vw] sm:text-xl"><p>{ticket?.seat.toString()}</p></div>
<div layout className=" text-white/80   font-semibold text-[3vw] sm:text-sm">
            <p>Location</p> 
          </div>   <div layout className="  font-semibold text-[4vw] sm:text-xl"><p>{ticket?.location}</p></div>
<div layout className="   text-white/80 font-semibold text-[3vw] sm:text-sm">
            <p>Seats</p> 
          </div>   <div layout className="  font-semibold text-[4vw] sm:text-xl"><p>Date : 06/2/2003</p></div>
 
</div>
  </motion.div>}

  </motion.div>
  </MediaQuery>
  </>
  )
}
