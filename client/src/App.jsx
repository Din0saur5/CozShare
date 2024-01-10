

import { createRoot } from "react-dom/client";
import {
        createBrowserRouter,
        
        RouterProvider,
        
      } from "react-router-dom";
import Home from "./routes/Home";
import ErrorPage from "./routes/ErrorPage";
import Dashboard from "./routes/Dashboard";
import AppLayout from "./components/AppLayout";
import CurrentUserProfile from "./routes/CurrentUserProfile";
import AccountSettings from "./routes/AccountSettings";
import Event from "./routes/Event";
import UserProfile from "./routes/UserProfile";
import List from "./routes/List";
      


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
          path: "/",
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
              element: <Dashboard/>,
              loader: fetchData,
            },
            {
              path: "/profile",
              element: <CurrentUserProfile/>, 
              loader: fetchData,
            },
            {
              path: "/settings",
              element: <AccountSettings/>, 
              loader: fetchData,
            },
            {
              path: "/event/:id",
              element: <Event/>, 
              loader: fetchData,
            },
            {
              path: "/profile/:id",
              element: <UserProfile/>, 
              loader: fetchData,
            },
            {
              path: "/followers",
              element: <List type={'followers'}/>, 
              loader: fetchData,
            },
            {
              path: "/following",
              element: <List type={'following'}/>, 
              loader: fetchData,
            },
            {
              path: "/search/:query",
              element: <List type={'query'}/>, 
              loader: fetchData,
            },
            {
              path: "/events",
              element: <List type={'events'}/>, 
              loader: fetchData,
            },
            
          ]
        }
        
        
      
      ]);
      
      createRoot(document.getElementById("root")).render(
        <RouterProvider router={router} />
      );
    