/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import UserRow from './UserRow'
import AOS from 'aos';
const FollowersTable = ({userData, setUserData}) => {
    const [followerList, setFollowerList] = useState(userData.followers)
    AOS.init({
        once: true, // whether animation should happen only once - while scrolling down
        useClassNames: true, // if true, will add content of `data-aos` as classes on scroll
        initClassName: false, // disable initialization classes
        animatedClassName: 'animated', // class applied on animation
      });
  return (
    <div style={{height:"200vh"}} className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
         &nbsp;
        </th>
        
        <th></th>
      </tr>
    </thead>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4'>
    {followerList? (followerList.map(user=>{
        return <UserRow  key={user.id} user={user} currentUser={userData} setCurrentUserData={setUserData}/>
    })
      ):<small>no followers</small>
}
    </div>
   
    
  </table>
</div>
  )
}

export default FollowersTable
