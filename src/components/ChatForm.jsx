import React from 'react'
import { useRef } from 'react';
function ChatForm({chatHistry,setChatHistry, generateBotResponse}) {
   const inputRef=useRef();


    const handleFormSubmit=(e)=>{
    e.preventDefault();
    const userMessage=inputRef.current.value.trim();
    if(!userMessage)return;
    console.log(userMessage)
    inputRef.current.value="";
    setChatHistry((histry)=>[...histry, { role: "user", text:userMessage}])

    setTimeout(()=>{setChatHistry((histry)=>[...histry, { role: "user", text:"Thinking..."}]);
    generateBotResponse([...chatHistry, {role: "user", text: `using the details provide above, please address this query: ${userMessage}`}])
  
  },600
)
 }
    
  return (
    <form onSubmit={handleFormSubmit}>
            <input type='text' ref={inputRef} placeholder='Message' className='message-iput' required/>
            <button className="material-symbols-outlined">keyboard_arrow_down</button>        
    </form>
  )
}

export default ChatForm