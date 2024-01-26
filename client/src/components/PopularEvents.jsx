/* eslint-disable react/prop-types */
import  { useCallback, useEffect, useState } from 'react'
import AOS from 'aos';
import EventRow from './EventRow';


// eslint-disable-next-line no-unused-vars
const PopularEvents = ({userData}) => {
    const [eventList, setEventList] = useState([])
    const [isFetching, setIsFetching] = useState(false);
    const [hasMoreEvents, setHasMoreEvents] = useState(true);
 
     const fetchEvents= async (limit, offset) => {
       const server = import.meta.env.VITE_URL;
   
       setIsFetching(true);
       try {
         const response = await fetch(`${server}/most-popular-events?limit=${limit}&offset=${offset}`);
         if (!response.ok) {
           throw new Error(`HTTP error! Status: ${response.status}`);
         }
         const data = await response.json();
         console.log(data)
         setEventList(prevEvents => [...prevEvents, ...data]);
   
         setHasMoreEvents(data.length === limit);
       } catch (error) {
         console.error('Error fetching events:', error);
       } finally {
         setIsFetching(false);
       }
     };
   console.log(eventList)
     useEffect(() => {
       fetchEvents(10, 0);
     }, []);
   
   
 
     useEffect(() => {
       AOS.init({ duration: 1000, once: true });
       
       
 
     }, []); 
     const loadMoreOnScroll = useCallback(() => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && hasMoreEvents && !isFetching) {
          fetchEvents(6, eventList.length);
        }
      }, [eventList.length, hasMoreEvents, isFetching]);
    
      useEffect(() => {
        window.addEventListener('scroll', loadMoreOnScroll);
        return () => window.removeEventListener('scroll', loadMoreOnScroll);
      }, [loadMoreOnScroll]);
  return (
    <>
  
       
            <div className='ml-4 mr-4'>
                <div className='grid md:grid-cols-2 lg:grid-cols-1  xl:grid-cols-2 2xl:grid-cols-3 overflow-x-hidden'>
                 {eventList? (eventList.map(event=>{
                    return <EventRow  key={event.id} event={event}/>
                  })
                  ):<small>no events</small>
                 }
                </div>
            </div>
    
    
 
    </>
  )
}

export default PopularEvents