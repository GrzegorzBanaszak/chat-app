import React,{FC, useEffect, useState} from 'react'
import {ChannelsWrapper,MessagesSubmit,Container,Users,UsersTitle,ChatMessages,Channels,ChatMessagesWrapper,ChatMessagesTop,ChatMessagesBottom,MessagesInput} from "./chat.components"
import User from '../User'
import Channel from '../Channel'
import ChatMessage from '../ChatMessage'
import Nav from '../Nav'
import IUser from '../../interfaces/IUser'
import {usersCol} from "../firebaseConfig"
import { getDocs } from 'firebase/firestore'
import  {io, Socket } from "socket.io-client"
import IMessage from '../../interfaces/IMessage'

const socket : Socket = io("http://192.168.0.104:3001");

interface IChatProps {
  user:IUser
}


const Chat :FC<IChatProps> = ({user}) => {
  const [toggleUsers,setToggleUsers] = useState<boolean>(false)
  const [toggleChannels,setToggleChannels] = useState<boolean>(false)
  const [messages,setMessages] = useState<IMessage[]>([])
  const [users,setUsers] = useState<IUser[]>([])
  const [channel,setChannel] = useState<string>("Channel 1")
  const [messageText,setMessageText] = useState<string>('')

  const getUsers = async () =>{
    // const usersDocs = await getDocs(usersCol)
    // setUsers(usersDocs.docs.map(user => ({...user.data(),id:user.id})))
  }
  useEffect(() =>{
    getUsers()
  },[])


  useEffect(() =>{

    socket.on("message",(data) => {
      console.log(data)
        const message : IMessage = {
        value:data.message,
        user:data.user,
        timestamp:Date.now().toString(),
        }
        setMessages(prev => [...prev,message])
    })

    socket.on("get_user",() =>{
      socket.emit("update_channel",user)
    })
    socket.on("user_join",(data) =>{
      setUsers(prev => [...prev,data])
    })
    socket.on("get_users",(data) =>{
      setUsers(data)
    })

    socket.on("user_leave",(data) =>{
      setUsers(data)
    })

    return () =>{
      socket.emit("remove_user",user)
    }
  },[socket])

  const addMessageSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const message : IMessage = {
      value:messageText,
      user:user,
      timestamp:Date.now().toString(),
      }
    setMessages(prev => [...prev,message])
    socket.emit("message",{message:messageText,user:user})
    setMessageText("")
  }

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
          {users.length > 0 && users.map(user => (<User userName={user.name} userImage={user.image}/>))}
        </Users>
        <ChatMessages>
          <ChatMessagesWrapper>
            <ChatMessagesTop>
              {messages.length > 0 && messages.map(message =>(
                <ChatMessage isOwn={message.user.id === user.id? true : false} 
                userName={message.user.name} 
                userImage={message.user.image}
                messageText={message.value}/>
              ))}
            </ChatMessagesTop>
            <ChatMessagesBottom onSubmit={addMessageSubmit}>
              <MessagesInput value={messageText} onChange={e => setMessageText(e.target.value)}/>
              <MessagesSubmit type='submit' >Send</MessagesSubmit>
            </ChatMessagesBottom>
          </ChatMessagesWrapper>
        </ChatMessages>
        <Channels show={toggleChannels}>
          <ChannelsWrapper>
            <Channel channelName={"Channel 1"} channelUsers={0}/>
            <Channel channelName={"Channel 2"} channelUsers={0}/>
            <Channel channelName={"Channel 3"} channelUsers={0}/>
          </ChannelsWrapper>
        </Channels>
      </Container>
    </>
  )
}

export default Chat