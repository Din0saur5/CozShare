import React from 'react'
import { useOutletContext } from 'react-router-dom'

const Dashboard = () => {
   const [userData, setUserData] = useOutletContext()
    console.log(userData)
  return (
    <div>
      hello world 
    </div>
  )
}

export default Dashboard
