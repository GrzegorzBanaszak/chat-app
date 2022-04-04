import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import Chat from './components/Chat';
import Test from './components/Test';



function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/test' element={<Test/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
