import React, { useContext } from 'react'
 
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { UserContext } from '../context/Context';
 
const AdminRoute = ({children,userloading }) => {

    const {user} = useContext(UserContext);
    return (!userloading && user && user.accountType == 'Admin') ? <Outlet /> : <Navigate to="/" />
      

}

export default AdminRoute
