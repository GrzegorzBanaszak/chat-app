import React, { FC } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { MenuContanier,MenuButton } from './chatMenu.components'

interface ChatMenuProps {
  logoutUser:() =>void
}


const ChatMenu :FC<ChatMenuProps> = ({logoutUser}) => {
  return (
    <MenuContanier>
        <MenuButton onClick={logoutUser}>
            <BiLogOut/>
            Logout
        </MenuButton>
    </MenuContanier>
  )
}

export default ChatMenu