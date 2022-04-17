import { signOut } from 'firebase/auth'
import React, { FC } from 'react'
import { BiLogOut, BiUser } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebaseConfig'
import { MenuContanier,MenuButton ,MenuLink} from './chatMenu.components'

interface ChatMenuProps {
  logoutUser:() =>void
}


const ChatMenu :FC<ChatMenuProps> = ({logoutUser}) => {
  return (
    <MenuContanier>
        <MenuButton onClick={logoutUser}>
            <BiLogOut/>
        </MenuButton>
        <MenuLink to="/user">
             <BiUser/>
        </MenuLink>
    </MenuContanier>
  )
}

export default ChatMenu