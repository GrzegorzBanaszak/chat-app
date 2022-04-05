import React,{useState,useEffect, FC} from 'react'
import {charactersCol,usersCol} from "../firebaseConfig"
import defCharacter from "../../images/character.png"
import ICharacter from '../../interfaces/ICharacter'
import {Container,
  Title,
  LogoImage,
  SelectSection,
  SelectLable,
  SelectCharacter,
  SelectOption,
  SelectImage,
  SelectNameInput,
  SubmitCharacter,
SelectError} from "./home.components"
import { addDoc, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'
import IUser from '../../interfaces/IUser'

interface IHomeProps{
  setUser:React.Dispatch<React.SetStateAction<IUser | null>>
}


const Home : FC<IHomeProps> = ({setUser}) => {
  //States
  const nav = useNavigate();
  const [imageCharacter,setImageCharacter] = useState<string>(defCharacter)
  const [nameCharacter,setNameCharacter] = useState<string>('')
  const [error,setError] = useState<boolean>(false);
  const [errorMessage,setErrorMessage] = useState<string>("");
  const [characterList,setCharactersList] = useState<ICharacter[]>([])


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
      setUser({name:nameCharacter,image:imageCharacter})
      addUser({name:nameCharacter,image:imageCharacter})
      nav('chat')
    }
  }

  const addUser = async (user:IUser) =>{
    await addDoc(usersCol,user)
  }

  useEffect(() =>{

    getCharacters()
  },[])

  //Handler inputs

  const characterChangeChandler = (e:React.ChangeEvent<HTMLSelectElement>)=>{
    const newImage = characterList.find(x => x.name === e.target.value)
    if (newImage !== undefined){
      setImageCharacter(newImage.image)
    }
  }


  const onSubmitChandler = (e:React.MouseEvent<HTMLAnchorElement>) =>{
    e.preventDefault();
    if(nameCharacter === ""){
      setError(true)
      setErrorMessage("Type character name")
    }else if(imageCharacter === defCharacter){
      setError(true)
      setErrorMessage("Select character")
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
      <SelectSection onChange={characterChangeChandler}>
        <SelectLable>Select your character</SelectLable>
        <SelectCharacter>
          {characterList.map(item => (<SelectOption key={item.name} value={item.name}>{item.name}</SelectOption>))}
        </SelectCharacter>
        <SelectImage src={imageCharacter} alt="characterImage" />
        <SelectNameInput type="text" placeholder='Type your nickname' onChange={e => setNameCharacter(e.target.value)}/>
        {error&& <SelectError>{errorMessage}</SelectError>}
        <SubmitCharacter onClick={onSubmitChandler}>Submit character</SubmitCharacter>
      </SelectSection>
    </Container>
    </>
  )
}

export default Home