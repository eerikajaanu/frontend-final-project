import React, { useState } from 'react';
import './App.css';
import { Link , Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import { Register } from './components/Register';

const App = () =>{
  return (
    <div className='app'>
      <header className="p-3 text-bg-dark">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><Link to="/" className="nav-link px-2 text-white">Home</Link></li>
          </ul>

        <div className="text-end">
          <Link to ="login" className="btn btn-outline-light me-2">Login</Link>
        </div>
      </div>
    </div>
  </header>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path="/login" element={<Login />}/>
    </Routes>
    </div>
  );
};

export default App;





/*
import Nav from "./Navbar"

const App = () => {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="booking" element={ <BookingPage/> } />
        <Route path="calendar" element={ <CalendarPage/> } />
      </Routes>
      
    </div>
  )
}
 */