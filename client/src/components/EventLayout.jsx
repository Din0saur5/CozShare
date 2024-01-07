/* eslint-disable react/prop-types */

import MembersTable from './MembersTable'


const EventLayout = ({activeTab, userData, setUserData, memberList, viewedProfile, setMemberList}) => {
    const isUserInList = memberList.some(member => member.id === userData.id);


    switch(activeTab){
        case 'Members':
            return(isUserInList?(

                <>
                 
                     {userData.id === viewedProfile.admin_id? (
                         <button className='btn bg-red-500'>Delete Event</button>
                         ):(
                          <button className='btn btn-accent'>Leave Event</button>
                         )
                        }
                         
                    <MembersTable userData={userData} setUserData={setUserData} memberList={memberList} viewedProfile={viewedProfile.id} setMemberList={setMemberList}/>
                </>
            ):(
                
                <div style={{textShadow: "0 0 15px #a991f7 , 0 0 15px #fff "}} className=" divider divider-secondary  ">Join Event to view {activeTab}</div>
            )
            )
        case 'Chat':
            return(isUserInList?
               (

                <>
                 hi
                </>
            ):(
                
                <div style={{textShadow: "0 0 15px #a991f7 , 0 0 15px #fff "}} className=" divider divider-secondary  ">Join Event to view {activeTab}</div>
            )
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
