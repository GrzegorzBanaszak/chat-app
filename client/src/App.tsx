import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import styled from 'styled-components'
import Chat from './components/Chat';

const Container = styled.div`
  width:100%;
  height:100vh;

`

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/chat' element={<Chat/>}/>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
