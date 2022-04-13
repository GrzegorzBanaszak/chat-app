import React from "react-icons/bs"
import {Container,
  Title,
  LogoImage,
  LinkElement,
  LinkBox,
  LinkMotion
} from "./home.components"

const Home  = () => {
  
 
  return (
    <>
      <Title>CzateX</Title>
      <Container>
      <LogoImage src='Logo.png' alt="logo"/>
      <LinkBox>
        <LinkElement to={"register"}>
          <LinkMotion>
            Register
          </LinkMotion>
        </LinkElement>
        <LinkElement to={"login"}>
          <LinkMotion>
            Login
          </LinkMotion>
        </LinkElement>
      </LinkBox>
        
      </Container>
    </>
  )
}

export default Home