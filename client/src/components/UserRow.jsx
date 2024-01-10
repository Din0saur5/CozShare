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
    const handleImgError = (e) => {
        e.target.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK4AAACUCAMAAAA9M+IXAAAAMFBMVEXk5ueutLfr7O3n6eqrsbTc3+Cxt7rh4+TV2NqnrrHIzM7Lz9G4vcC/xMbDyMrO0tNHfP24AAAEMUlEQVR4nO2cW5LjIAwAbcTTBnP/2y5+JOvMOAkgLNha+mfy2aWSBQIxw9DpdDqdTqfT6XQ6nU4HATAGSuiAGMLP2jofARDeyXGHj9J5Ba0ag9DLaPh4hhs56aFBY6Zmy19dD2Nu5+aE2SSvXA/hcW4pi2HQl4H9i5HtpAQo91l2C/Gi2vBl+n0enH2taMJ3ipHdUljXVg0skbYBM9eOLyTYhgBX9k2zXX2r2sbm7ROj68UXdKptiG+1+gAqWXatZ9Xqr00PbvB1dWTTE/fwrZO+OamwU0OXZaXCFl5H7wvCZEdX0lcHsNm2YXdGbqvzbdfwUvsmrr6vmIk4G4T8LvUpvMS6GcvvS3hpswGyq9iBY6S+SFvipQJRdHdIGyGGqgsblLWB4erCSLwQA9Z23fbS6Qq0LuXChluBD126XS94vO5IqDvhbQl7itTThUtdT2Xbdf8BXcLcRduS6s4FdCnrLj4ZCOvuUGJVI2ze8w9wnljC9oehbbmlsx0Y4kzk0F0o97sz+lsjvaVA92ojaeeObickaeOOXYY58anTv3WKMyhUbeDUZ2S5FxOHLvXtMKCOICm79sPXIYJLfby7gribIA/uOn2T62voduYnVNSQyG847RLxIPdwhJPfoxy+WUtbtZEGGHLSgXKj+8M3Y2PGK1SFp29y01bTNpDaE1eezQKfkg+VRhnOJGwlTQNzeqAjrwQ5Za/+HlA2JiHMUvcrOzF/mYfdBiDrJ8IDUG78JMzl0sz47gow7d5GmI+uodDuwCCcuchhbswkmgrtAwbaSRnSlO/Zuv6VIbAtum4AG7RfnN1wbvF6aGlG/gIIwVQioNT2u3Hgldo6l+wR1X6eQiLIR96OISGWyesQ6qEZ8ZCc2q+aoQgcmqfFIWC4DNqzVlClRzsBDMRst2rwbVHjUtpFQ7Uvb00Ab7lJ2fAaIyehKlThsCrM7uf7qRg4D0EmHpBmEFLg67bmrfFoF0GWFQBiyVZ9KluaNgiUthk58Bsj59ubCwB//Yguh7CtVHfWNgCdn7HXTDeWCRHV5STBR3+PcPjAPnYM2cL2jr175CO6HN/Rla5qkd1urnDhqxXwd4X2IVzwJSawAmNu33yLvVwKiXBvaHffQtMucNs39oMiLzFB31K+rihw3VZi9jXeFztCUmQEKx6DG/HOeUyJ88XElzQTdhD5i7tVz/XNrw8U9fa3b2b9ZRH/xuAWsta3ArNieWQN8EGBtxG5vjmfW61UWEm/Ikq63isMt6kdJ1S0TZ8nKfDCC4VMi22972wnbbEo8dIAR9KkWY3V95WkVyC028ZL3YS1AvN+vRQJM6j42Wc8fImtvbjp0VJEz8zi36mWIHo6TrUQ3OiXxBVanitiXxKXeN5VgsiVAmpuHU/ETho1UHU34po20YhuZI8pJG+C2CM+1gitzBT8N/wBcX44zAWEsQEAAAAASUVORK5CYII='; // Set the fallback image URL
     
    };
    

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
    <div data-aos="fade-up" data-aos-delay="100"  className="card mt-2 sm:w-96 bg-base-100 shadow-xl">
  <div className="card-body flex">
  <Link to={followStatus === 'currentUser'? '/profile': `/profile/${userData.id}`}> 
  <div className="avatar hover:bg-transparent ">
                <div className="w-8 mask mask-hexagon hover:bg-transparent">
                    <img src={userData.profile_pic} onError={handleImgError} />
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
