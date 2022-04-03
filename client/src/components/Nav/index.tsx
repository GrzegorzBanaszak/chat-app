import React from 'react'
import {NavContainer,NavLogo,NavToggle,NavWrapper} from "./nav.components"
import {FiUsers,FiList} from "react-icons/fi"
const Nav = () => {
  return (
    <NavContainer>
        <NavWrapper>
           <NavToggle>
               <FiUsers/>
            </NavToggle>
           <NavLogo>ChateX</NavLogo>
           <NavToggle>
               <FiList/>
           </NavToggle>
        </NavWrapper>
    </NavContainer>
  )
}

export default Nav