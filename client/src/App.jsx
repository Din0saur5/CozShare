

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

const server = import.meta.env.VITE_URL;


// function fetchData() {


// return fetch(`${server}/check_session`, { credentials: 'include' })
//   .then(response => {
//     if (response.ok) {
//       return response.json(); // Parse the JSON if the response is successful
//     } else {
//       return null // Throw an error if not successful
//     }
//   })
  
 
//   .catch(error => {
//     console.log("Error:", error.message);
//     return null; // Return null in case of error
//   });



// }
  

  


      const router = createBrowserRouter([
        {
          path: "/",
          loader: async () =>{ return fetch(`${server}/check_session`, { credentials: 'include' }) },
          element: <AppLayout />,
          errorElement: <ErrorPage />,
          children:[
            {
              path: "/",
              element: <Home/> // doesnt require authentication
            },
            {
              path: "/dashboard",
              element: <Dashboard/>,
              // loader: fetchData,
            },
            {
              path: "/profile",
              element: <CurrentUserProfile/>, 
            //  loader: fetchData,
            },
            {
              path: "/settings",
              element: <AccountSettings/>, 
            //  loader: fetchData,
            },
            {
              path: "/event/:id",
              element: <Event/>, 
            //  loader: fetchData,
            },
            {
              path: "/profile/:id",
              element: <UserProfile/>, 
            //  loader: fetchData,
            },
            {
              path: "/followers",
              element: <List type={'followers'}/>, 
            //  loader: fetchData,
            },
            {
              path: "/following",
              element: <List type={'following'}/>, 
            //  loader: fetchData,
            },
            {
              path: "/search/:query",
              element: <List type={'query'}/>, 
            //  loader: fetchData,
            },
            {
              path: "/events",
              element: <List type={'events'}/>, 
            //  loader: fetchData,
            },
            
          ]
        }
        
        
      
      ]);
      
      createRoot(document.getElementById("root")).render(
        <RouterProvider router={router} />
      );
    