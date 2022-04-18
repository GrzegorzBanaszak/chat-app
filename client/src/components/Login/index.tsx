import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebaseConfig'
import { Container, LoginInput, LoginLable, Title, TitleLink,LoginForm, SubmitLoginForm,LoginTitle, LoginInputError } from './login.components'
import {IoChatbubblesSharp} from "react-icons/io5"

const Login = () => {
  const nav = useNavigate()
  const [email,setEmail]= useState<string>("")
  const [password,setPassword]= useState<string>("")
  const [error,setError] = useState<string>("")

    const onLoginFormSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if(email !== "" && password !== ""){
      try {
        await signInWithEmailAndPassword(auth,email,password)
        nav("/")
      } catch (error:any) {
        if(error.code === "auth/wrong-password"){
          setError("The password provided is incorrect")
        }
        if(error.code === "auth/user-not-found"){
          setError("The user with this e-mail does not exist")
        }
      }
    }
  }

  return (
    <>
      <Title>
        <TitleLink to="/">CzateX <IoChatbubblesSharp/></TitleLink>
      </Title>
      <Container>
        <LoginTitle>Login</LoginTitle>
        <LoginForm onSubmit={onLoginFormSubmit}> 
          <LoginLable>
            Email
            <LoginInput type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
          </LoginLable>
          <LoginLable>
            Password
            <LoginInput type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>
          </LoginLable>
          {error && <LoginInputError>{error}</LoginInputError>}
          <SubmitLoginForm type="submit">Login</SubmitLoginForm>
        </LoginForm>
      </Container>
    </>
  )
}

export default Login