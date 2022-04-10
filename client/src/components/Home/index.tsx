import React,{useState,useEffect, FC} from 'react'
import {charactersCol,usersCol} from "../firebaseConfig"
import defCharacter from "../../images/character.png"
import ICharacter from '../../interfaces/ICharacter'
import {BsChevronLeft,BsChevronRight} from "react-icons/bs"
import {Container,
  Title,
  LogoImage,
  SelectSection,
  SelectLable,
  SelectImage,
  SelectNameInput,
  SubmitCharacter,
SelectError,
SelectImageWrapper,
SelectArrowLeft,SelectArrowRight} from "./home.components"
import { addDoc, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'
import IUser from '../../interfaces/IUser'

interface IHomeProps{
  setUser:React.Dispatch<React.SetStateAction<IUser | null>>
}


const Home : FC<IHomeProps> = ({setUser}) => {
  //States
  const nav = useNavigate();
  const [nameCharacter,setNameCharacter] = useState<string>('')
  const [error,setError] = useState<boolean>(false);
  const [errorMessage,setErrorMessage] = useState<string>("");
  const [characterList,setCharactersList] = useState<ICharacter[]>([])
  const [selectedCharacter,setSelectedCharacter] = useState<number>(0)

  const getCharacters = async () =>{
      const charactersDocs = await getDocs(charactersCol) 
      const charactersData = charactersDocs.docs.map(charDoc =>{
        return charDoc.data();
      })
      setCharactersList(charactersData)
  }

  const userExist = async () =>{
    const usersDocs = await getDocs(usersCol)
    const ifExistAny = usersDocs.docs.find(userDoc => userDoc.data().name.toLowerCase() === nameCharacter.toLowerCase()) 
    if(ifExistAny !== undefined){
      setError(true)
      setErrorMessage("User exist select different name")
    }else{
      addUser({name:nameCharacter,image:characterList[selectedCharacter].image})
      nav('/chat')
    }
  }

  const addUser = async (user:IUser) =>{
    const newUser =  await addDoc(usersCol,user)
    setUser({...user,id:newUser.id})
    localStorage.setItem("user",JSON.stringify({...user,id:newUser.id}))
    
  }

  useEffect(() =>{

    getCharacters()
  },[])

  //Handler inputs

  const onSubmitChandler = (e:React.MouseEvent<HTMLAnchorElement>) =>{
    e.preventDefault();
    if(nameCharacter === ""){
      setError(true)
      setErrorMessage("Type character name")
    }else{
      userExist()
    }
  }
 
  return (
    <>
      <Title 
      initial={{scale:0}}
      animate={{scale:1}}>ChateX</Title>
      <Container>
      <LogoImage src='Logo.png' alt="logo"/>
      <SelectSection>
        <SelectLable>Select your character</SelectLable>
        <SelectImageWrapper>
          <SelectArrowLeft whileHover={{
            scale:0.98,
            backgroundColor:"#eeeeee",
            cursor:"pointer"
          }}
          onClick={() => selectedCharacter > 0 ? setSelectedCharacter(prev => prev - 1): setSelectedCharacter(characterList.length - 1)}
          ><BsChevronLeft/></SelectArrowLeft>
          <SelectImage src={characterList.length > 0 ? characterList[selectedCharacter].image : defCharacter} alt="characterImage" />
          <SelectArrowRight whileHover={{
            scale:0.98,
            backgroundColor:"#eeeeee",
            cursor:"pointer"
          }}
          onClick={() => selectedCharacter < characterList.length - 1 ? setSelectedCharacter(prev => prev + 1): setSelectedCharacter(0)}
          ><BsChevronRight/></SelectArrowRight>
        </SelectImageWrapper>
        <SelectNameInput type="text" placeholder='Type your nickname' onChange={e => setNameCharacter(e.target.value)}/>
        {error&& <SelectError>{errorMessage}</SelectError>}
        <SubmitCharacter onClick={onSubmitChandler}>Submit character</SubmitCharacter>
      </SelectSection>
    </Container>
    </>
  )
}

export default Home