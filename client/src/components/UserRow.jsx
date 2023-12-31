/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const UserRow = ({user, currentUser, setCurrentUserData, setList, list, table, viewedProfile}) => {
    const server = import.meta.env.VITE_URL

   // console.log(user)
    const [userData, setUserData] = useState(user)
    const [followStatus, setFollowStatus] = useState()
  
    

    useEffect(()=>{
        if (table != 'query'){
        if(user.id == currentUser.id)
            setFollowStatus('currentUser')
        else if (user.followers.includes(currentUser.id)){
            
            setFollowStatus(true)
        }
        else{
            
            setFollowStatus(false)
        }
    }

    },[user, currentUser, list, table])
      
 
            
          
      
    function handleFollow( targetUserId) {
        const url = `${server}/handle_follows`; // Adjust this to your server's URL
        const data = {
            target_user_id: targetUserId
        };
    
        fetch(url, {
            method: 'POST',
            credentials: 'include', // Include credentials for cookies, authentication.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if(data.action ==="followed"){
                setFollowStatus(true);
            } else {
                setFollowStatus(false);
            }
            setUserData(data.target);
            setCurrentUserData(data.user);
            return data;
        })
        .then(data => {    
            if(table === 'followers'){    
                const config = {
                    credentials: 'include',
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                };
                return fetch(`${server}/followers/${viewedProfile}`, config);
            }
            else if (table === 'following'){
                const config = {
                    credentials: 'include',
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                };
                return fetch(`${server}/following/${viewedProfile}`, config);
            }
            else if (table === 'members'){
                const config = {
                    credentials: 'include',
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                };
                return fetch(`${server}/members/${viewedProfile}`, config);
            }
            
           
        })
        .then(response => {
            if (!response) return; // If response is undefined, skip JSON parsing
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                setList(data);
                console.log(data);
            }
        })
        .catch(error => {
            console.error("Fetching data failed", error);
        });
    }
    
   

  return (
    <>
    <div data-aos="fade-up" data-aos-delay="100"  className="card mt-2 w-96 bg-base-100 shadow-xl">
  <div className="card-body flex">
  <Link to={followStatus === 'currentUser'? '/profile': `/profile/${userData.id}`}> 
  <div className="avatar hover:bg-transparent ">
                <div className="w-8 mask mask-hexagon hover:bg-transparent">
                    <img src={userData.profile_pic} />
                </div>
    </div>
  <h2 className="card-title">{userData.display_name}</h2></Link>
    <p className='card-body p-0' >{userData.catchphrase}</p> 
    <div className="card-actions justify-end">
        {followStatus === 'currentUser' || table === 'query'? (<></>):(
            
            <button onClick={()=>{handleFollow(userData.id)}} className="btn btn-secondary btn-xs">{followStatus? 'Unfollow':'Follow' }</button>
        )}
    </div>
  </div>
</div>
      
    </>
  )
}

export default UserRow
