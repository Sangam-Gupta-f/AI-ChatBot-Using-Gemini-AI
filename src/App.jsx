import React, { useState } from 'react'
import ChatBotIcon from './components/chatBotIcon'
import ChatForm from './components/ChatForm'
import ChatMessage from './components/ChatMessage';

const App=function App() {
  const [chatHistry, setChatHistry]=useState([]);

  const generateBotResponse=async (histry)=>{
    const updateHistry=(text)=>{
        setChatHistry(prev=>[...prev.filter(msg=>SVGAElement.text!=="Thinking..."),{role:"model",text}])
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
      const response=await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=AIzaSyDtZ4UozuqKJh0gTqs0q30yG7pDbnagvXs", requestOptions);
      const data=await response.json();
      if(!response.ok)throw new Error(data.error.message || "Something Wrong!!!");
      console.log(data);
      const apiResponseText=data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim();
      updateHistry(apiResponseText);
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className='container'>
      <div className='chatbot-popup'>
        {/* Header */}
        <div className='chat-header'>
          <div className='header-info'>
            <ChatBotIcon/>
            <h2 className='logo-text'>Chatbot</h2> 
          </div>
          <button className="material-symbols-outlined">keyboard_arrow_down</button>
        </div>
        {/* body */}
        <div className='chat-body'>
          <div className='message bot-message'>
               <ChatBotIcon/>
               <p>Hell <br/> how can i help</p>
          </div>
          {chatHistry.map((chat,index)=>(<ChatMessage key={index} chat={chat}/>))}
          
        </div>
        <div className='chat-footer'>
          <ChatForm chatHistry={chatHistry} setChatHistry={setChatHistry} generateBotResponse={generateBotResponse}/>
        </div>
      </div>
    </div>
  )
}

export default App