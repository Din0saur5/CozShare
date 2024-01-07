/* eslint-disable react/prop-types */

import FollowersTable from './FollowersTable'
import FollowingTable from './FollowingTable'
import EventsTable from './EventsTable'

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
        case 'Posts':
            return(
                <div> 
                    posts
                </div>
            )
                
            
        case 'Events':
            
            return(
                <>
                <EventsTable userData={userData} setUserData={setUserData} viewedProfile={viewedProfile} />


                </>
            )
    }
   


}

export default ProfileLayout
