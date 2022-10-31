import React, { useState, useEffect }  from 'react'
import {
    useSendMessageMutation, 
    useGetMessagesQuery 
} from './chatAPI';

export default function Chat() {
   const [message, setMessage] = useState("");
   const { data }  = useGetMessagesQuery();
   const [sendMessage, { isLoading }] = useSendMessageMutation()

   const handleSubmit = (e) => {
     e.preventDefault();
     sendMessage(message);
     setMessage('');
   }

  return (
    <div className='chats'>
        { data ? data.map((message, i) => (
            <div className='chat' key={i}>
                {message}
            </div>
        )) : <div>No Message</div>}
        <form className="chatForm" onSubmit={e => handleSubmit(e)}>
            <input
              type="text"
              placeholder='Message...'
              onChange={e => setMessage(e.target.value)}
            />
            <input 
             className="send-message" 
             type="submit"
             value="Send"
            />
        </form>
    </div>
  )
}
