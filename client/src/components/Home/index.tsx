import React from 'react'
import {Container,
  Title,
  LogoImage,
  SelectSection,
  SelectLable,
  SelectCharacter,
  SelectOption,
  SelectImage,
  SelectNameInput,
  SubmitCharacter} from "./home.components"


const Home = () => {


  return (
    <Container>
      <Title 
      initial={{scale:0}}
      animate={{scale:1}}>Chatex</Title>
      <LogoImage src='Logo.png' alt="logo"/>
      <SelectSection>
        <SelectLable>Select your character</SelectLable>
        <SelectCharacter>
          <SelectOption value="boomer">boomer</SelectOption>
          <SelectOption value="boomer">doomer</SelectOption>
        </SelectCharacter>
        <SelectImage src={require("../../images/2c0.png")} alt="characterImage" />
        <SelectNameInput type="text" placeholder='Type your nickname' />
        <SubmitCharacter to="/chat">Submit character</SubmitCharacter>
      </SelectSection>
    </Container>
  )
}

export default Home