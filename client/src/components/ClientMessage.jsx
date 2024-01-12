import React from 'react'

const ClientMessage = ({message, currentUser}) => {





  return (
<div className="chat chat-end">
    <div className="chat-image avatar  ">
        <div className="w-10 mask mask-hexagon ">
            <img src={currentUser.profile_pic} />
        </div>
        </div>
  <div className="chat-header">
    {currentUser.display_name}
    
  </div>
  <div className="chat-bubble chat-bubble-accent">{message.message}</div>
  
</div>
  )
}

export default ClientMessage
