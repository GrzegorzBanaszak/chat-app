import React,{FC, useEffect, useRef, useState} from 'react'
import {ChannelsWrapper,MessagesSubmit,Container,Users,UsersTitle,ChatMessages,Channels,ChatMessagesWrapper,ChatMessagesTop,ChatMessagesBottom,MessagesInput} from "./chat.components"
import User from '../User'
import Channel from '../Channel'
import ChatMessage from '../ChatMessage'
import Nav from '../Nav'
import IUser from '../../interfaces/IUser'
import {auth, messagesCol} from "../firebaseConfig"
import { addDoc, getDocs,orderBy,query,serverTimestamp, where } from 'firebase/firestore'
import  {io, Socket } from "socket.io-client"
import IMessage from '../../interfaces/IMessage'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import {BiLogOut} from "react-icons/bi"
const socket : Socket = io("http://localhost:3001");

interface IChatProps {
  user:any
}


const Chat :FC<IChatProps> = ({user}) => {
  const nav = useNavigate()
  const [currentUser,setCurrentUser] = useState<IUser>({id:user.uid,name:user.displayName,image:user.photoURL})
  const [toggleUsers,setToggleUsers] = useState<boolean>(false)
  const [toggleChannels,setToggleChannels] = useState<boolean>(false)
  const [messages,setMessages] = useState<IMessage[]>([])
  const [users,setUsers] = useState<IUser[]>([])
  const [channel,setChannel] = useState<string>("channel1")
  const [messageText,setMessageText] = useState<string>('')
  const scrollRef = useRef<HTMLDivElement | null>(null)


  const getMessages = async () =>{
    const q = query(messagesCol,orderBy("createdAt"))
    const messagesDocs = await getDocs(q)
    setMessages(messagesDocs.docs.map(message => ({...message.data(),id:message.id})))

  }
  useEffect(() =>{
    getMessages()
  },[])

  useEffect(() =>{
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
  },[messages])


  useEffect(() =>{

    socket.on("receive_message",(data) => {
        setMessages(prev => [...prev,data.message])
    })

    //Emit user when join
    socket.emit("update_channel",{user:currentUser,channel})
    //Get user when you join
    socket.on("on_join",(data) =>{
      setUsers(data)
    })

    //Get users when user join
    socket.on("user_join",(data) =>{
      setUsers(data)
    })

    socket.on("user_leave",(data) =>{
      setUsers(data)
    })

    return () =>{
      socket.off()
    }
  },[socket,channel])

  const addMessageSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    if(messageText !== ""){
        const message : IMessage = {
        value:messageText,
        user:currentUser,
        createdAt:serverTimestamp(),
        channel:channel,
      }
      const addedMessage = await addDoc(messagesCol,message)

      setMessages(prev => [...prev,{...message,id:addedMessage.id,channel:channel}])
      socket.emit("send_message",{message:{...message,id:addedMessage.id,channel:channel}})
      setMessageText("")
    }
  }

  const handleToggleUsers = () =>{
    if(toggleChannels) setToggleChannels(false)
    setToggleUsers(prev => !prev)
  }
  const handleToggleChannels = () =>{
    if(toggleUsers) setToggleUsers(false)
    setToggleChannels(prev => !prev)
  }

  const logoutUser = async () =>{
    await signOut(auth)
    nav("/")
  }

  return (
    <>
      <Nav toggleChannels={handleToggleChannels} toggleUsers={handleToggleUsers}/>
      <Container>
        <Users show={toggleUsers}>
          <div onClick={logoutUser}>
            <BiLogOut/>
          </div>
          <UsersTitle>Users</UsersTitle>
          {users.length > 0  && users.filter(user => user.channel === channel)?.map(user => (<User key={user.id} userName={user.name} userImage={user.image}/>))}
        </Users>
        <ChatMessages>
          <ChatMessagesWrapper>
            <ChatMessagesTop ref={scrollRef}>
              {messages.length > 0 && messages.filter(mess => mess.channel === channel).map(message =>(
                <ChatMessage key={message.id} isOwn={message.user.id === user.id? true : false} 
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
            <Channel changeChannel={setChannel} channelName={"channel1"} channelUsers={users.filter(user => user.channel ==="channel1").length}/>
            <Channel changeChannel={setChannel} channelName={"channel2"} channelUsers={users.filter(user => user.channel ==="channel2").length}/>
          </ChannelsWrapper>
        </Channels>
      </Container>
    </>
  )
}

export default Chat