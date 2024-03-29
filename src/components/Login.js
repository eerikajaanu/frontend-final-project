import React, { useState, useEffect, Component } from "react";
import { Navigate } from "react-router-dom";

const Login = ({ component: Component, authenticated, ...props}) => {
    async function handleLogin(email, password) {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const body = await response.json();

      
  
      if (body.access_token) {
        props.setToken(body.access_token);
        // Check user type based on the token
        const userType = body.id === 0 ? 'doctor' : 'petowner';
        props.setUserType(userType);
      }
    }
  
    // Function to handle logout
    function handleLogout() {
      props.setToken(null);
      props.setUserType(null);
    }
  
    return (
      <>
        {!props.token ? (
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
            <>
                <Navigate to="/petlist" replace />
            </>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </>
    );
   };
  
  export default Login;