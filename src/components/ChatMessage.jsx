import React from 'react'

const ChatMessage=function ChatMessage({chat}) {
  return (
    <div className={`message ${chat.role=== "mode" ? 'bot': 'user'}-message`}>
            <p className='message-text'>{chat.text}</p>
          </div>
  )
}

export default ChatMessage