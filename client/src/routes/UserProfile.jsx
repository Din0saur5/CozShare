import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useParams } from 'react-router-dom'

import ProfileLayout from '../components/ProfileLayout';
import { useUserContext } from '../components/UserContext';
const UserProfile = () => {
    // eslint-disable-next-line no-unused-vars
    const {userData, setUserData} = useUserContext() 
    console.log('line 10 userprofile',userData)
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
        console.log("line 24 user profile: ",data)
        setViewUserData(data)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[id]) 



   
    const { display_name, catchphrase, profile_pic, bio } = viewUserData
   
    const [activeTab, setActiveTab] = useState('Posts');
    const [followStatus, setFollowStatus] = useState(false)

    useEffect(()=>{
     
      if(userData.id == viewUserData.id){
          setFollowStatus('currentUser')
      } else if (viewUserData.followers &&  viewUserData.followers.includes(userData.id)){
          
          setFollowStatus(true)
      }
      else{
          
          setFollowStatus(false)
      }
  },[userData, id, viewUserData])
    


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
          setViewUserData(data.target);
          setUserData(data.user);
          return data;
      })
    }


  

  return (
    <>
    <div className='flex flex-row bg-base-200'>
    <Sidebar userData={userData} setUserData={setUserData}  /> 
    <div className=' lg:ml-80 z-5 lg:z-10 h-full w-full lg:w-bg bg-base-200'>
     <div className='w-full h-1/5 lg:h-1/4 flex flex-row align-baseline bg-base-200'>
    <div className=' -mt-10 lg:-mt-5'>
        <div className="chat lg:ml-8 pl-2 chat-start">
            <div className="chat-bubble w-52 sm:w-auto text-xs sm:text-sm ml-28 mt-12 -mb-4 text-black bg-accent ">{catchphrase} </div>
        </div>
        <div className="avatar ml-12 ">
            <div className=" w-16 lg:w-24 mask mask-hexagon">
                <img src={profile_pic} />
            </div>
            <div className="sm:hidden  label">
                <span className="label-text sm:hidden ">Bio:</span>
            </div>
        </div>
        <div className='text-xl bold mb-2 ml-16 lg:ml-20' >{display_name}</div>
    </div>
    <div className="font-medium flex align-center flex-col mt-12 justify-center ">
        
        <div>
            <div className="label hidden sm:block label">
                <span className="label-text">Bio:</span>
            </div>
            <textarea className=" disabled w-54 -ml-52 sm:ml-auto sm:w-96 rounded-xl textarea textarea-ghost line-clamp-2 focus:line-clamp-[10]" value={bio} />
        </div>
    </div>
     </div>
     <div className="flex flex-col">
        
            
        
      <div className="relative right-0 flex flex-row-reverse space-x-2 rounded-t-xl w-full ">
        {[ 'Inspiring', 'Inspired by', 'Events', 'Posts'].map((tab) => (
            <label
            key={tab}
            className={`tab border border-third flex-initial bg-base-200 ml-2 mr-4  rounded-t-xl text-center px-4 cursor-pointer hover:underline ${activeTab === tab ? 'bg-primary text-base-100' : ''}`} >
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
      <div className="relative rounded-tl-lg bg-base-300 p-4 mx-4 h-full min-h-screen border border-third rounded-b-lg">
        {activeTab==='Posts'?
          (
            <>
          
           <button onClick={()=>{handleFollow(id)}} className="btn btn-secondary btn-sm" >{followStatus? 'Unfollow':'Follow' }</button>
           </>
           )
          :(<></>)
        }

            <ProfileLayout activeTab={activeTab} userData={userData} setUserData={setUserData} viewedProfile={id}/>
        </div>
      </div>
  
     
    </div>
    </div>
      </>
  )
}

export default UserProfile
