/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const UserRow = ({user, currentUser, setCurrentUserData}) => {
    
    
    const [userData, setUserData] = useState({})
    const [followStatus, setFollowStatus] = useState(false)
  
   
    
    // Debugging log
    console.log("User ID:", user, "Following:", currentUser.following, "Follow status:", followStatus); 
    
    useEffect(()=>{       
        if (currentUser.following.includes(user)) {
            setFollowStatus(true);
        } else {
            setFollowStatus(false);
        }
            const server = import.meta.env.VITE_URL;
            const config = {
                credentials: 'include',
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                }};
      fetch(`${server}/users/${user}`,config)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            setUserData(data);
            console.log(data)
          })
          .catch(error => {
            console.error("Fetching data failed", error);
            // Handle the error state appropriately
            // e.g., set an error message state variable to display an error message
          })
        },[followStatus]) 

 
  
    const handleFollow = () => {
        let following = currentUser.following;
        let followerof = userData.followers;
        if (!followStatus) {
          following = [...currentUser.following, user];
          followerof = [...userData.followers, currentUser.id];
          setFollowStatus(true)
        } else {
          following = currentUser.following.filter(f => f !== user);
          followerof = userData.followers.filter(f => f !== currentUser.id);
          setFollowStatus(true)
        }
        const config = {
          credentials: 'include',
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ following: following }),
        };
        const config2 = {
          credentials: 'include',
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ followers: followerof }),
        };
      
        Promise.all([
          fetch(`${server}/users/${currentUser.id}`, config),
          fetch(`${server}/users/${user}`, config2)
        ])
        .then(responses => Promise.all(responses.map(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })))
        .then(data => {
          console.log('Responses:', data);
          setCurrentUserData(data[0])
        })
        .catch(error => {
          console.error('Failed to fetch:', error);
        });
      };
      

   

  return (
    <>
    <div data-aos="fade-up" className="card mt-2 w-96 bg-base-100 shadow-xl">
  <div className="card-body flex flex-row">
  <Link to={`/profile/${user}`}> 
  <div className="avatar hover:bg-transparent ">
                <div className="w-8 mask mask-hexagon hover:bg-transparent">
                    <img src={userData.profile_pic} />
                </div>
    </div>
  <h2 className="card-title">{userData.display_name}</h2></Link>
    <p>{userData.catchphrase}</p>
    <div className="card-actions justify-end">
        <button onClick={()=>{handleFollow()}} className="btn btn-secondary btn-xs">{followStatus? 'Unfollow':'Follow'}</button>
    </div>
  </div>
</div>
      
    </>
  )
}

export default UserRow
