/* eslint-disable react/prop-types */

import { useNavigate } from 'react-router-dom';
import MembersTable from './MembersTable'


const EventLayout = ({activeTab, userData, setUserData, memberList, viewedProfile, setMemberList}) => {
    const isUserInList = memberList.some(member => member.id === userData.id);
    const server = import.meta.env.VITE_URL
    const navigate = useNavigate(); 
    //fn to join event (post to members return new member and add to member list)
    async function addNewMember(userId, eventId, setMemberList) {
        const url = `${server}/members`;
        const data = { user_id: userId, event_id: eventId };
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const memberData = await response.json();
            console.log('Member added successfully:', memberData);
    
            await fetchUpdatedMembers(eventId, setMemberList);
        } catch (error) {
            console.error('Error adding member:', error);
            // Optionally, update UI with error feedback
        }
    }
    
    async function fetchUpdatedMembers(eventId, setMemberList) {
        const config = {
            credentials: 'include',
            method: "GET",
            headers: { "Content-Type": "application/json" }
        };
    
        try {
            const response = await fetch(`${server}/members/${eventId}`, config);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            setMemberList(data);
        } catch (error) {
            console.error('Error fetching members:', error);
            // Optionally, update UI with error feedback
        }
    }
    
    function handleDelete(viewedProfileId) {
        const confirmDelete = window.confirm("Are you sure you want to delete this? It cannot be undone.");
    
        if (confirmDelete) {
            
            deleteEvent(viewedProfileId);
        } else {
            console.log("Deletion cancelled.");
            return
        }
    }
    




    // fn to delete event and navigate to dashboard
    function deleteEvent(viewedProfileId) {
        const url = `${server}/events/${viewedProfileId}`; 
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                navigate('/dashboard');
            } else if (response.status === 404) {
                return response.json().then(data => {
                    throw new Error(data.error);
                });
            } else {
                throw new Error('Failed to delete the event');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            
        });
    }




    // fn to leave event delete req to members list 
    function deleteMember(userId, eventId, setMemberList) {
        const url = `${server}/delete_member/${userId}/${eventId}`;
    
        fetch(url, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    console.error('Member not found');
                } else {
                    throw new Error('Error deleting member');
                }
                return; 
            }
    
            console.log('Member successfully deleted');
            
            fetchUpdatedMembers(eventId, setMemberList);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }


    switch(activeTab){
        case 'Members':
            return(isUserInList?(

                <>
                 
                     {userData.id === viewedProfile.admin_id? (
                         <button onClick={()=>{handleDelete(viewedProfile.id)}} className='btn bg-red-500'>Delete Event</button>
                         ):(
                          <button onClick={()=>{deleteMember(userData.id, viewedProfile.id, setMemberList)}} className='btn btn-accent'>Leave Event</button>
                         )
                        }
                         
                    <MembersTable userData={userData} setUserData={setUserData} memberList={memberList} viewedProfile={viewedProfile} setMemberList={setMemberList}/>
                </>
            ):(
                <>
                <div style={{textShadow: "0 0 15px #a991f7 , 0 0 15px #fff "}} className=" divider divider-secondary  ">Join Event to view {activeTab}</div>
                <button onClick={()=>{addNewMember(userData.id, viewedProfile.id, setMemberList)}} className='btn btn-accent'>Join Event</button>
                </>
            )
            )
        case 'Chat':
            return(isUserInList?
               (

                <>
                 hi
                </>
            ):(
                <>
                <div style={{textShadow: "0 0 15px #a991f7 , 0 0 15px #fff "}} className=" divider divider-secondary  ">Join Event to view {activeTab}</div>
                <button onClick={()=>{addNewMember(userData.id, viewedProfile.id, setMemberList)}}  className='btn btn-accent'>Join Event</button>
                </>
            )
            )
        case 'Posts':
            //posts table from event posts fetch 
            return(isUserInList?
                (
 
                 <>
                  hi
                 </>
             ):(
                 <>
                 <div style={{textShadow: "0 0 15px #a991f7 , 0 0 15px #fff "}} className=" divider divider-secondary  ">Join Event to view {activeTab}</div>
                 <button onClick={()=>{addNewMember(userData.id, viewedProfile.id, setMemberList)}}  className='btn btn-accent'>Join Event</button>
                 </>
             )
             )
        
    }
   


}

export default EventLayout
