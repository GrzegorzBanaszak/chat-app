
import React, { FC } from 'react'
import {UserBox,UserImage,UserName} from "./user.components"

interface IUserProps {
    userName:string,
    userImage:string
}

const User :FC<IUserProps> = ({userName,userImage}) => {
  return (
        <UserBox 
        initial={{opacity:0,x:-100}} 
        animate={{opacity:1,x:0,transition:{type:"spring",stiffness:200,delay:0.1}}}
        exit={{opacity:0,x:-100}}>
        <UserImage src={userImage}/>
        <UserName>{userName}</UserName>
    </UserBox>
  )
}

export default User