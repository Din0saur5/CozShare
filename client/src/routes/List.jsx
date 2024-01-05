import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useOutletContext } from 'react-router-dom'
import FollowingTable from '../components/FollowingTable'
import FollowersTable from '../components/FollowersTable'
import EventCreateForm from '../components/EventCreateForm'

const List = ({type}) => {
    const [userData, setUserData] = useOutletContext() 
    const [userDataO, setUserDataO] = useState(userData)
const listType = () => {
  
  switch(type){
    case'following':
      return  <FollowingTable userData={userDataO} setUserData={setUserDataO} viewedProfile={userDataO.id} />

    case'followers':
      return <FollowersTable userData={userDataO} setUserData={setUserDataO} viewedProfile={userDataO.id} />

    case 'events':
      return (
      <div className='flex flex-row-reverse mr-2 mt-2'>
        <EventCreateForm userData={userData} setUserData={setUserData}/>
      </div>) 
  }
}


  return (
    <>
   <div className='flex flex-row bg-third sm:bg-primary'>
    <Sidebar userData={userDataO} setUserData={setUserDataO}  /> 
    <div className=' lg:ml-80 mt-16 min-h-screen h-full w-full lg:w-bg bg-third sm:bg-base-200'>
    <div className='ml-4 mr-4'>
    
    {listType()}
    </div>


     
    
   
      
     </div>
     </div>
     </>
  )
}

export default List