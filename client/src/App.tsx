import React, { useEffect, useState } from 'react';
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom';
import Home from './components/Home';
import Chat from './components/Chat';
import Test from './components/Test';
import Register from './components/Register';
import Login from './components/Login';
import {onAuthStateChanged } from 'firebase/auth';
import { auth } from './components/firebaseConfig';


function App() {
  const [user,setUser] = useState<any>(null)
  const [isLoading,setIsLoading] = useState<boolean>(true)

  onAuthStateChanged(auth,(currentUser) =>{
    setUser(currentUser)
    setIsLoading(false);
  })

  
  if(isLoading){
    return(
      <div>Loading...</div>
    )
  }

  if(!isLoading){
    return (
    <BrowserRouter>
        <Routes>
        <Route path='/' element={user ===null ? <Home/> : <Navigate to="/chat"/>}/>
        <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
        <Route path='/chat' element={user !== null? <Chat user={user}/> : <Navigate to="/"/>}/>
        {/* <Route path='/test' element={<Test/>}/> */}
        </Routes>
    </BrowserRouter>
  );
  }
  return(
      <div>Loading...</div>
    )
  
}

export default App;
