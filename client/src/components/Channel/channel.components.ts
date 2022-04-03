import styled from "styled-components"
import { motion } from "framer-motion"

const ChannelBox = styled.div`
    display: flex;
    margin:0.5rem ;
    padding: 0.5rem;
    align-items: center;
    border: 2px solid #ccc ;
    cursor: pointer;
`

const ChannelName = styled.h3`
    font-size:1.8rem ;
    margin-left:0.5rem ;
`
const ChannelUsers = styled.div`
    font-size:1.8rem ;
    display: flex;
`
interface IChannelQuantityProps {
    color: string
}

const ChannelQuantity = styled.p<IChannelQuantityProps>`
    display: flex ;
    justify-content:center;
    align-items: center;
    font-size:1.2rem;
    font-weight:600 ;
    width: 30px;
    height: 30px;
    border-radius:50%;
    background-color:${props => props.color};
    color: white;
`
export {ChannelQuantity,ChannelBox,ChannelName,ChannelUsers}

