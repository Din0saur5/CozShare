
      import * as React from "react";
      import { createRoot } from "react-dom/client";
      import {
        createBrowserRouter,
        RouterProvider
      } from "react-router-dom";
      import Home from "./routes/Home";
      import Navbar from "./components/Navbar";
      import { Outlet } from "react-router-dom";
      import ErrorPage from "./routes/ErrorPage";
      import "./App.css"
      
      const AppLayout = () =>{
      
        return(
          <>
          <Navbar/>
          <Outlet/>
          </>
        )
      }

      const router = createBrowserRouter([
        // pre-login
        { 
          path: "/",
         
        errorElement: <ErrorPage/>,
          children:[
            {
              path: "/",
              element: <Home/>
            }
          ]
        } // post-login
        // ,{
        //   path: "/app",
        //   element: <AppLayout/>,
        // errorElement: <ErrorPage/>,
        //   children:[
        //     {
        //       path: "/app",
        //       element: <Home/>
        //     }
        //   ]
        // }
        
        
      
      ]);
      
      createRoot(document.getElementById("root")).render(
        <RouterProvider router={router} />
      );
    