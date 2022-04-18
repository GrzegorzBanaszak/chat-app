import React from "react-icons/bs"
import { colors } from "../theme"
import {Container,
  Title,
  LogoImage,
  LinkElement,
  LinkBox,
  LinkMotion
} from "./home.components"

const bottonVariant = {
  hover: {
    scale:1.02,
    border:`1px solid ${colors.darkBlue}`,
    color:colors.darkBlue,
    backgroundColor:"white",
    transition:{
      type:"spring",
      duration:0.2
    }
  }
}


const Home  = () => {
  
  return (
    <>
      <Title>CzateX</Title>
      <Container>
      <LogoImage src='Logo.png' alt="logo"/>
      <LinkBox>
        <LinkElement to={"register"}>
          <LinkMotion variants={bottonVariant} whileHover="hover">
            Register
          </LinkMotion>
        </LinkElement>
        <LinkElement to={"login"}>
          <LinkMotion variants={bottonVariant} whileHover="hover">
            Login
          </LinkMotion>
        </LinkElement>
      </LinkBox>
        
      </Container>
    </>
  )
}

export default Home