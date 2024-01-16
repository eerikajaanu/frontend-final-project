import React, { useState, useEffect } from 'react';
import './App.css';
import { Link , Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Doctor from './components/Doctor';
import Petowner from './components/Petowner';

function App() {
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null); // Added to track user type (doctor or pet owner)

  // Function to handle login
  async function handleLogin(email, password) {
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const body = await response.json();

    if (body.token) {
      setToken(body.token);
      // Check user type based on the token
      const decodedToken = parseJWT(body.token);
      setUserType(decodedToken.role);
    }
  }

  // Function to handle logout
  function handleLogout() {
    setToken(null);
    setUserType(null);
  }

  // Function to parse JWT token and get user role
  function parseJWT(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

    return JSON.parse(jsonPayload);
  }

  // Use effect to fetch data when the component renders
  useEffect(() => {
    // Fetch data based on user type (doctor or pet owner)
    if (token && userType) {
      const fetchEndpoint = userType === 'doctor' ? '/doctor/data' : '/petowner/data'; // Replace with actual API endpoints

      fetch(`http://localhost:4000${fetchEndpoint}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Handle the data as needed
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [token, userType]);
  

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