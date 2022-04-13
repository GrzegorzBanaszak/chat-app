import React from 'react'
import { Container, LoginInput, LoginLable, Title, TitleLink,LoginForm, SubmitLoginForm } from './login.components'

const Login = () => {
  return (
    <>
      <Title>
        <TitleLink to="/">CzateX</TitleLink>
      </Title>
      <Container>
        <LoginForm>
          <LoginLable>
            Email
            <LoginInput type="email" placeholder='Email'/>
          </LoginLable>
          <LoginLable>
            Password
            <LoginInput type="password" placeholder='Password'/>
          </LoginLable>
          <SubmitLoginForm type="submit">Login</SubmitLoginForm>
        </LoginForm>
      </Container>
    </>
  )
}

export default Login