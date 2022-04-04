import React,{useState,useEffect} from 'react'
import {storage} from "../firebaseConfig"
import { getDownloadURL, ref } from 'firebase/storage';
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
  SubmitCharacter} from "./home.components"
import { async } from '@firebase/util';


const defCharctersList : ICharacter[] = [
  {
    name:"boomer",
    image:"boomer.png"
  },
  {
    name:"wojak",
    image:"wojak.jpg"
  }
] 


const Home = () => {
  const [imageCharacter,setImageCharacter] = useState<string>(defCharacter)
  const [nameCharacter,setNameCharacter] = useState<string>('')
  const [characterList,setCharactersList] = useState<ICharacter[]>([])

  useEffect(() =>{
    const getCharacter = () =>{
    defCharctersList.forEach(async (char) =>{
        const imgRef = ref(storage,char.image)
        const imgUrl = await getDownloadURL(imgRef)
        const newCharacter: ICharacter ={
          name:char.name,
          image:imgUrl
        }
        setCharactersList(prev => [...prev,newCharacter])
    })
  }
    getCharacter()
    
  },[])

  const characterChangeChandler = (e:React.ChangeEvent<HTMLSelectElement>)=>{
    const newImage = defCharctersList.find(x => x.name === e.target.value)
    if (newImage !== undefined){
      setImageCharacter(require(`../../images/${newImage.image}`))
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
        <SubmitCharacter to="/chat">Submit character</SubmitCharacter>
      </SelectSection>
    </Container>
    </>
  )
}

export default Home