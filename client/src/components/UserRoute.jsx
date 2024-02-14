import React, { useContext } from 'react'
 
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { UserContext } from '../context/Context';
import Profile from '../pages/User/Profile';
import Movies from '../pages/User/Movies';
import BookMovie from '../pages/User/BookMovie';
import UserMovieDetails from '../pages/User/UserMovieDetails';
import toast from 'react-hot-toast';

const UserRoute = ({children,userloading}) => {

    const {user} = useContext(UserContext);
    console.log(user)
    
    if (!userloading && user && user.accountType == 'User' )
     return <Outlet /> 
     
     else {
        toast.error("not allowed")
        return <Navigate to="/" />
        }
      

}

export default UserRoute
