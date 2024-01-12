

import { useEffect, useState } from "react";
import {
    useLoaderData,
  useNavigate,
} from "react-router-dom";
import { Outlet } from "react-router-dom";
import "../App.css"


const AppLayout = () =>{
  const navigate = useNavigate();
  
  let data = useLoaderData(); 
  const [userData, setUserData] = useState(data)
  useEffect(()=>{
    
    if (data === null){
      navigate('/')
    }

    setUserData(data) 
  },[data, navigate, userData, ])


    
  

  return data?(
    <>
    <Outlet context={[userData, setUserData]} />
    </>
  ):(
    <>
    <Outlet />
    </>
  )
 
}
export default AppLayout;

