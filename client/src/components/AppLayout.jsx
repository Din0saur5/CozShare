

import { useEffect, useState } from "react";
import {
    useLoaderData,
  useNavigate,
} from "react-router-dom";
import { Outlet } from "react-router-dom";
import "../App.css"


const AppLayout = () =>{
  const navigate = useNavigate();
  const data = useLoaderData(); 
  console.log(data)
  const [userData, setUserData] = useState(null)
  useEffect(()=>{
    setUserData(data) 
    
    if (userData === null){
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


//when needed this is logout fn
// function logout() {
//     setUserData(null);
//     fetch("/api/logout", {
//       method: "DELETE",
//     });
//     navigate("/");
//   }
      