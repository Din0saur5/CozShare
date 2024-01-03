import React from 'react'
import FollowersTable from './FollowersTable'

const ProfileLayout = ({activeTab, userData, setUserData}) => {
    switch(activeTab){
        case 'Inspiring':
            return(
                <>
                    <FollowersTable userData={userData} setUserData={setUserData}/>
                </>
            )
        case 'Inspired by':
            return(
                <div>
                    isnipred by
                </div>
            )
        case 'posts':
            return(
                <div>
                    posts
                </div>
            )
        case 'events':
            return(
                <div>
                    events
                </div>
            )
    }
   


}

export default ProfileLayout
