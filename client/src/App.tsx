import React, { useEffect, useState } from 'react';
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom';
import Home from './components/Home';
import Chat from './components/Chat';
import Test from './components/Test';
import IUser from './interfaces/IUser';



function App() {
  const [user,setUser] = useState<IUser| null>(null)

  useEffect(() =>{
    const userStorage = localStorage.getItem("user")
    if(userStorage !== null){
      setUser(JSON.parse(userStorage))
    }
  },[])

  return (
    <BrowserRouter>
        <Routes>
        <Route path='/' element={user !== null?<Navigate replace to="/chat"/>:<Home setUser={setUser}/>}/>
        <Route path='/chat' element={user === null ?<Navigate replace to="/"/> : <Chat user={user}/>}/>
        <Route path='/test' element={<Test/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
