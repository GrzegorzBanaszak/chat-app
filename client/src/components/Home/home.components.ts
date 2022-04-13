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

const LinkBox = styled.div`
    display:flex;
    flex-direction:column ;
    margin-top:5rem;
`

const LinkMotion = styled(motion.div)`
    background-color: #1a237e;
    padding: 1rem;
    text-align:center;
    margin:1rem 3rem;
    color: white;
    font-weight:500;
    font-size:1.4rem;
    border-radius:10px;
`


const LinkElement = styled(Link)`
    text-decoration:none;
`

export{Container,Title,LogoImage,LinkElement,LinkBox,LinkMotion}