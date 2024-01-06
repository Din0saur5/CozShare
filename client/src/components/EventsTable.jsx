import React, { useEffect, useState } from 'react'
import AOS from 'aos';
import EventRow from './EventRow';

const EventsTable = ({userData, setUserData, viewedProfile}) => {
    const [eventList, setEventList] = useState([])
   
    useEffect(()=>{
      const server = import.meta.env.VITE_URL;
      const config = {
          credentials: 'include',
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }};
    fetch(`${server}/events/${viewedProfile}`,config)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        setEventList(data);
        
      })
      .catch(error => {
        console.error("Fetching data failed", error);
        // Handle the error state appropriately
        // e.g., set an error message state variable to display an error message
      })
    },[viewedProfile, userData])
   
  
    useEffect(()=>{ 
    AOS.init({
        once: true, // whether animation should happen only once - while scrolling down
        useClassNames: true, // if true, will add content of `data-aos` as classes on scroll
        initClassName: false, // disable initialization classes
        animatedClassName: 'animated', // class applied on animation
        disable: "mobile"
      })},[])
  return (
    <div  className="h-full overflow-x-auto ">
  
    {/* head */}
    <div style={{textShadow: "0 0 15px #e3d2de , 0 0 15px #e3d2de "}} className=" divider divider-secondary ">Joined Events {eventList.length}</div>
    <div className='grid md:grid-cols-2 lg:grid-cols-1  xl:grid-cols-2 2xl:grid-cols-3 overflow-x-hidden'>
    {eventList? (eventList.map(event=>{
        return <EventRow  key={event.id} event={event}/>
    })
      ):<small>no followers</small>
}
    </div>
   
    
 
</div>
  )
}

export default EventsTable
