import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import styled from 'styled-components'

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
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
