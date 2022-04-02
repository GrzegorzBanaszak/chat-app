import styled from "styled-components"
import { motion } from "framer-motion"


const UserBox = styled.div`
    display: flex;
    align-items: center;
    padding:0.7rem;
`
const UserImage = styled.img`
    width: 64px;
    height:64px;
    border-radius:50%;
`

const UserName = styled.h3`
    margin-left:1rem ;
    color: #fff;
    font-size:1.5rem;
`

export {UserBox,UserImage,UserName,}