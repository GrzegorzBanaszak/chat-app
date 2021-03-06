import React,{useState,useEffect} from 'react'
import {charactersCol,auth} from "../firebaseConfig"
import defCharacter from "../../images/character.png"
import ICharacter from '../../interfaces/ICharacter'
import {BsChevronLeft,BsChevronRight} from "react-icons/bs"
import {Container,
  Title,
  TitleLink,
  RegisterForm,
  SelectLable,
  SelectImage,
  SubmitCharacter,
RegisterInputError,
SelectImageWrapper,
SelectArrowLeft,SelectArrowRight,RegisterLable,RegisterInput,RegisterTitle} from "./register.components"
import {getDocs} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import IErrorMessage from '../../interfaces/IErrorMessage'
import {IoChatbubblesSharp} from "react-icons/io5"


const defaultErrorMessage :IErrorMessage = {
  type:"",
  text:""
}



const Register = () => {
  //States
  const nav = useNavigate();
  //Avatar state
  const [characterList,setCharactersList] = useState<ICharacter[]>([])
  const [selectedCharacter,setSelectedCharacter] = useState<number>(0)

  //Error message state
  const [errorMessage,setErrorMessage] = useState<IErrorMessage>(defaultErrorMessage)

  //Form inputs states
  const [nickname,setNickname] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const [email,setEmail] = useState<string>("")

  //Get avatar images
  const getCharacters = async () =>{
      const charactersDocs = await getDocs(charactersCol) 
      const charactersData = charactersDocs.docs.map(charDoc =>{
        return charDoc.data();
      })
      setCharactersList(charactersData)
  }
  useEffect(() =>{
    getCharacters()
  },[])

  //Handler form
  const registerHandleForm = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    if(email === ""){
      setErrorMessage({type:"email",text:"Enter your email"})
    }else if(password === ""){
      setErrorMessage({type:"password",text:"Enter your password"})
    }else if(nickname === ""){
      setErrorMessage({type:"nickname",text:"Enter your nickname"})
    }else{
        try {
          const user = await createUserWithEmailAndPassword(auth,email,password)
          updateProfile(user.user,{
            displayName:nickname,
            photoURL:characterList[selectedCharacter].image
          }).then(() => nav("/"))
        } catch (error : any) {
            if(error.code === "auth/weak-password"){
            setErrorMessage({type:"serverError",text: "Password should be at least 6 characters"})
          }

          if(error.code === "auth/email-already-in-use"){
            setErrorMessage({type:"serverError",text: "The provided email is already in use by an existing user"})
          }
        }
    }
  }

  return (
    <>
      <Title>
        <TitleLink to="/">CzateX <IoChatbubblesSharp/></TitleLink>
      </Title>
      <Container>
        <RegisterTitle>Register </RegisterTitle>
      <RegisterForm onSubmit={registerHandleForm}>
        <RegisterLable>
          Email
          <RegisterInput type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
          {errorMessage.type ==="email" && <RegisterInputError>{errorMessage.text}</RegisterInputError>}
        </RegisterLable>
        <RegisterLable>
          Password
          <RegisterInput type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>
          {errorMessage.type ==="password" && <RegisterInputError>{errorMessage.text}</RegisterInputError>}
        </RegisterLable>
        <RegisterLable>
          Nickname
          <RegisterInput type="text" placeholder='Nickname' value={nickname} onChange={e => setNickname(e.target.value)}/>
          {errorMessage.type ==="nickname" && <RegisterInputError>{errorMessage.text}</RegisterInputError>}
        </RegisterLable>
        <SelectLable>Select your avatar</SelectLable>
        <SelectImageWrapper>
          <SelectArrowLeft whileHover={{
            scale:0.98,
            backgroundColor:"#eeeeee",
            cursor:"pointer"
          }}
          onClick={() => selectedCharacter > 0 ? setSelectedCharacter(prev => prev - 1): setSelectedCharacter(characterList.length - 1)}
          ><BsChevronLeft/></SelectArrowLeft>
            <SelectImage  src={characterList.length > 0 ? characterList[selectedCharacter].image : defCharacter} alt="characterImage" />
          <SelectArrowRight
          whileHover={{
            scale:0.98,
            backgroundColor:"#eeeeee",
            cursor:"pointer"
          }}
          onClick={() => selectedCharacter < characterList.length - 1 ? setSelectedCharacter(prev => prev + 1): setSelectedCharacter(0)}
          ><BsChevronRight/></SelectArrowRight>
        </SelectImageWrapper>
        {errorMessage.type === "serverError" && <RegisterInputError>{errorMessage.text}</RegisterInputError>} 
        <SubmitCharacter type="submit" >Register</SubmitCharacter>
      </RegisterForm>
    </Container>
    </>

  )
}

export default Register