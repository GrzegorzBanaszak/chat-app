import styled from "styled-components"
import { motion } from "framer-motion"
import { device } from "../brakepoints"
import { colors } from "../theme"

const Container = styled.div`
    width:100%;
    height:calc(100vh - 56px);
    display: flex;
    position: relative;
`

interface isViseble{
    show: boolean
}

const Users = styled.section<isViseble>`
    flex: 3;
    background-color: ${colors.mediumBlue} ;
    padding: 1rem 0.2rem;
    font-size:2rem ;
    position: absolute;
    height: 100%;
    transition: transform 0.4s ease-in;
    transform:${props => props.show ?"translateX(0)" : "translateX(-100%)"} ;
     @media ${device.tablet}{
        transition:none;
        transform:none;
        position: relative;
    }
`

const UsersTitle = styled.h2`
    color: white;
    text-align:center ;
`

const ChatMessages = styled.section`
    flex: 6;
`
const ChatMessagesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height:100%;
`
const ChatMessagesTop = styled.div`
    height: 90%;
    overflow-y: scroll;
    padding-right: 10px;
    padding:1rem;
`
const ChatMessagesBottom = styled.form`
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const MessagesInput = styled.input`
    width: 90%;
    padding:0.4rem;
    margin:0.5rem;
    height: 60px;
    font-size: 1.2rem;
    border:none ;
    border-radius: 5px;
    box-shadow: 0 0 2px #455a64;
    :focus{
        outline: none !important;
        box-shadow: 0 0 3px #455a64;
    }
`
const MessagesSubmit = styled.button`
    text-decoration:none;
    border:none ;
    background-color: #37474f;
    color: #eceff1;
    padding: 0.7rem 2rem;
    margin-right:1rem ;
    border-radius: 15px;
`

const Channels = styled.section<isViseble>`
    flex: 3;
    background-color:${colors.lightBlue} ;
    position:absolute;
    height: 100%;
    transition: transform 0.4s ease-in;
    transform:${props => props.show ?"translateX(0)" : "translateX(-100%)"} ;
     @media ${device.tablet}{
        transition:none;
        transform:none;
        position: relative;
    }
`

const ChannelsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height:100%;
`
export {ChannelsWrapper,MessagesSubmit,Container,Users,UsersTitle,ChatMessages,Channels,ChatMessagesWrapper,ChatMessagesTop,ChatMessagesBottom,MessagesInput}