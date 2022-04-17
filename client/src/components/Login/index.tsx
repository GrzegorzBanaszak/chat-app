import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebaseConfig'
import { Container, LoginInput, LoginLable, Title, TitleLink,LoginForm, SubmitLoginForm } from './login.components'

const Login = () => {
  const nav = useNavigate()
  const [email,setEmail]= useState<string>("")
  const [password,setPassword]= useState<string>("")

  const onLoginFormSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if(email !== "" && password !== ""){
      try {
        await signInWithEmailAndPassword(auth,email,password)
        nav("/")
      } catch (error:any) {
        console.log(error.message)
      }
    }
  }

  return (
    <>
      <Title>
        <TitleLink to="/">CzateX</TitleLink>
      </Title>
      <Container>
        <LoginForm onSubmit={onLoginFormSubmit}> 
          <LoginLable>
            Email
            <LoginInput type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
          </LoginLable>
          <LoginLable>
            Password
            <LoginInput type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>
          </LoginLable>
          <SubmitLoginForm type="submit">Login</SubmitLoginForm>
        </LoginForm>
      </Container>
    </>
  )
}

export default Login