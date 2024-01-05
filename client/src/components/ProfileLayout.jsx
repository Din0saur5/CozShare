import React from 'react'
import FollowersTable from './FollowersTable'
import FollowingTable from './FollowingTable'
import EventCreateForm from './EventCreateForm'

const ProfileLayout = ({activeTab, userData, setUserData, viewedProfile}) => {
    switch(activeTab){
        case 'Inspiring':
            return(
                <>
                    <FollowersTable userData={userData} setUserData={setUserData} viewedProfile={viewedProfile}/>
                </>
            )
        case 'Inspired by':
            return(
                <>
                    <FollowingTable userData={userData} setUserData={setUserData} viewedProfile={viewedProfile}/>
                </>
            )
        case 'posts':
            return(
                <div>
                    posts
                </div>
            )
        case 'events':
            
            return(
                <>{userData.id === viewedProfile?(
                <div className='flex flex-row-reverse mr-2 mt-2'>
                    <EventCreateForm userData={userData} setUserData={setUserData}/>
                </div>
                 ):(<></>)} {/*<div className='mr-2 mt-2 w-full h-12'></div>*/}
                </>
            )
    }
   


}

export default ProfileLayout
