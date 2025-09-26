// A protected container for our route
import React, { useEffect } from "react";
import {useSelector} from 'react-redux'
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
export default function Protected({children,Authentication}){
    const navigate = useNavigate();
    const [loader,setLoader] = useState(true);
    const authStatus= useSelector((state)=>state.Auth.status)
    useEffect(()=>{
        // if(authStatus===true){
        //     navigate(s);
        // }
        // else if(authStatus==false){
        //     navigate(s);
        // } the easy way

        if(Authentication&& authStatus!==Authentication){
            {console.log(`1 ${Authentication} ${authStatus}`)}
            navigate('/login');
        }
        else if(!Authentication && authStatus!==Authentication){
            navigate('/');
        }
        setLoader(false);
    },[authStatus,navigate,Authentication])
    return(
        <>
        {loader ? <h1>Loading...</h1> : children}
        </>
    )
}