import styled from "styled-components"
import { Link } from "react-router-dom"


const MenuContanier = styled.div`
    display: flex;
    justify-content:center ;
    gap:0.5rem;
    margin-bottom:1rem;
`

const MenuButton = styled.div`
    background-color: white;
    padding:0.5rem 1rem ;
    display: flex ;
    align-items:center ;
    justify-content: center;
    border-radius:10px ;
    font-weight:500 ;
    cursor: pointer;
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