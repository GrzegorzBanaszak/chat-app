import React, { FC } from 'react'
import {UserBox,UserImage,UserName} from "./user.components"

interface IUserProps {
    userName:string,
    userImage:string
}

const User :FC<IUserProps> = ({userName,userImage}) => {
  return (
    <UserBox>
        <UserImage src={userImage}/>
        <UserName>{userName}</UserName>
    </UserBox>
  )
}

export default User