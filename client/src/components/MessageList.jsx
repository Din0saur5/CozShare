/* eslint-disable react/prop-types */
import  { useEffect, useRef} from 'react';
import ClientMessage from './ClientMessage';
import Message from './Message';

const MessageList = ({ currentUser, messages }) => {
    const messagesEndRef = useRef(null);

    const lastMessageCount = useRef(messages.length);
  
    const scrollToBottom = () => {
        if (messages.length > lastMessageCount.current) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        lastMessageCount.current = messages.length;
    }
      };
      
    
      
    const scrollToBottomForced = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      };
    
    useEffect(() => {
        
        scrollToBottom();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [messages]);

    return (
    <div className="message-list">
      {messages.map(message => {
        if(message.user_id === currentUser.id){
            return <ClientMessage key={message.id} message={message} currentUser={currentUser}/>
        }else{
           return <Message key={message.id} message={message} />
        }
})}

    <div ref={messagesEndRef} /> 
    <div className="sticky bottom-20 flex justify-center" >
        <button onClick={()=>scrollToBottomForced()}>
          Scroll to Bottom
        </button>
        </div>  
    </div>

  );
};

export default MessageList;
