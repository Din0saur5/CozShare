/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useParams } from 'react-router-dom'
import EventLayout from '../components/EventLayout'
import { useUserContext } from '../components/UserContext'

const Event = () => {
   const {userData, setUserData} = useUserContext() 
    let { id } = useParams(); 
    const server = import.meta.env.VITE_URL
    const [viewEvent, setEvent] = useState({})
  
    const [memberList, setMemberList] = useState([{}])
    const [activeTab, setActiveTab] = useState('Posts');

    useEffect(()=>{
      const config = {
        credentials: 'include',
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }}
      fetch(`${server}/events/${id}`, config)
        .then(res=>res.json())
        .then(data=>{
          console.log(data)
          setEvent(data)
        })
    },[id]) 

    useEffect(()=>{
      const config = {
        credentials: 'include',
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }}
      fetch(`${server}/members/${id}`, config)
        .then(res=>res.json())
        .then(data=>{
          console.log(data)
          setMemberList(data)
        })
    },[]) 

    function formatEventDate(dateString) {
      const date = new Date(dateString);
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
      const dayOfWeek = daysOfWeek[date.getDay()];
      const month = date.getMonth() + 1; // getMonth() returns 0-11
      const day = date.getDate();
      const year = date.getFullYear().toString().substr(-2); // Get last two digits of the year
  
      return `Join us ${dayOfWeek} ${month}/${day}/${year}`;
  }


  return (
    <>
   <div className='flex flex-row bg-base-200'>
    <Sidebar userData={userData} setUserData={setUserData}  /> 
    <div className=' lg:ml-80 z-5 lg:z-10 h-full w-full lg:w-bg bg-base-200'>
     <div className='w-full h-1/5 lg:h-1/4 flex flex-row align-baseline bg-base-200'>
    <div className=' -mt-10 lg:-mt-5'>
    <div className="chat lg:ml-8 pl-2 chat-start">
            <div className="chat-bubble w-52 sm:w-auto text-xs sm:text-sm ml-28 mt-12 -mb-4 text-black bg-accent ">{formatEventDate(viewEvent.eventTime)} </div>
        </div>
        <div className="avatar ml-12 ">
            <div className=" w-16 lg:w-24 mask mask-hexagon">
                <img src={viewEvent.profile_pic} />
            </div>
            <div className="sm:hidden  label">
                <span className="label-text sm:hidden ">Bio:</span>
            </div>
        </div>
        <div className='text-xl bold mb-2 ml-16 lg:ml-20' >{viewEvent.display_name}</div>
    </div>
    <div className="font-medium flex align-center flex-col mt-12 justify-center ">
        
        <div>
            <div className="label hidden sm:block label">
                <span className="label-text">Bio:</span>
            </div>
            <textarea className=" disabled w-54 -ml-52 sm:ml-auto sm:w-96 rounded-xl textarea textarea-ghost line-clamp-2 focus:line-clamp-[10]" value={viewEvent.description} />
        </div>
    </div>

  
     
   
    
     </div>
    <div className="relative right-0 flex flex-row-reverse space-x-2 rounded-t-xl w-full ">
        {[ 'Chat', 'Members', 'Posts'].map((tab) => (
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
          <EventLayout activeTab={activeTab} userData={userData} setUserData={setUserData} memberList={memberList} viewedProfile={viewEvent} setMemberList={setMemberList}/> 
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
