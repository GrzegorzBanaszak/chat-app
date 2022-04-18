import React,{FC, useEffect, useRef, useState} from 'react'
import {ChannelsWrapper,MessagesSubmit,Container,Users,UsersTitle,ChatMessages,Channels,ChatMessagesWrapper,ChatMessagesTop,ChatMessagesBottom,MessagesInput} from "./chat.components"
import User from '../User'
import Channel from '../Channel'
import ChatMessage from '../ChatMessage'
import Nav from '../Nav'
import IUser from '../../interfaces/IUser'
import {auth, messagesCol} from "../firebaseConfig"
import { addDoc, getDocs,limit,orderBy,query,serverTimestamp, where } from 'firebase/firestore'
import IMessage from '../../interfaces/IMessage'
import ChatMenu from '../ChatMenu'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import socket from "../../socketConfig"
import { AnimatePresence } from 'framer-motion'
interface IChatProps {
  user:any
}


const Chat :FC<IChatProps> = ({user}) => {
  
  //#region  State
  const [currentUser,setCurrentUser] = useState<IUser>({id:user.uid,name:user.displayName,image:user.photoURL})
  const [toggleUsers,setToggleUsers] = useState<boolean>(false)
  const [toggleChannels,setToggleChannels] = useState<boolean>(false)
  const [messages,setMessages] = useState<IMessage[]>([])
  const [users,setUsers] = useState<IUser[]>([])
  const [channel,setChannel] = useState<string>("channel1")
  const [messageText,setMessageText] = useState<string>('')
  const scrollRef = useRef<HTMLDivElement | null>(null)

  //#endregion
  
  const getMessages = async () =>{
    const q = query(messagesCol,where("channel","==",channel),orderBy("createdAt"))
    const messagesDocs = await getDocs(q)
    setMessages(messagesDocs.docs.map(message => ({...message.data(),id:message.id})))

  }
  useEffect(() =>{
    //Emit user when join
    socket.emit("update_channel",{user:currentUser,channel})
  },[])

  useEffect(() =>{
    getMessages()
  },[channel])
  useEffect(() =>{
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
  },[messages])

  //#region Socket
  useEffect(() =>{

    socket.on("receive_message",(data) => {
        setMessages(prev => [...prev,data.message])
    })

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

    socket.on("user_change_channel",(data) =>{
      setUsers(data)
    })

    return () =>{
      socket.off()
    }
  },[socket])
  //#endregion
  
  const nav = useNavigate();
  const logoutUser = async () =>{
      await signOut(auth)
     socket.emit("logout")
      nav("/")
  }

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

  const hideToggle = () =>{
    if(toggleUsers) setToggleUsers(false)
    if(toggleChannels) setToggleChannels(false)
  }

  const handleChannelChange = (selectedChannel:string) =>{
    setChannel(selectedChannel)
    socket.emit("channel_change",{user:currentUser,channel:selectedChannel})
  }
  
  return (
    <>
      <Nav toggleChannels={handleToggleChannels} toggleUsers={handleToggleUsers}/>
      <Container onClick={hideToggle}>
        <Users show={toggleUsers}>
          <ChatMenu logoutUser={logoutUser}/>
          <UsersTitle>Users</UsersTitle>
          <AnimatePresence
            initial={false}
            exitBeforeEnter={false}
            onExitComplete={() => null}
          >
        {users.length > 0  && users.filter(user => user.channel === channel)?.map(user => (
            <User key={user.id} userName={user.name} userImage={user.image}/>
        ))}
        </AnimatePresence>
        </Users>
        <ChatMessages>
          <ChatMessagesWrapper>
            <ChatMessagesTop>
              {messages.length > 0 && messages.map(message =>(
                <div key={message.id} ref={scrollRef}>
                    <ChatMessage  isOwn={message.user.id === currentUser.id? true : false} 
                  userName={message.user.name} 
                  userImage={message.user.image}
                  messageText={message.value}/>
                </div>
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
            <Channel  channelName={"channel1"} handleChannel={handleChannelChange} channelUsers={users.filter(user => user.channel ==="channel1").length}/>
            <Channel  channelName={"channel2"} handleChannel={handleChannelChange} channelUsers={users.filter(user => user.channel ==="channel2").length}/>
          </ChannelsWrapper>
        </Channels>
      </Container>
    </>
  )
}

export default Chat