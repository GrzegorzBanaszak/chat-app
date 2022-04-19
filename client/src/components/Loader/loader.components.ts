import styled from "styled-components"
import { motion } from "framer-motion"
import { colors } from "../theme"

const LoaderContainer = styled.section`
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
`
const LoaderText = styled.h2`
    font-size:3rem;
    color:${colors.darkBlue};
    font-weight:600;
    display:flex ;
    align-items: end;
`

const LoaderBox = styled(motion.div)`
    width: 2rem;
    height: 2rem;
    display:flex ;
    align-items: end;
    justify-content:space-between ;
    padding-bottom:1rem;
    margin-left:0.2rem;
`

const LoaderBall = styled(motion.span)`
    display:block ;
    width:0.5rem ;
    height:0.5rem ;
    background-color:${colors.darkBlue} ;
    border-radius:50%;
`


export {LoaderBox,LoaderContainer,LoaderText,LoaderBall}