import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { apiConnector } from '../API/apiconnector';
import {  endpoints} from "../API/apis";
import toast from 'react-hot-toast';
import Typewriter from 'typewriter-effect';
const VerifyEmail = () => {
    
    const [loading,setLoading] = useState(true);
    const { token } = useParams();
    const {VERIFY_API} = endpoints;
    const navigate = useNavigate();
    const [flag, setFlag] = useState(false);
    const timerId = useRef(null);
 
    useEffect(() => {
        if (flag) {
 
            //Creating a timeout
            timerId.current = setTimeout(() => {             
                navigate('/login')
            }, 3000);
        }
 
        return () => {
            //Clearing a timeout
            clearTimeout(timerId.current);
        };
    }, [flag]);
    async function verifyEmail(){
        try {
            
            setLoading(true);
            const res = await apiConnector("POST",VERIFY_API , {
              verifytoken:token,
            });
            if(res.data.success==false){
                toast.error(res.data.message);
                toast.error("Signup again")
                setLoading(false);
                navigate('/signup');
            }
            
            setLoading(false);
            toast.success("Email verified successfully");
            setFlag(true);
            
        } catch (e) {
           toast.error(e.response.data.message);
           toast.error("Signup again");
            setLoading(false);
            navigate('/signup')
          }
        }

        useEffect(() => {

        verifyEmail() 

        }, [])

    return (
        <div className='w-full h-[100vh] flex justify-center items-center text-3xl text-textcolor'>
        <div className='mx-auto'>

     
        {loading && <><p>Verifying your email</p>
        <Typewriter
          onInit={(typewriter) => {
            typewriter.typeString('.')
              .pauseFor(50)
              .typeString('.')
              .pauseFor(50)
              .typeString('.')
              .pauseFor(50)
              .typeString('.')
              .pauseFor(50)
              .typeString('.')
              .deleteAll()
              .start();
          }}
        />
        </>
}
          
        {!loading && <><p className=''>Email Verified. Redirecting to login</p>
        <Typewriter
          onInit={(typewriter) => {
            typewriter.typeString('.')
              .pauseFor(50)
              .typeString('.')
              .pauseFor(50)
              .typeString('.')
              .pauseFor(50)
              .typeString('.')
              .pauseFor(50)
              .typeString('.')
              .deleteAll()
              .start();
          }}
        />
        </>
}
          
</div>
        </div>
  )
}

export default VerifyEmail