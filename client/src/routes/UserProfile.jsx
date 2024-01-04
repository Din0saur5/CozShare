import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useOutletContext, useParams } from 'react-router-dom'
import { FaPaintBrush } from "react-icons/fa";
import ProfileLayout from '../components/ProfileLayout';
const UserProfile = () => {
    const [userData, setUserData] = useOutletContext() 
    let { id } = useParams(); 
    const server = import.meta.env.VITE_URL
    const [viewUserData, setViewUserData] = useState({})
  useEffect(()=>{
    const config = {
      credentials: 'include',
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }}
    fetch(`${server}/users/${id}`, config)
      .then(res=>res.json())
      .then(data=>{
        setViewUserData(data)
      })
  },[]) 



   
    const { display_name, catchphrase, profile_pic, following, followers, bio } = viewUserData
    const [bioCurrent, setBioCurrent] = useState(bio)
    const [showSubmitBio, setShowSubmitBio] = useState(false)
    const [errors, setErrors] = useState([]) 
    const [activeTab, setActiveTab] = useState('posts');

  

  return (
    <>
    <div className='flex flex-row bg-primary'>
    <Sidebar userData={userData} setUserData={setUserData}  /> 
    <div className=' lg:ml-80 z-5 lg:z-10 h-full w-full lg:w-bg bg-third sm:bg-base-200'>
     <div className='w-full h-1/5 lg:h-1/4 flex flex-row align-baseline bg-base-200'>
    <div className=' -mt-12 lg:-mt-5'>
        <div className="chat lg:ml-8 pl-2 chat-start">
            <div className="chat-bubble w-52 sm:w-auto text-xs sm:text-sm ml-28 mt-12 -mb-4 text-black bg-accent ">{catchphrase} </div>
        </div>
        <div className="avatar ml-12 ">
            <div className=" w-16 lg:w-24 mask mask-hexagon">
                <img src={profile_pic} />
            </div>
        </div>
        <div className='text-xl bold mb-2 ml-16 lg:ml-20' >{display_name}</div>
    </div>
    <div className="font-medium flex align-center flex-col mt-12 justify-center ">
        
        <form >
            <div className="label">
                <span className="label-text">Your bio:</span>
            </div>
            <textarea className=" peer focus:right-1/4 focus:absolute focus:z-10 sm:focus:static  w-54 -ml-52 sm:ml-auto sm:w-96 rounded-xl textarea textarea-ghost" value={bioCurrent}  placeholder='set your catchphrase'></textarea>
            <button type='submit' className={`${showSubmitBio? 'visible': 'hidden'} peer-focus:right-1/4 peer-focus:z-10 peer-focus:absolute border p-1 rounded ml-2 border-secondary` }><FaPaintBrush /></button>
        </form>
    </div>
     </div>
     <div className="flex flex-col invisible sm:visible">
        
            
        
      <div className="relative right-0 flex flex-row-reverse space-x-2 rounded-t-xl w-full ">
        {[ 'Inspiring', 'Inspired by', 'events', 'posts'].map((tab) => (
            <label
            key={tab}
            className={`tab border border-third flex-initial bg-base-100 ml-2 mr-4  rounded-t-xl text-center px-4 cursor-pointer hover:underline ${activeTab === tab ? 'bg-third text-base-100' : ''}`} >
            <input
              type="radio"
              name="tabs"
              value={tab}
              checked={activeTab === tab}
              onChange={() => setActiveTab(tab)}
              className="sr-only " // Tailwind class for screen reader only
              />
            {tab}
          </label>
        ))}
      
    
      </div>
      <div className="relative rounded-tl-lg bg-third p-4 mx-4 h-full min-h-screen border border-third rounded-b-lg">
            <ProfileLayout activeTab={activeTab} userData={userData} setUserData={setUserData}/>
        </div>
      </div>
  
     
    </div>
    </div>
      </>
  )
}

export default UserProfile
