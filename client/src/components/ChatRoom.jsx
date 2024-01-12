/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import supabase from './supabaseClient'
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatRoom = ({ event, currentUser }) => {
   const [messages, setMessages] = useState([]);

//   const fetchMessages = async () => {
//     let { data: messages, error } = await supabase
//       .from('messages')
//       .select('*');
//     console.log(messages)
//     if (error) console.error('Error fetching messages', error);
//     else /* Set your state or display messages */;
//   };

//   useEffect(() => {
//     fetchMessages();
//   }, [event.id]);


//   useEffect(() => {
//     const mySubscription = supabase
//       .from('your-table-name')
//       .on('*', payload => {
//         console.log('Change received!', payload);
//       })
//       .subscribe();
  
//     return () => supabase.removeSubscription(mySubscription);
//   }, []);
  
    

//   const handleSendMessage =  (messageText) => {
//     const { error } = await supabase
//       .from('messages')
//       .insert([{ event_id: event.id, message: messageText, user_id:currentUser.id }]);
  
//     if (error) {
//       console.error('Error sending message:', error);
//     }
//   };
const channel = supabase.channel(event.id)

const handleSendMessage = async (message) => {
    const messagePayload = {
        message: message,
        user_id: currentUser.id,
        created_at: new Date().toISOString(),
        event_id: event.id
      };
      
      try{
        const {data:newMessage, error } = await supabase.from('messages')
        .insert([
          messagePayload
        ])
      
        if (error) throw error;

    await channel
    .send({
        type: 'broadcast',
        event: 'new-message',
        payload: messagePayload
      })
      .then(() => {
        console.log('Message sent:', newMessage[0]);
      })
      
      .catch(error => {
        console.error('Error sending message:', error);
      });
    } catch (error) {
        console.error('Error sending message:', error);
      }
}

useEffect(() => {
    // Fetch initial messages
    const fetchMessages = async () => {
      let { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .eq('event_id', event.id);

      if (error) {
        console.error('Error fetching messages', error);
      } else {
        setMessages(messages);
        
      }
    };

    fetchMessages();

    // Subscribe to changes
    channel 
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, payload => {
        if (payload.new && payload.new.event_id === event.id) {
          console.log('New message for event:', payload.new);
          setMessages(prevMessages => [...prevMessages, payload.new]);
        }
      })
      .subscribe();

    // Clean up
    return () => {
      supabase.removeChannel(channel);
      
  }}, [event.id, channel])

  



  return (
    <div className="chat-room overflow-y-scroll mb-24 sm:mb-auto h-screen">
        <div  className=" divider divider-secondary  ">end of chat</div>
      <MessageList currentUser={currentUser} messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatRoom;