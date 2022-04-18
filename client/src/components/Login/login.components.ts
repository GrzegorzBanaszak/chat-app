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


const LoginTitle = styled.h2`
    margin: 1rem 0 0 0.5rem;
    text-align:center;
    font-size:3rem;
`
const LoginForm = styled.form`
    display:flex;
    flex-direction:column ;
    align-items:center ;
    margin-top:5rem;
`

const LoginLable = styled.label`
    display:flex;
    flex-direction:column;
    margin: 1rem 0;
    font-size:1.2rem;
`
const LoginInput = styled.input`
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
const LoginInputError = styled.span`
    color:crimson ;
    margin-top:0.5rem;
    text-align:center;
    font-size:1.2rem ;
`

const SubmitLoginForm = styled.button`
    margin-top: 1.2rem;
    border:none ;
    background-color: #37474f;
    color: #eceff1;
    padding: 0.7rem 1rem;
    border-radius: 15px;
    font-size: 1.7rem;
    cursor: pointer;
`

export {Container,Title,TitleLink,LoginInput,LoginLable,LoginForm,SubmitLoginForm,LoginTitle,LoginInputError}