import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import Verify from './components/pages/auth/Verify';
import Home from './components/Home/Home';
import Header from './components/header/Header';
import Footer from './components/Footer/Footer';
import Profile from './components/pages/Profile/Profile';
import About from './components/pages/About/About';
const App = () => {
  return (
    <BrowserRouter>
     <Header />
      <Routes>   
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About/>} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
      <Footer />

    </BrowserRouter>
  );
}

export default App;
