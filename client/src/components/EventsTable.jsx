/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react'
import AOS from 'aos';
import EventRow from './EventRow';
import EventCreateForm from './EventCreateForm';

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
    fetch(`${server}/eventsByUser/${viewedProfile}`,config)
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
    <div style={{textShadow: "0 0 15px #a991f7 , 0 0 15px #fff "}} className=" divider divider-secondary  ">Joined Events {eventList.length}</div>
    {userData.id === viewedProfile?( 
                <div className='flex flex-row-reverse mr-2 mt-2'>
                    <EventCreateForm userData={userData} setUserData={setUserData} list={eventList} setEventList={setEventList}/>
                </div>
                 ):(<></>)} {/*<div className='mr-2 mt-2 w-full h-12'></div>*/}
    <div className='grid md:grid-cols-2 lg:grid-cols-1  xl:grid-cols-2 2xl:grid-cols-3 overflow-x-hidden'>
    {eventList? (eventList.map(event=>{
        return <EventRow  key={event.id} event={event}/>
    })
      ):<small>no events</small>
}
    </div>
   
    
 
</div>
  )
}

export default EventsTable
