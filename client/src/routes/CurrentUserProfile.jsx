import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useOutletContext } from 'react-router-dom'
import { FaPaintBrush } from "react-icons/fa";
import ProfileLayout from '../components/ProfileLayout';
const CurrentUserProfile = () => {
    const [userData, setUserData] = useOutletContext() 
    const server = import.meta.env.VITE_URL
    const {id, display_name, catchphrase, profile_pic, following, followers, bio } = userData
    const [bioCurrent, setBioCurrent] = useState(bio)
    const [showSubmitBio, setShowSubmitBio] = useState(false)
    const [errors, setErrors] = useState([]) 
    const [activeTab, setActiveTab] = useState('posts');

    const handleChangeBio = (e) => {
        setBioCurrent(e.target.value)
        setShowSubmitBio(true)
    }
    
    const handleSubmitBio = (e) => {
        e.preventDefault();
        updateCatchPhrase()
        setShowSubmitBio(false)

    }
    async function updateCatchPhrase() {
        const updateData = {
          bio: bioCurrent
        };
        const config = {
          credentials: 'include',
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        };
        const res = await fetch(`${server}/users/${id}`, config);
        if (res.ok) {
            console.log(userData)
          setErrors([]);
        } else {
          const messages = await res.json();
          setErrors(messages.errors);
          console.log(messages)
        }
      }

    






  return (
    <>
    <div className='flex flex-row'>
    <Sidebar userData={userData} setUserData={setUserData}  /> 
    <div className=' lg:ml-80 z-5 lg:z-10 h-full w-full lg:w-bg bg-primary sm:bg-base-200'>
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
        
        <form onSubmit={(e)=>{handleSubmitBio(e)}}>
            <textarea className=" peer focus:right-1/4 focus:absolute focus:z-10 sm:focus: w-54 -ml-52 sm:ml-auto sm:w-96 rounded-xl textarea textarea-ghost" value={bioCurrent} onChange={(e)=>handleChangeBio(e)} placeholder='set your catchphrase'></textarea>
            <button type='submit' className={`${showSubmitBio? 'visible': 'hidden'} peer-focus:right-1/4 peer-focus:z-10 peer-focus:absolute border p-1 rounded ml-2 border-secondary` }><FaPaintBrush /></button>
        </form>
    </div>
     </div>
     <div className="flex flex-col invisible sm:visible">
        
            
        
      <div className="relative right-0 flex flex-row-reverse space-x-2 rounded-t-xl w-full ">
        {[ 'Inspiring', 'Inspired by', 'events', 'posts'].map((tab) => (
            <label
            key={tab}
            className={`tab border border-primary flex-initial bg-base-100 ml-2 mr-4  rounded-t-xl text-center px-4 cursor-pointer hover:underline ${activeTab === tab ? 'bg-primary text-base-100' : ''}`} >
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
      <div className="relative rounded-tl-lg bg-primary p-4 mx-4 h-full min-h-screen border border-primary rounded-b-lg">
            <ProfileLayout activeTab={activeTab} userData={userData} setUserData={setUserData}/>
        </div>
      </div>
  
     
    </div>
    </div>
      </>
  )
}

export default CurrentUserProfile
