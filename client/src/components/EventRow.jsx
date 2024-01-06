/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom'

const EventRow = ({event}) => {

    function formatDate(dateString) {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
        const date = new Date(dateString);
        
        const dayOfWeek = daysOfWeek[date.getDay()];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
    
        return `${dayOfWeek} the ${day}${getOrdinalIndicator(day)} of ${month}, ${year}`;
    }
    
    function getOrdinalIndicator(day) {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1:  return "st";
            case 2:  return "nd";
            case 3:  return "rd";
            default: return "th";
        }
    }

  return (
    <>
    <div data-aos="fade-up" data-aos-delay="100"  className="card mt-2 w-96 bg-base-100 shadow-xl">
  <div className="card-body flex">
  <Link to={`/event/${event.id}`}> 
  <div className="avatar hover:bg-transparent ">
                <div className="w-8 mask mask-hexagon hover:bg-transparent">
                    <img src={event.profile_pic} />
                </div>
    </div>
  <h2 className="card-title">{event.display_name}</h2></Link>
    <p className='card-body p-0' >{formatDate(event.eventTime)}</p> 
    
  </div>
</div>
      
    </>
  )
}

export default EventRow
