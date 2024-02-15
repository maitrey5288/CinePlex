import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { apiConnector } from '../API/apiconnector';
import {  endpoints} from "../API/apis";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useMediaQuery } from 'react-responsive';
const Signup = () => {
  const small = useMediaQuery({ query: '(max-width: 300px)' })
    const navigate = useNavigate();
    const {SIGNUP_API} = endpoints;
    const [loading,setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
      const { firstName, lastName, email, password, confirmPassword } = formData
      const [showPassword, setShowPassword] = useState(false)
      const [showConfirmPassword, setShowConfirmPassword] = useState(false)
      const handleOnChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
      }

      async function submitHandler(event){
        event.preventDefault();
        try {
            
            setLoading(true);
            const res = await apiConnector("POST",SIGNUP_API , {
              formData
            });
 
            setLoading(false);
            navigate('/verify')
        } catch (e) {
           toast.error(e.response.data.message);
           toast.error("Signup again");
            setLoading(false);
          }
        }


    return (
  <div className='h-[100vh] flex justify-center items-center loginbg'>
     {!loading && 
    <form onSubmit={submitHandler} className="border-textcolorb border shadow-lg shadow-black text-xs sm:text-base flex rounded-lg bg-bg-5 p-2 max-w-[300px] sm:max-w-[100vw] w-[80vw] sm:w-[45vw] mx-auto flex-col justify-center items-center  ">
        <p className='text-xl sm:text-3xl text-textcolor border-b-2 sm:border-b-4 py-1 border-textcolor'>Signup</p>
        <div className="flex flex-wrap p-2 justify-between max-w-[300px] sm:max-w-[100vw] w-[80vw] sm:w-full">
        <div className=' max-w-[300px] sm:max-w-[100vw] w-[80vw] sm:w-[48%]'>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-textcolor">
              First Name <sup className="text-textcolor">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full border border-textcolor    rounded-[0.5rem] bg-richblack-800 p-1.5 sm:p-[12px] pr-10 text-textcolor"
            />
          </div>
          <div className=' max-w-[300px] sm:max-w-[100vw] w-[80vw] sm:w-[48%]'>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-textcolor">
              Last Name <sup className="text-textcolor">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full border border-textcolor    rounded-[0.5rem] bg-richblack-800 p-1.5 sm:p-[12px] pr-10 text-textcolor"
            />
          </div>
        </div>
        <div className="flex flex-wrap p-2  justify-start items-start max-w-[300px] sm:max-w-[100vw] w-[80vw] sm:w-full">
        <div className="sm:w-full max-w-[300px] sm:max-w-[100vw] w-full  ">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-textcolor">
            Email Address <sup className="text-textcolor">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full border border-textcolor rounded-[0.5rem] bg-richblack-800 p-1.5 sm:p-[12px] text-textcolor"
          />
        </div>
        </div>
        <div className="flex flex-wrap p-2 justify-between max-w-[300px] sm:max-w-[100vw] w-[80vw] sm:w-full">
        <div className='relative    max-w-[300px] sm:max-w-[100vw] w-[80vw] sm:w-[47%]'>
            <p className="mb-1 text-[0.852rem]   text-textcolor">
              Create Password <sup className="text-textcolor">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full border border-textcolor   rounded-[0.5rem] bg-richblack-800 p-1.5 sm:p-[12px] pr-10 text-textcolor"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3   sm:top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </div>
          <div className='relative max-w-[300px] sm:max-w-[100vw] w-[80vw] sm:w-[47%]'>
            <p className="mb-1 text-[0.852rem]   text-textcolor">
              Confirm Password<sup className="text-textcolor">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full border border-textcolor    rounded-[0.5rem] bg-richblack-800 p-1.5 sm:p-[12px] pr-10 text-textcolor"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute  right-3 sm:top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 button-bg w-full rounded-[8px] text-white py-[8px] p-1.5 sm:p-[12px] font-medium text-richblack-900"
        >
          Create Account
        </button>
        <div className="flex flex-wrap  px-4 justify-between max-w-[300px] sm:max-w-[100vw] w-[80vw] sm:w-[40vw] mt-2">
        <div className="sm:w-full max-w-[300px] sm:max-w-[100vw] w-full  ">
            <p className="mb-1 text-center  text-[0.875rem] leading-[1.375rem] text-black">
            Already A User ?  <Link className='cursor-pointer text-blue-700' to={"/login"}>Sign In</Link>
            </p>
            
          </div>
         
        </div>
      </form>



    }
    {loading &&  <div className='text-white'>Loading</div>}
    
    
    </div>
  )
}

export default Signup