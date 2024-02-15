import axios from "axios"
import { useContext } from "react";
import { UserContext } from "../context/Context";

export const axiosInstance = axios.create({});

function getToken(){
    try {
        return localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
    } catch (error) {
        return null
    }
}

export const apiConnector = (method, url, bodyData, headers, params) => {
    const token = getToken(); 
   
    let finaldata = bodyData ? bodyData : {};
    if(token){
    
      finaldata['token'] = token;
 
    }
                                                                            
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: finaldata,
        headers: headers ? headers: null,
        params: params ? params : null,
    });
}