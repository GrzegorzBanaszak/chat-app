import React,{useState} from 'react'
import {ChannelsWrapper,MessagesSubmit,Container,Users,UsersTitle,ChatMessages,Channels,ChatMessagesWrapper,ChatMessagesTop,ChatMessagesBottom,MessagesInput} from "./chat.components"
import User from '../User'
import Channel from '../Channel'
import ChatMessage from '../ChatMessage'
import Nav from '../Nav'



const Chat = () => {
  const [toggleUsers,setToggleUsers] = useState<boolean>(false)
  const [toggleChannels,setToggleChannels] = useState<boolean>(false)

  const handleToggleUsers = () =>{
    if(toggleChannels) setToggleChannels(false)

    setToggleUsers(prev => !prev)
  }

  const handleToggleChannels = () =>{
    if(toggleUsers) setToggleUsers(false)

    setToggleChannels(prev => !prev)
  }
  return (
    <>
      <Nav toggleChannels={handleToggleChannels} toggleUsers={handleToggleUsers}/>
      <Container>
        <Users show={toggleUsers}>
          <UsersTitle>Users</UsersTitle>
          <User userName={"Grzegorz"} userImage={"wojak.jpg"}/>
          <User userName={"Paweł"} userImage={"boomer.png"}/>
        </Users>
        <ChatMessages>
          <ChatMessagesWrapper>
            <ChatMessagesTop>
              <ChatMessage isOwn={true} 
              userName={"Grzegorz"} 
              userImage={"wojak.jpg"}
              messageText={"Hello"}/>
              <ChatMessage isOwn={false} 
              userName={"Paweł"} 
              userImage={"boomer.png"}
              messageText={"Hello"}/>
            </ChatMessagesTop>
            <ChatMessagesBottom>
              <MessagesInput/>
              <MessagesSubmit type='submit' >Send</MessagesSubmit>
            </ChatMessagesBottom>
          </ChatMessagesWrapper>
        </ChatMessages>
        <Channels show={toggleChannels}>
          <ChannelsWrapper>
            <Channel channelName={"Channel 1"} channelUsers={4}/>
            <Channel channelName={"Channel 2"} channelUsers={0}/>
            <Channel channelName={"Channel 3"} channelUsers={5}/>
          </ChannelsWrapper>
        </Channels>
      </Container>
    </>
  )
}

export default Chat