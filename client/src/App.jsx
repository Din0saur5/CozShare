
import * as React from "react";
import { createRoot } from "react-dom/client";
import {
        createBrowserRouter,
        RouterProvider,
        
      } from "react-router-dom";
import Home from "./routes/Home";
import ErrorPage from "./routes/ErrorPage";
import Dashboard from "./routes/Dashboard";
import AppLayout from "./components/AppLayout";
      


async function fetchData() {
  const server = import.meta.env.VITE_URL
  const response = await fetch(`${server}/check_session`);
  if (response.ok) {
    const data = await response.json();
    return data
  } else{
  return null
}}
    
  

  


      const router = createBrowserRouter([
        {
         
          element: <AppLayout/>, 
          loader: fetchData,
        errorElement: <ErrorPage/>,
          children:[
            {
              path: "/",
              element: <Home/> //set up context and on sign up or login set the context and session storage
            },
            {
              path: "/dashboard",
              element: <Dashboard/>
            }
          ]
        }
        
        
      
      ]);
      
      createRoot(document.getElementById("root")).render(
        <RouterProvider router={router} />
      );
    