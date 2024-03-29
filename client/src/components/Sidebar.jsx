/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { FaPaintBrush } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './Searchbar';
import { VscFeedback } from "react-icons/vsc";
import { themeChange } from 'theme-change';

const Sidebar = ({userData, setUserData }) => {
    console.log("side bar line 11: ", userData)
    const navigate = useNavigate()
    const [drawerOpen, setDrawerOpen] = useState(false)
    const server = import.meta.env.VITE_URL


    function logout() {
        
        fetch(`${server}/logout`, {
            method: "DELETE",
            credentials: 'include' 
        })
        .then(response => {
            if (response.ok) {
                navigate("/")
                setUserData(null)
                
            } else {
                // Handle logout failure (e.g., show error message)
                console.error('Logout failed:', response.status);
            }
        })
        .catch(error => {
            // Handle network error
            console.error('Network error on logout:', error);
        });
    }
        





    const {id, display_name, catchphrase, profile_pic, following, followers } = userData
    const [cpCurrent, setCpCurrent] = useState(catchphrase)
    const [showSubmit, setShowSubmit] = useState(false)
    // eslint-disable-next-line no-unused-vars
    const [errors, setErrors] = useState([])
    const [allFollows, setAllFollows] = useState([])
   // const [followingData, setFollowingData] = useState([])

   useEffect(() => { 
    themeChange(false) 
    // 👆 false parameter is required for react project
  }, [])

    const handleChangeCP = (e) => {
        setCpCurrent(e.target.value)
        setShowSubmit(true)
    }
    
    const handleSubmitCP = (e) => {
        e.preventDefault();
        updateCatchPhrase()
        setShowSubmit(false)

    }
    async function updateCatchPhrase() {
        const updateData = {
          catchphrase: cpCurrent
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
          setErrors([]);
          
        } else {
          const messages = await res.json();
          setErrors(messages.errors);
          console.log(messages)
          setUserData(messages)
          setCpCurrent(messages.catchphrase)
        }
      }
      
    function fetchFollowersAndFollowing() {
       
        const followUrl = `${server}/follows/${id}`; 
    
        fetch(followUrl, { 
                method: "GET",
                credentials: "include" 
            })
        
        .then(response => {
            if (!response.ok) {
                // Handle HTTP errors
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setAllFollows(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Handle error state here, if needed
        })
    }
      
    useEffect(()=>{
        fetchFollowersAndFollowing()
        
    },[])

    const handleImgError = (e) => {
        e.target.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK4AAACUCAMAAAA9M+IXAAAAMFBMVEXk5ueutLfr7O3n6eqrsbTc3+Cxt7rh4+TV2NqnrrHIzM7Lz9G4vcC/xMbDyMrO0tNHfP24AAAEMUlEQVR4nO2cW5LjIAwAbcTTBnP/2y5+JOvMOAkgLNha+mfy2aWSBQIxw9DpdDqdTqfT6XQ6nU4HATAGSuiAGMLP2jofARDeyXGHj9J5Ba0ag9DLaPh4hhs56aFBY6Zmy19dD2Nu5+aE2SSvXA/hcW4pi2HQl4H9i5HtpAQo91l2C/Gi2vBl+n0enH2taMJ3ipHdUljXVg0skbYBM9eOLyTYhgBX9k2zXX2r2sbm7ROj68UXdKptiG+1+gAqWXatZ9Xqr00PbvB1dWTTE/fwrZO+OamwU0OXZaXCFl5H7wvCZEdX0lcHsNm2YXdGbqvzbdfwUvsmrr6vmIk4G4T8LvUpvMS6GcvvS3hpswGyq9iBY6S+SFvipQJRdHdIGyGGqgsblLWB4erCSLwQA9Z23fbS6Qq0LuXChluBD126XS94vO5IqDvhbQl7itTThUtdT2Xbdf8BXcLcRduS6s4FdCnrLj4ZCOvuUGJVI2ze8w9wnljC9oehbbmlsx0Y4kzk0F0o97sz+lsjvaVA92ojaeeObickaeOOXYY58anTv3WKMyhUbeDUZ2S5FxOHLvXtMKCOICm79sPXIYJLfby7gribIA/uOn2T62voduYnVNSQyG847RLxIPdwhJPfoxy+WUtbtZEGGHLSgXKj+8M3Y2PGK1SFp29y01bTNpDaE1eezQKfkg+VRhnOJGwlTQNzeqAjrwQ5Za/+HlA2JiHMUvcrOzF/mYfdBiDrJ8IDUG78JMzl0sz47gow7d5GmI+uodDuwCCcuchhbswkmgrtAwbaSRnSlO/Zuv6VIbAtum4AG7RfnN1wbvF6aGlG/gIIwVQioNT2u3Hgldo6l+wR1X6eQiLIR96OISGWyesQ6qEZ8ZCc2q+aoQgcmqfFIWC4DNqzVlClRzsBDMRst2rwbVHjUtpFQ7Uvb00Ab7lJ2fAaIyehKlThsCrM7uf7qRg4D0EmHpBmEFLg67bmrfFoF0GWFQBiyVZ9KluaNgiUthk58Bsj59ubCwB//Yguh7CtVHfWNgCdn7HXTDeWCRHV5STBR3+PcPjAPnYM2cL2jr175CO6HN/Rla5qkd1urnDhqxXwd4X2IVzwJSawAmNu33yLvVwKiXBvaHffQtMucNs39oMiLzFB31K+rihw3VZi9jXeFztCUmQEKx6DG/HOeUyJ88XElzQTdhD5i7tVz/XNrw8U9fa3b2b9ZRH/xuAWsta3ArNieWQN8EGBtxG5vjmfW61UWEm/Ikq63isMt6kdJ1S0TZ8nKfDCC4VMi22972wnbbEo8dIAR9KkWY3V95WkVyC028ZL3YS1AvN+vRQJM6j42Wc8fImtvbjp0VJEz8zi36mWIHo6TrUQ3OiXxBVanitiXxKXeN5VgsiVAmpuHU/ETho1UHU34po20YhuZI8pJG+C2CM+1gitzBT8N/wBcX44zAWEsQEAAAAASUVORK5CYII='; // Set the fallback image URL
     
    };


  return (
    <>
    <div className="drawer lg:drawer-open relative z-10 w-20 -ml-20 lg:ml-0 ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        
        <div className="drawer-side ">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay "></label> 
            <ul className="menu p-4 w-80 min-h-full bg-base-200 ">
            <label className="cursor-pointer grid justify-center place-items-center max-sm:hidden">
                <input type="checkbox"  data-toggle-theme="coffee,emerald" data-act-class="ACTIVECLASS"  className="toggle theme-controller bg-amber-300 border-sky-400 [--tglbg:theme(colors.sky.500)] checked:bg-blue-300 checked:border-blue-800 checked:[--tglbg:theme(colors.blue.900)] row-start-1 col-start-1 col-span-2"/>
                <svg className="col-start-1 row-start-1 stroke-currentcolor fill-currentcolor" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
                <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </label>
            <div className="avatar mx-auto py-5 lg:py-10">
        <div className="w-16 lg:w-24 mask mask-hexagon">
            <img src={profile_pic} onError={handleImgError}/>
        </div>
        </div>

        <div className='flex text-xl  font-semibold pb-2 justify-left align-center'>{display_name}</div>
        <div className='flex rounded-xl mb-6 justify-center  '>
            <form onSubmit={(e)=>{handleSubmitCP(e)}}>
                <textarea className=" rounded-xl textarea textarea-ghost" value={cpCurrent} onChange={(e)=>handleChangeCP(e)} placeholder='set your catchphrase'></textarea>
                <button type='submit' className={`${showSubmit? 'visible': 'hidden'} border p-1 rounded ml-2 border-secondary` }><FaPaintBrush /></button>
            </form>
        </div>
            {/* Sidebar content here */}
            <SearchBar follows = {allFollows}/>
            <li className=' hidden lg:block text-primary hover:bg-primary hover:text-secondary rounded-2xl'><Link to='/dashboard'>Feed</Link></li>
            <li className=' visible lg:hidden text-primary hover:bg-primary hover:text-secondary rounded-2xl'><Link to='/events'>Events</Link></li>
            <li className='hidden lg:block text-primary hover:bg-primary hover:text-secondary rounded-2xl'><Link to='/profile'>Your Profile</Link></li>      
            <li className='text-primary hover:bg-primary hover:text-secondary rounded-2xl'><Link to='/followers'>Inspiring:  {followers? followers.length:'0'}</Link></li>
            <li className='text-primary hover:bg-primary hover:text-secondary rounded-2xl'><Link to='/following'>Inspired by:  {following? following.length:'0'}</Link></li>
            <div className="divider"></div>
            <li className='text-primary hover:bg-primary hover:text-secondary rounded-2xl'><Link to='/settings'>Settings</Link></li>
            <li className='text-primary hover:bg-primary hover:text-secondary rounded-2xl'><div onClick={()=>{logout()}} >Log-out</div></li>
            </ul>
        </div>
            
    </div>
    
    <div style={{zIndex:'11'}}  className="btm-nav lg:hidden">
    
   
  

  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}
<label onClick={()=>setDrawerOpen(!drawerOpen)} htmlFor="my-drawer-2" className={`${drawerOpen? 'rotate-forward': 'rotate-back'} drawer-button lg:hidden`}>
{ drawerOpen ? (
<svg className=" text-primary fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/></svg>
):(
<svg className="text-primary fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg>
)
}
</label>
        
        </div> 

  <button onClick={()=>{navigate('/profile')}} className="text-primary">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
  </button>
  <button onClick={()=>{navigate('/dashboard')}} className="text-primary">
  <VscFeedback className='w-5 h-5' />
  </button>
    </div>

    </>
  )
}

export default Sidebar
