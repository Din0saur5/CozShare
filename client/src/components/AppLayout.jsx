

// import { useEffect, useState } from "react";
// import {
//     useLoaderData,
//   useNavigate,
// } from "react-router-dom";
// import { Outlet } from "react-router-dom";
// import "../App.css"



// const AppLayout = () =>{
//   const navigate = useNavigate();
  
//   let data = useLoaderData(); 
//   const [userData, setUserData] = useState(null)
  


//   useEffect(()=>{
    
//     if (!data){
//       navigate('/')
//     }

//     setUserData(data) 
//   },[data, navigate, userData, ])


    
  

//   return (
//     <>
//     <Outlet context={[userData, setUserData]} />
//     </>
  
//   )
// }
// export default AppLayout;

import { UserContext } from './UserContext';
import { Outlet, useLoaderData, useNavigate  } from 'react-router-dom';

import { useEffect, useState } from 'react';

const AppLayout = () => { 
  const navigate = useNavigate();
  const data = useLoaderData();
  
  const [userData, setUserData] = useState(data);

  useEffect(() => {
    if (!userData) {
      navigate('/'); // Redirect to login if there is no user data
    }
  }, [userData, navigate]);




  return (
    <UserContext.Provider value={{userData, setUserData}}>
      <Outlet  />
    </UserContext.Provider>
  );
};

export default AppLayout;
