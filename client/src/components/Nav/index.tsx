import React, { FC } from 'react'
import {NavContainer,NavLogo,NavToggle,NavWrapper} from "./nav.components"
import {FiUsers,FiList} from "react-icons/fi"

interface INavProps{
  toggleChannels:() => void,
  toggleUsers: () => void
}


const Nav:FC<INavProps> = ({toggleChannels,toggleUsers}) => {
  return (
    <NavContainer>
        <NavWrapper>
           <NavToggle onClick={toggleUsers}>
               <FiUsers/>
            </NavToggle>
           <NavLogo>ChateX</NavLogo>
           <NavToggle onClick={toggleChannels}>
               <FiList/>
           </NavToggle>
        </NavWrapper>
    </NavContainer>
  )
}

export default Nav