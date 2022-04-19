import styled from "styled-components"


interface IsOwn{
    userMessage:boolean,
}

const MessageBox = styled.div<IsOwn>`
    display: flex;
    align-items:${props => props.userMessage ? "end":"start"};
    flex-direction:column;
`

const MessageBottom = styled.div<IsOwn>`
    display: flex;
    margin-top:0.3rem ;
    flex-direction:${props => props.userMessage ? "row":"row-reverse"};
`

const MessageUserName = styled.h4`
    font-weight: 400;
    font-size:1.2rem ;
    color:#616161 ;
    margin:0.2rem 0.5rem;
`

const MessageText = styled.p<IsOwn>`
    background-color: ${props => props.userMessage ? "#e0e0e0":"#1976d2"};
    color:${props => props.userMessage ? "black":"white"};
    padding:1rem;
    border-radius: 15px;
    margin-left:${props => props.userMessage ? "0":"60px"};
    margin-right:${props => props.userMessage ? "60px":"0"};
    max-width:60% ;

`

const MessageImage = styled.img`
    height: 60px;
    width: 60px;
    border-radius:50%;
    border:1px solid #b2dfdb;
`
export {MessageBox,MessageBottom,MessageUserName,MessageText,MessageImage}