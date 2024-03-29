import React, { useState, useEffect } from 'react';
import './App.css';
import { Link , Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Calendar from './components/Calendar';
import Booking from './components/Booking';
import Petlist from './components/Petlist';


function App() {
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null);
  return (
    <div className='app'>
      <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><Link to="/" className="nav-link px-2 text-white">Home</Link></li>
            <li><Link to="/booking" className="nav-link px-2 text-white">Booking</Link></li>
            <li><Link to="/calendar" className="nav-link px-2 text-white">Calendar</Link></li>
            <li><Link to="/petlist" className="nav-link px-2 text-white">Petlist</Link></li>
            </ul>

          <div className="text-end">
            <Link to ="login" className="btn btn-outline-light me-2">Login</Link>
          </div>
        </div>
      </div>
    </header> 
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/booking' element={<Booking token={token} setToken={setToken} userType={userType} setUserType={setUserType}/>}/>
      <Route path='/calendar' element={<Calendar token={token} setToken={setToken} userType={userType} setUserType={setUserType}/>}/>
      <Route path="/petlist" element={<Petlist token={token} setToken={setToken} userType={userType} setUserType={setUserType}/>}/>
      <Route path="/login" element={<Login token={token} setToken={setToken} userType={userType} setUserType={setUserType}/>}/>
    </Routes>
    </div>

  );
};

export default App;