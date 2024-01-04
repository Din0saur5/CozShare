

import { useEffect, useState } from "react";
import {
    useLoaderData,
  useNavigate,
} from "react-router-dom";
import { Outlet } from "react-router-dom";
import "../App.css"


const AppLayout = () =>{
  const navigate = useNavigate();
  let data = null
  data = useLoaderData(); 
  const [userData, setUserData] = useState(data)
  useEffect(()=>{
    setUserData(data) 
  
    if (data === null){
    navigate('/')
    }
  },[data, navigate, userData])


    
  

  return (
    <>
    <Outlet context={[userData, setUserData]} />
    </>
  )
 
}
export default AppLayout;

