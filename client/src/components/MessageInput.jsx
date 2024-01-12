import React, { useState } from 'react';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <>
    
    <form className='sticky bottom-0 flex flex-row justify-center' onSubmit={handleSubmit}>
      <input
        className='input input-primary ml-4 mb-4 w-10/12'
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button className='btn btn-md ml-2 btn-primary text-base-100 shadow-inner shadow-white' type="submit">Send</button>

    </form>
    </>
  );
};

export default MessageInput;
