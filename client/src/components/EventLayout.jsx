/* eslint-disable react/prop-types */

import MembersTable from './MembersTable'


const EventLayout = ({activeTab, userData, setUserData, viewedProfile}) => {
    switch(activeTab){
        case 'Members':
            return(
                <>
                {/* //create members table */}
                    <MembersTable userData={userData} setUserData={setUserData} viewedProfile={viewedProfile}/>
                </>
            )
        case 'Chat':
            return(
               //navigate to a chat room with user id in paramswhen on mobile otherwise chat room is in desktop
               <></>
            )
        case 'Posts':
            //posts table from event posts fetch 
            return(
                <div>
                    posts
                </div>
            )
        
    }
   


}

export default EventLayout
