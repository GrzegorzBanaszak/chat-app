import React from 'react'
import {ChannelsWrapper,MessagesSubmit,Container,Users,UsersTitle,ChatMessages,Channels,ChatMessagesWrapper,ChatMessagesTop,ChatMessagesBottom,MessagesInput} from "./chat.components"
import User from '../User'
import Channel from '../Channel'



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
      <Channels>
        <ChannelsWrapper>
          <Channel channelName={"Channel 1"} channelUsers={4}/>
          <Channel channelName={"Channel 2"} channelUsers={0}/>
          <Channel channelName={"Channel 3"} channelUsers={5}/>
        </ChannelsWrapper>
      </Channels>
    </Container>
  )
}

export default Chat