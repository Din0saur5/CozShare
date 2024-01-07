/* eslint-disable react/prop-types */
import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useOutletContext, useParams } from 'react-router-dom'
import FollowingTable from '../components/FollowingTable'
import FollowersTable from '../components/FollowersTable'
import EventsTable from '../components/EventsTable'
import QueryTable from '../components/QueryTable'

const List = ({type}) => {
    const [userData, setUserData] = useOutletContext() 
    const [userDataO, setUserDataO] = useState(userData)
    const [activeTab, setActiveTab] = useState('Users')
    const {query} = useParams()
const listType = () => {
  
  switch(type){
    case'following':
      return  <FollowingTable userData={userDataO} setUserData={setUserDataO} viewedProfile={userDataO.id} />

    case'followers':
      return <FollowersTable userData={userDataO} setUserData={setUserDataO} viewedProfile={userDataO.id} />

    case 'events':
      return (
        <EventsTable userData={userData} setUserData={setUserData} viewedProfile={userDataO.id} /> 
        ) 
    case 'query' :
      return(
        <>
          <h1 className="my-6 ml-10 font-semibold text-xl">Search</h1>
          <div className="relative right-0 flex flex-row-reverse 
          space-x-2 rounded-t-xl w-full ">
              {[ 'Events', 'Users'].map((tab) => (
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
            {console.log(activeTab)}
            <QueryTable query={query} userData={userDataO} setUserData={setUserDataO} tab={activeTab}/> 
              </div>
      </>
        
       
      )
  }
}


  return (
    <>
   <div className='flex flex-row bg-third sm:bg-primary'>
    <Sidebar userData={userDataO} setUserData={setUserDataO}  /> 
    <div className=' lg:ml-80 mt-16 min-h-screen h-full w-full lg:w-bg bg-third sm:bg-base-200'>
    <div className='ml-4 mr-4'>
    
    {listType()}
    </div>


     
    
   
      
     </div>
     </div>
     </>
  )
}

export default List