/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import UserRow from './UserRow'
import AOS from 'aos';
const FollowersTable = ({userData, setUserData, viewedProfile}) => {
 
  const [followersList, setFollowersList] = useState([])
 
  useEffect(()=>{
    const server = import.meta.env.VITE_URL;
    const config = {
        credentials: 'include',
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }};
  fetch(`${server}/followers/${viewedProfile}`,config)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      setFollowersList(data);
      //console.log(data)
    })
    .catch(error => {
      console.error("Fetching data failed", error);
      // Handle the error state appropriately
      // e.g., set an error message state variable to display an error message
    })
  },[viewedProfile, userData])

 
  useEffect(()=>{  
    AOS.init({
        once: true, // whether animation should happen only once - while scrolling down
        useClassNames: true, // if true, will add content of `data-aos` as classes on scroll
        initClassName: false, // disable initialization classes
        animatedClassName: 'animated', // class applied on animation
        disable: 'mobile'
      });
    },[])
  return (
    <div style={{height:"100%"}} className="overflow-x-auto overflow-y-hidden ">
  
   
    <div style={{textShadow: "0 0 15px #e3d2de , 0 0 15px #e3d2de "}} className=" divider divider-secondary">followers {followersList.length}</div>
    <div className='grid md:grid-cols-2 lg:grid-cols-1  xl:grid-cols-2 2xl:grid-cols-3 overflow-x-hidden'>
    {followersList? (followersList.map(user=>{
        return <UserRow  key={user.id} user={user} currentUser={userData} setList={setFollowersList} list={followersList} table={'followers'} setCurrentUserData={setUserData} viewedProfile={viewedProfile}/>
    })
      ):<small>no followers</small>
}
    </div>
</div>
  )
}

export default FollowersTable
