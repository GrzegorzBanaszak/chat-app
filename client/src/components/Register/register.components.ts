import styled from "styled-components"
import { motion } from "framer-motion"
import {Link} from "react-router-dom"

const Container = styled.section`
    height:calc(100vh - 90px);
    max-width:1200px;
    margin: 0 auto;
`
const Title = styled(motion.header)`
    text-align:center ;
    padding: 1rem 0;
    background-color:#1a237e ;
`

const TitleLink = styled(Link)`
    color: white;
    font-size:3rem;
    text-decoration: none;
    font-weight:600;
`

const LogoImage = styled.img`
    margin-top: 1rem;
    display:block ;
    width:100%;
    max-width:600px;
    margin: 0 auto;
`
const RegisterForm = styled.form`
    display:flex;
    flex-direction:column ;
    align-items:center ;
`

const RegisterLable = styled.label`
    display:flex;
    flex-direction:column;
    margin: 1rem 0;
    font-size:1.2rem;
`
const RegisterInput = styled.input`
    border: none;
    border-bottom: 2px solid #ccc;
    border-radius: 10px;
    padding:0.5rem;
    font-size:1.2rem;
    text-align:center ;
    margin-top:0.5rem;
    :focus{
        outline: none !important;
        box-shadow: 0 0 10px #455a64;
    }
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

const SelectImageWrapper = styled(motion.div)`
    position:relative ;
    padding: 0.7rem 0;
    margin: 0.5rem 0;
`

const SelectArrowLeft = styled(motion.div)`
    position:absolute;
    top:0;
    left:-50px;
    height:100%;
    display:flex;
    align-items:center;
    font-size:3rem;
    background-color:#fafafa ;
`
const SelectArrowRight = styled(motion.div)`
    position:absolute;
    top:0;
    right:-50px;
    height:100%;
    display:flex;
    align-items:center;
    font-size:3rem;
    background-color:#fafafa ;
`
const SelectImage = styled(motion.img)`
    margin-top:1rem;
    margin-bottom:0.5rem;
    width: 200px;
    height:200px;
    border-radius: 50%;
`


const RegisterInputError = styled.span`
    color:crimson ;
    margin-top:0.5rem;
    text-align:center;
`

const SubmitCharacter = styled.button`
    margin-top: 1.2rem;
    border:none ;
    background-color: #37474f;
    color: #eceff1;
    padding: 0.7rem 1rem;
    border-radius: 15px;
    font-size: 1.7rem;
    cursor: pointer;
`

export  {TitleLink,RegisterLable,RegisterInput,SelectArrowLeft,SelectArrowRight,SelectImageWrapper,RegisterInputError,Container,Title,LogoImage,RegisterForm,SelectLable,SelectCharacter,SelectOption,SelectImage,SubmitCharacter}