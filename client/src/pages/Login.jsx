import React, { useContext, useState } from 'react'
import { apiConnector } from '../API/apiconnector';
import {  endpoints} from "../API/apis";
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { UserContext } from '../context/Context';
import { useMediaQuery } from 'react-responsive';
const Login = () => {
  const small = useMediaQuery({ query: '(max-width: 300px)' })
  const{setUser} =useContext(UserContext) 
    const navigate = useNavigate();
    const {LOGIN_API} = endpoints;
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    })
  
    const [showPassword, setShowPassword] = useState(false)
  const[loading,setLoading] =useState(false);
    const { email, password } = formData
  
    const handleOnChange = (e) => {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }))
    }

   async function submitHandler (e) {
      e.preventDefault()
      try {
            
        setLoading(true);
        const res = await apiConnector("POST",LOGIN_API , {
          formData         
        });
       
        localStorage.setItem("token", JSON.stringify(res.data.token))
        localStorage.setItem("user", JSON.stringify(res.data.user))
        setUser(res.data.user);
        setLoading(false);
        toast.success("Loged in successfully")
        navigate('/')
    } catch (e) {
       toast.error(e.response.data?.message);
       toast.error("Signup again");
        setLoading(false);
      }
    }
  
    return (
      
      <div className='h-[100vh] flex justify-center items-center loginbg'>
     <form
        onSubmit={submitHandler}
        className="text-xs border border-textcolorb shadow-lg shadow-black sm:text-base flex rounded-lg bg-bg-5 px-8 py-2 max-w-[300px] sm:max-w-[100vw] w-[80vw] sm:w-[40vw] mx-auto flex-col justify-center items-center "     
      >
              <p className='text-xl sm:text-3xl text-textcolor border-b-2 sm:border-b-4 py-1 border-textcolor'>LogIn</p>
            
        <div className="flex flex-wrap px-8 py-2  justify-start items-start max-w-[300px] sm:max-w-[100vw] w-[80vw] sm:w-[40vw]">
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
        <div className="flex flex-wrap px-8 py-2 justify-between max-w-[300px] sm:max-w-[100vw] w-[80vw] sm:w-[40vw]">
        <div className="relative sm:w-full max-w-[300px] sm:max-w-[100vw] w-full  ">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-textcolor">
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
              className="w-full border border-textcolor rounded-[0.5rem] bg-richblack-800 p-1.5 sm:p-[12px] text-textcolor"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 sm:top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
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
          Sign In
        </button>
        <div className="flex flex-wrap  px-4 justify-between max-w-[300px] sm:max-w-[100vw] w-[80vw] sm:w-[40vw] mt-2">
        <div className="sm:w-full max-w-[300px] sm:max-w-[100vw] w-full  ">
            <p className="mb-1 text-center  text-[0.875rem] leading-[1.375rem] text-black">
           Not A Member ?  <Link className='cursor-pointer text-blue-700' to={"/signup"}>Register Here</Link>
            </p>
            
          </div>
         
        </div>
      </form>
      </div>
    )
  
}

export default Login