import React, { FC } from 'react'
import {MessageBox,MessageBottom,MessageUserName,MessageText,MessageImage} from "./chatMessage.components"

interface IChatMessageProps {
  isOwn:boolean,
  userName:string,
  messageText:string,
  userImage:string
}


const ChatMessage  :FC<IChatMessageProps>= ({isOwn,userName,messageText,userImage}) => {
  return (
    <MessageBox userMessage={isOwn}>
      <MessageText userMessage={isOwn}>
         {messageText}
      </MessageText>
      <MessageBottom userMessage={isOwn}>
        <MessageUserName>
            {userName}
        </MessageUserName>
      <MessageImage src={userImage}/>
      </MessageBottom>
    </MessageBox>
  )
}

export default ChatMessage