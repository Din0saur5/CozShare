/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import  { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useUserContext } from '../components/UserContext';

import ExploreLayout from '../components/ExploreLayout';
const Dashboard = () => {
  //  const navigate = useNavigate()
   const {userData, setUserData} = useUserContext()
   let newUser = 'Popular Posts'
   if(userData.following && userData.following.length>0){
       newUser = 'Following Feed'
   }
   const [activeTab, setActiveTab] = useState(newUser); 
  return (
    <>
    <div className='flex flex-row bg-base-200'>
    <Sidebar userData={userData} setUserData={setUserData}  /> 
    <div className=' lg:ml-80 z-5 lg:z-10 h-full w-full lg:w-bg bg-base-200'>
     <div className='w-full h-1/5 lg:h-1/4 flex flex-row align-baseline bg-base-200'>
    <div className=' -mt-10 lg:-mt-5'>
     
      
        <div className='text-xl bold mb-2 ml-16 lg:ml-20' ></div>
    </div>
    <div className="font-medium flex align-center flex-col mt-12 justify-center ">
        
        
    </div>
     </div>
     <div className="flex flex-col">
        
            
        
      <div className="relative right-0 flex flex-row-reverse space-x-2 rounded-t-xl w-full ">
        {[ 'Popular Events', 'Popular Posts', 'Following Feed'].map((tab) => (
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
        

          <ExploreLayout userData={userData} activeTab={activeTab}/>
        </div>
      </div>
  
     
    </div>
    </div>
      </>
  )

}
export default Dashboard
