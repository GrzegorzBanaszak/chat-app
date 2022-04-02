import React from 'react'
import {MessagesSubmit,Container,Users,UsersTitle,ChatMessages,Channels,ChatMessagesWrapper,ChatMessagesTop,ChatMessagesBottom,MessagesInput} from "./chat.components"
import User from '../User'



const Chat = () => {
  return (
    <Container>
      <Users>
        <UsersTitle>Users</UsersTitle>
        <User userName={"Grzegorz"} userImage={"wojak.jpg"}/>
        <User userName={"Paweł"} userImage={"boomer.png"}/>
      </Users>
      <ChatMessages>
        <ChatMessagesWrapper>
          <ChatMessagesTop>
          </ChatMessagesTop>
          <ChatMessagesBottom>
            <MessagesInput/>
            <MessagesSubmit type='submit'>Send</MessagesSubmit>
          </ChatMessagesBottom>
        </ChatMessagesWrapper>
      </ChatMessages>
      <Channels>Channels</Channels>
    </Container>
  )
}

export default Chat