import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Chat from './components/Chat';
import Register from './components/Register';
import Login from './components/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './components/firebaseConfig';
import Loader from './components/Loader';


function App() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
    setIsLoading(false);
  })

  if (isLoading) {
    return (
      <Loader />
    )
  }

  if (!isLoading) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={user === null ? <Home /> : <Navigate to="/chat" />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/chat' element={user !== null ? <Chat user={user} /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    );
  }
  return (
    <Loader />
  )

}

export default App;
