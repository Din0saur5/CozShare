import React from 'react'
import { useOutletContext } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
   const [userData, setUserData] = useOutletContext()
    console.log(userData)
  return (
    <>
    <div className='fixed z-0 h-full w-full bg-primary'></div>
      <Sidebar userData={userData} setUserData={setUserData}  />
      </>
  )
}

export default Dashboard
