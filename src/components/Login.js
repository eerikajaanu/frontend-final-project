import { replace } from "formik";
import React, { useState, useEffect, Component } from "react";
import { Navigate } from "react-router-dom";

const Login = ({ component: Component, authenticated, ...rest}) => {
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
  
    // UI to show login form, user type-specific UI, and logout button
    return (
      <>
        {!token ? (
          <div>
            <h1>Login</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.email.value;
                const password = e.target.password.value;
                handleLogin(email, password);
              }}
            >
              <label>Email:</label>
              <input type="text" name="email" required />
              <label>Password:</label>
              <input type="password" name="password" required />
              <button type="submit">Login</button>
            </form>
          </div>
        ) : (
          <div>
            {userType === 'doctor' ? (
              <h1>Doctor Dashboard</h1>
            ) : (
              <h1>Pet Owner Dashboard</h1>
            )}
            {/* Display specific content based on user type */}
            {/* Replace the following placeholder content with your actual UI components */}
            {userType === 'doctor' ? (
              <p>Doctor-specific content goes here.</p>
            ) : (
              <p>Pet Owner-specific content goes here.</p>
            )}
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </>
    );
   };
  
  export default Login;

  /*
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    return isAuthenticated ? <Component {...rest} /> : <Navigate to='/login' replace />;
  
  */