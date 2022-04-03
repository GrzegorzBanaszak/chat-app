import styled from "styled-components"
import { device } from "../brakepoints"


const NavContainer = styled.nav`
    background-color:#1a237e ;
    color: white;
    padding:0.7rem;
`
const NavWrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media ${device.tablet}{
        justify-content:center ;
    }
`

const NavToggle = styled.span`
    font-size:1.8rem ;
    @media ${device.tablet}{
        display:none ;
    }
`
const NavLogo = styled.h2`
    font-size:1.8rem ;
`

export {NavContainer,NavLogo,NavToggle,NavWrapper}