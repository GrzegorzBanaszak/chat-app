import styled from "styled-components"
import { motion } from "framer-motion"
import {Link} from "react-router-dom"

const Container = styled.section`
    height:calc(100vh - 90px);
    max-width:1200px;
    margin: 0 auto;
`
const Title = styled(motion.h1)`
    text-align:center ;
    padding: 1rem 0;
    font-size:3rem ;
    background-color:#1a237e ;
    color: white;
`

const LogoImage = styled.img`
    margin-top: 1rem;
    display:block ;
    width:100%;
    max-width:600px;
    margin: 0 auto;
`
const SelectSection = styled.section`
    display:flex;
    flex-direction:column ;
    align-items:center ;
`

const SelectLable = styled.h3`
    margin: 0.5rem 0;
    font-size:1.7rem ;
`

const SelectCharacter = styled.select`
    margin:0.5rem 0;
    padding: 0.6rem;
    width: 240px;
    border: none;
    border-radius:10px;
    text-align:center;
    font-size:1.2rem;
    background-color:#546e7a ;
    color:#eceff1 ;
`
const SelectOption = styled(motion.option)`
    text-align:center;
`

const SelectImage = styled(motion.img)`
    margin:1.2rem 0;
    width: 200px;
    height:200px;
    border-radius: 50%;
`

const SelectNameInput = styled.input`
    border: none;
    border-bottom: 2px solid #ccc;
    border-radius: 10px;
    padding:0.5rem;
    font-size:1.2rem;
    text-align:center ;
    :focus{
        outline: none !important;
        box-shadow: 0 0 10px #455a64;
    }
`

const SubmitCharacter = styled(Link)`
    margin-top: 1.2rem;
    text-decoration:none;
    background-color: #37474f;
    color: #eceff1;
    padding: 0.7rem 1rem;
    border-radius: 15px;
`

export  {Container,Title,LogoImage,SelectSection,SelectLable,SelectCharacter,SelectOption,SelectImage,SelectNameInput,SubmitCharacter}