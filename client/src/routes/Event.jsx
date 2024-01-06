import React from 'react'
import Sidebar from '../components/Sidebar'
import { useOutletContext } from 'react-router-dom'

const Event = () => {
    const [userData, setUserData] = useOutletContext() 
  return (
    <>
   <div className='flex flex-row'>
    <Sidebar userData={userData} setUserData={setUserData}  /> 
    <div className=' lg:ml-80 z-5 lg:z-10 h-full w-full lg:w-bg bg-primary sm:bg-base-200'>
     <div className='w-full h-1/5 lg:h-1/4 flex flex-row align-baseline bg-base-200'>
    <div className=' -mt-12 lg:-mt-5'>
       
        
    </div>
    
     </div>
  
     
    </div>
    </div>
    </>
  )
}

export default Event


// 
// similar to a profile  has decription 
//  if admin id have option to delete event 
//if not admin the button will work as a leave event (delete req member tbl)--> delete from member table
// tabs will be empty unless joined with a join button
//  join join button by posting to members in top
// when joined other tabs are available 
// posts / members / group chat window
// 
// 
// 
// 
// 
// 
