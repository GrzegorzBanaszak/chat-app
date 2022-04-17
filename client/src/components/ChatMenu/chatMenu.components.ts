import styled from "styled-components"
import { motion } from "framer-motion"
import { device } from "../brakepoints"
import { Link } from "react-router-dom"


const MenuContanier = styled.div`
    display: flex;
    justify-content:center ;
    gap:0.5rem;
`

const MenuButton = styled.div`
    background-color: white;
    padding:0.5rem 1rem ;
    display: flex ;
    align-items:center ;
    justify-content: center;
    border-radius:10px ;
`

const MenuLink = styled(Link)`
    background-color: white;
    padding:0.5rem 1rem ;
    display: flex ;
    align-items:center ;
    justify-content: center;
    border-radius:10px ;

`
export {MenuContanier,MenuButton,MenuLink}