import React, { useEffect, useRef, useState } from 'react'
import ChatBotIcon from './components/chatBotIcon'
import ChatForm from './components/ChatForm'
import ChatMessage from './components/ChatMessage';
import myInfo from './components/myInfo';

const App=function App() {

  const [chatHistry, setChatHistry]=useState([{
    hideInChat:true,
    role:"model",
    text: myInfo
  }]);
  const chatBodyRef=useRef();

  const generateBotResponse=async (histry)=>{
    const updateHistry=(text)=>{
        setChatHistry(prev=>[...prev.filter(msg=>SVGAElement.text!=="Thinking"),{role:"model",text}])
    }
    console.log(histry);
    histry=histry.map(({role,text})=>({role,parts:[{text}]}));
    const requestOptions={
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({contents: histry})
    }
    try {
      const response=await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data=await response.json();
      if(!response.ok)throw new Error(data.error.message || "Something Wrong!!!");
      console.log(data);
      const apiResponseText=data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim();
      updateHistry(apiResponseText);
    } catch (error) {
      console.log(error)
    }
  };
 
  useEffect(()=>{
    chatBodyRef.current.scrollTo({top: chatBodyRef.current.scrollHeight, behaviour: "smooth"})
  },[chatHistry])

  return (
    <div className='flex justify-center container content-center'>
      <div className='chatbot-popup'>
        {/* Header */}
        <div className='flex chat-header bg-amber-500 w-full justify-center text-4xl font-bold '>
          <div className='flex align-middle header-info'>
            <ChatBotIcon/>
            <h2 className='logo-text'>Chatbot</h2> 
          </div>
          {/* <button className="material-symbols-outlined">keyboard_arrow_down</button> */}
        </div>
        {/* body */}
        <div ref={chatBodyRef}className='chat-body'>
          <div className='message bot-message'>
               <ChatBotIcon/>
               <p>Hello! How can I help you?</p>
          </div>
          {chatHistry.map((chat,index)=>(<ChatMessage key={index} chat={chat}/>))}
          
        </div>
        <div className='flex bg-amber-400 w-full justify-center py-2  chat-footer'>
          <ChatForm chatHistry={chatHistry} setChatHistry={setChatHistry} generateBotResponse={generateBotResponse}/>
        </div>
      </div>
    </div>
  )
}

export default App
