import styled from "styled-components"
import { motion } from "framer-motion"


const UserBox = styled(motion.div)`
    display: flex;
    align-items: center;
    margin:0.7rem;
    border-radius:64px;
    background-color:white ;
    padding:0.4rem 0;
`
const UserImage = styled.img`
    width: 64px;
    height:64px;
    border-radius:50%;
    margin-left:1rem;
`

const UserName = styled.h3`
    margin-left:1rem ;
    color: black;
    font-size:1.8rem;
`

export {UserBox,UserImage,UserName,}