import React from 'react'
import Sidebar from '../components/Sidebar'
import { useOutletContext } from 'react-router-dom'

const AccountSettings = () => {
    const [userData, setUserData] = useOutletContext() 
  return (
    <>
    <div className='fixed z-0 h-full w-full bg-primary'>

    </div>
      <Sidebar userData={userData} setUserData={setUserData}  /> 
      </>
  )
}

export default AccountSettings