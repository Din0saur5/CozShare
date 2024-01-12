/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react'

const Message = ({message}) => {
    const server = import.meta.env.VITE_URL
    const [user, setViewUserData] = useState({})
    useEffect(()=>{ 
        const config = {
          credentials: 'include',
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }}
        fetch(`${server}/users/${message.user_id}`, config)
          .then(res=>res.json())
          .then(data=>{
            console.log(data)
            setViewUserData(data)
          })
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]) 
    


  return (
    <div>
      <div className="chat chat-start">
      <div className="chat-image avatar  ">
        <div className="w-10 mask mask-hexagon ">
            <img src={user.profile_pic} />
        </div>
        </div>
        <div className="chat-header">
            {user.display_name}
           
        </div>
        <div className="chat-bubble chat-bubble-secondary">{message.message}</div>
        
</div>
    </div>
  )
}

export default Message
