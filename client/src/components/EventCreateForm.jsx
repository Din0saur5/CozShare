/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import  { useState } from 'react'

import Datepicker from "tailwind-datepicker-react"
import { createPost } from './CreatePost'
import Toast from './Toast'
const EventCreateForm = ({userData, SetUserData, list, setEventList}) => {
    console.log(userData)
    const server = import.meta.env.VITE_URL

    const [profile_pic, setProfile_pic] = useState('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK4AAACUCAMAAAA9M+IXAAAAMFBMVEXk5ueutLfr7O3n6eqrsbTc3+Cxt7rh4+TV2NqnrrHIzM7Lz9G4vcC/xMbDyMrO0tNHfP24AAAEMUlEQVR4nO2cW5LjIAwAbcTTBnP/2y5+JOvMOAkgLNha+mfy2aWSBQIxw9DpdDqdTqfT6XQ6nU4HATAGSuiAGMLP2jofARDeyXGHj9J5Ba0ag9DLaPh4hhs56aFBY6Zmy19dD2Nu5+aE2SSvXA/hcW4pi2HQl4H9i5HtpAQo91l2C/Gi2vBl+n0enH2taMJ3ipHdUljXVg0skbYBM9eOLyTYhgBX9k2zXX2r2sbm7ROj68UXdKptiG+1+gAqWXatZ9Xqr00PbvB1dWTTE/fwrZO+OamwU0OXZaXCFl5H7wvCZEdX0lcHsNm2YXdGbqvzbdfwUvsmrr6vmIk4G4T8LvUpvMS6GcvvS3hpswGyq9iBY6S+SFvipQJRdHdIGyGGqgsblLWB4erCSLwQA9Z23fbS6Qq0LuXChluBD126XS94vO5IqDvhbQl7itTThUtdT2Xbdf8BXcLcRduS6s4FdCnrLj4ZCOvuUGJVI2ze8w9wnljC9oehbbmlsx0Y4kzk0F0o97sz+lsjvaVA92ojaeeObickaeOOXYY58anTv3WKMyhUbeDUZ2S5FxOHLvXtMKCOICm79sPXIYJLfby7gribIA/uOn2T62voduYnVNSQyG847RLxIPdwhJPfoxy+WUtbtZEGGHLSgXKj+8M3Y2PGK1SFp29y01bTNpDaE1eezQKfkg+VRhnOJGwlTQNzeqAjrwQ5Za/+HlA2JiHMUvcrOzF/mYfdBiDrJ8IDUG78JMzl0sz47gow7d5GmI+uodDuwCCcuchhbswkmgrtAwbaSRnSlO/Zuv6VIbAtum4AG7RfnN1wbvF6aGlG/gIIwVQioNT2u3Hgldo6l+wR1X6eQiLIR96OISGWyesQ6qEZ8ZCc2q+aoQgcmqfFIWC4DNqzVlClRzsBDMRst2rwbVHjUtpFQ7Uvb00Ab7lJ2fAaIyehKlThsCrM7uf7qRg4D0EmHpBmEFLg67bmrfFoF0GWFQBiyVZ9KluaNgiUthk58Bsj59ubCwB//Yguh7CtVHfWNgCdn7HXTDeWCRHV5STBR3+PcPjAPnYM2cL2jr175CO6HN/Rla5qkd1urnDhqxXwd4X2IVzwJSawAmNu33yLvVwKiXBvaHffQtMucNs39oMiLzFB31K+rihw3VZi9jXeFztCUmQEKx6DG/HOeUyJ88XElzQTdhD5i7tVz/XNrw8U9fa3b2b9ZRH/xuAWsta3ArNieWQN8EGBtxG5vjmfW61UWEm/Ikq63isMt6kdJ1S0TZ8nKfDCC4VMi22972wnbbEo8dIAR9KkWY3V95WkVyC028ZL3YS1AvN+vRQJM6j42Wc8fImtvbjp0VJEz8zi36mWIHo6TrUQ3OiXxBVanitiXxKXeN5VgsiVAmpuHU/ETho1UHU34po20YhuZI8pJG+C2CM+1gitzBT8N/wBcX44zAWEsQEAAAAASUVORK5CYII=')
    const [loading, setLoading] = useState(false)
    const [toastVisible,setToastVisible] = useState(false)
    const [nameAndDesc, setNameAndDesc] = useState({
        display_name:'',
        description: '',
    })
    const [show, setShow] = useState(false)
    const [makePost, setMakePost] = useState(true)
	const [selectedDate, setSelectedDate] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [location, setLocation] = useState('')
	const handleDateChange = (selectedDate) => {
		setSelectedDate(selectedDate)
		console.log(selectedDate.toISOString())
	}
    

	const handleClose = (state) => {
		setShow(state)
	}

    const handleLocationChange = (e) =>{
        setLocation(e.target.value)
    }

  const handleChangeProPic = (e) =>{
    setProfile_pic(e.target.value)
  }

  const handleImgError = (e) => {
    e.target.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK4AAACUCAMAAAA9M+IXAAAAMFBMVEXk5ueutLfr7O3n6eqrsbTc3+Cxt7rh4+TV2NqnrrHIzM7Lz9G4vcC/xMbDyMrO0tNHfP24AAAEMUlEQVR4nO2cW5LjIAwAbcTTBnP/2y5+JOvMOAkgLNha+mfy2aWSBQIxw9DpdDqdTqfT6XQ6nU4HATAGSuiAGMLP2jofARDeyXGHj9J5Ba0ag9DLaPh4hhs56aFBY6Zmy19dD2Nu5+aE2SSvXA/hcW4pi2HQl4H9i5HtpAQo91l2C/Gi2vBl+n0enH2taMJ3ipHdUljXVg0skbYBM9eOLyTYhgBX9k2zXX2r2sbm7ROj68UXdKptiG+1+gAqWXatZ9Xqr00PbvB1dWTTE/fwrZO+OamwU0OXZaXCFl5H7wvCZEdX0lcHsNm2YXdGbqvzbdfwUvsmrr6vmIk4G4T8LvUpvMS6GcvvS3hpswGyq9iBY6S+SFvipQJRdHdIGyGGqgsblLWB4erCSLwQA9Z23fbS6Qq0LuXChluBD126XS94vO5IqDvhbQl7itTThUtdT2Xbdf8BXcLcRduS6s4FdCnrLj4ZCOvuUGJVI2ze8w9wnljC9oehbbmlsx0Y4kzk0F0o97sz+lsjvaVA92ojaeeObickaeOOXYY58anTv3WKMyhUbeDUZ2S5FxOHLvXtMKCOICm79sPXIYJLfby7gribIA/uOn2T62voduYnVNSQyG847RLxIPdwhJPfoxy+WUtbtZEGGHLSgXKj+8M3Y2PGK1SFp29y01bTNpDaE1eezQKfkg+VRhnOJGwlTQNzeqAjrwQ5Za/+HlA2JiHMUvcrOzF/mYfdBiDrJ8IDUG78JMzl0sz47gow7d5GmI+uodDuwCCcuchhbswkmgrtAwbaSRnSlO/Zuv6VIbAtum4AG7RfnN1wbvF6aGlG/gIIwVQioNT2u3Hgldo6l+wR1X6eQiLIR96OISGWyesQ6qEZ8ZCc2q+aoQgcmqfFIWC4DNqzVlClRzsBDMRst2rwbVHjUtpFQ7Uvb00Ab7lJ2fAaIyehKlThsCrM7uf7qRg4D0EmHpBmEFLg67bmrfFoF0GWFQBiyVZ9KluaNgiUthk58Bsj59ubCwB//Yguh7CtVHfWNgCdn7HXTDeWCRHV5STBR3+PcPjAPnYM2cL2jr175CO6HN/Rla5qkd1urnDhqxXwd4X2IVzwJSawAmNu33yLvVwKiXBvaHffQtMucNs39oMiLzFB31K+rihw3VZi9jXeFztCUmQEKx6DG/HOeUyJ88XElzQTdhD5i7tVz/XNrw8U9fa3b2b9ZRH/xuAWsta3ArNieWQN8EGBtxG5vjmfW61UWEm/Ikq63isMt6kdJ1S0TZ8nKfDCC4VMi22972wnbbEo8dIAR9KkWY3V95WkVyC028ZL3YS1AvN+vRQJM6j42Wc8fImtvbjp0VJEz8zi36mWIHo6TrUQ3OiXxBVanitiXxKXeN5VgsiVAmpuHU/ETho1UHU34po20YhuZI8pJG+C2CM+1gitzBT8N/wBcX44zAWEsQEAAAAASUVORK5CYII='; // Set the fallback image URL
 
};

  const handleNameandDescChange = (e) =>{
    const{name, value} = e.target
    setNameAndDesc({...nameAndDesc, [name]:value})
  }

  const options = {
	title: "Choose Event Date",
	autoHide: true,
	todayBtn: false,
	clearBtn: false,
	clearBtnText: "Clear",
	maxDate: new Date("2030-01-01"),
	minDate: new Date("1950-01-01"),
	theme: {
		background: "dark:bg-third ",
		todayBtn: "",
		clearBtn: "",
		icons: "dark:bg-transparent ",
		text: "dark:text-base-100",
		disabledText: "dark:text-base-300 bg-transparent ",
		input: "dark:text-base-100 dark:bg-third",
		inputIcon: "",
		selected: "dark:bg-accent",
	},
	icons: {
		// () => ReactElement | JSX.Element
		prev: () => <span>Previous</span>,
		next: () => <span>Next</span>,
	},
	datepickerClassNames: "top-12",
	defaultDate: new Date("2024-01-01"),
	language: "en",
	disabledDates: [],
	weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
	inputNameProp: "date",
	inputIdProp: "date",
	inputPlaceholderProp: "Select Date",
	inputDateFormatProp: {
		day: "numeric",
		month: "long",
		year: "numeric"
	}
}

const submitCreateEvent = (e) => {
  e.preventDefault()
  setLoading(true)  
  const url = `${server}/events`;
   let finalPic 
   
  const eventData = {
      admin_id: userData.id,
      eventTime: selectedDate.toISOString(),
      profile_pic: profile_pic,
      location: location,
      display_name: nameAndDesc.display_name,
      description: nameAndDesc.description,
  };

  fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
      setEventList([...list, data])  
      console.log('Event created:', data);
      const membersUrl = `${server}/members`; 
      const membersData = {
          user_id: userData.id,
          event_id: data.id 
      };

      return fetch(membersUrl, {
          method: 'POST',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(membersData)
      });
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
  })
  .then(membersData => {
      console.log('Member added to event:', membersData);
     const greetings =[ 
    `Don't Miss: ${nameAndDesc.display_name} Event!`,
    `Exciting Event Alert: ${nameAndDesc.display_name}!`,
    `Join Us at ${nameAndDesc.display_name}!`,
    `New Event: ${nameAndDesc.display_name}!`,
    `Be There: ${nameAndDesc.display_name}!`,
    `Ready for ${nameAndDesc.display_name}?`,
    `Get Involved: ${nameAndDesc.display_name}!`,
      `Check Out: ${nameAndDesc.display_name}!`,
      `Welcome to ${nameAndDesc.display_name}!`,
      `Discover ${nameAndDesc.display_name}!`,
      `Experience ${nameAndDesc.display_name}!`,
      `Explore ${nameAndDesc.display_name}!`,
      `${nameAndDesc.display_name} Awaits!`,
      `Get Ready for ${nameAndDesc.display_name}!`,
      `Spotlight On: ${nameAndDesc.display_name}!`,
      `New Event Alert: ${nameAndDesc.display_name}!`,
     `Be Part of ${nameAndDesc.display_name}!`
     ]
    const greeting = getRandomElement(greetings)
    if(makePost){
        createPost(membersData.user_id, 2, [profile_pic],greeting,null)
        
    }
    return
    
  })
  .then(()=>{
        setLoading(false)
        setShowModal(false)
        e.target.reset()
        setProfile_pic('')
        setNameAndDesc({
            display_name:'',
            description: '',
        })
        setMakePost(true)
        setLocation('')
        setSelectedDate(null)
        setToastVisible(true)
  })
  .catch(error => {
      console.error('Error:', error);
  });
}


function getRandomElement(arr) {
    if (arr && arr.length) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }
    return null; 
}








  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn btn-accent shadow-inner shadow-white" onClick={()=>setShowModal(true)}>Create New Event</button>
        <dialog id="createEvent" className={`modal ${showModal? 'modal-open':''}`}>
        <div className="modal-box">
            <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button onClick={()=>setShowModal(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>

            <h3 className="font-bold text-lg">Create Event!</h3>
            <div className="divider divider-primary"></div> 

            <form onSubmit={(e)=>{submitCreateEvent(e)}} className='grid gap-y-5 '>
                
                <div> {/* add profile picture */}
                    <div className="label">
                        <span className="block mb-2 text-sm font-medium  ">Event Profile Picture</span>
                    </div>
                    <div className='flex flex row'>
                        <div className="avatar mx-auto py-0">
                            <div className="w-8  mask mask-hexagon">
                                <img src={profile_pic}  onError={handleImgError}/>
                            </div>
                        </div>
                        <input name='profile_pic' value={profile_pic} type="text" placeholder="enter valid URL" onChange={handleChangeProPic} className="input input-bordered w-full max-w-xs" />
                        
                    </div>
                </div>
                <div> {/* Event title */}
                    <div>
                        <label htmlFor="title" className="block mb-2 text-sm font-medium  "> Event Name</label>
                        <input onChange={handleNameandDescChange} type="text" name="display_name" id="name" className="input input-bordered w-full max-w-xs" placeholder="..." required />
                    </div>
                </div>
                <div> {/* Event Description */}
                    <div>
                        <label htmlFor="description" className="block mb-2 text-sm font-medium  ">Event Description</label>
                        <textarea onChange={handleNameandDescChange} name="description"  className="textarea textarea-bordered w-full max-w-xs" placeholder="..." required />
                    </div>
                </div>
                <div> {/* Event Date */}
                <label htmlFor="date" className="block mb-2 text-sm font-medium  ">Event Date</label>
                <Datepicker options={options} onChange={handleDateChange} show={show} setShow={handleClose} />
                </div> 
                <div> {/* Event Location */}
                    <label htmlFor="location" className="block mb-2 text-sm font-medium  ">Event Location</label>
                    <div className="relative">
                        <div className={`absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none ${location.length > 0 ? 'hidden':''}`}>
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                            </svg>
                        </div>
                        <input type="text" onChange={handleLocationChange} value={location} className="input input-bordered w-full max-w-xs" placeholder="&emsp;City, State" required/>
                    </div>
                </div>
                <div>
                <input type="checkbox" onChange={()=>{setMakePost(!makePost)}} checked={makePost? "checked":""} className="checkbox checkbox-xs " /> 
                <small > Generate event creation post?</small>
                </div>
                <button type='submit' className='btn btn-accent'>{loading? <span className="loading loading-infinity loading-lg"></span>:"Create Event"}</button>
                <small className=''>* event data cannot be altered after creation</small>
            </form>
            
            
        </div>
        </dialog>
        <Toast message={'New event successfully created!'} isVisible={toastVisible} onClose={()=>setToastVisible(false)} />
    </div>
  )
}

export default EventCreateForm

// needed from user for event creaion
// profile_pic url
// location
// display_name
// description
//eventTime
// admin_id

//needed from back end/context
// admin_id
 
//add a member post request for the admin 

//join group and un join group are post and delete to members list

// create post button on event page if user is a member of the page 
//and that post will also populate into their posts 

//when sending the datetime to db:
// const date = new Date(); // Assuming this is your Date object
// const isoDateString = date.toISOString();

//when recieving the date time:
// const isoDateStringFromDb = '2023-12-13T05:00:00.000Z'; // Fetched from the database
// const dateFromDb = new Date(isoDateStringFromDb);