import React from "react";
import { Link , Routes, Route } from 'react-router-dom';
import Login from './Login';



const Home = ({ onLogin }) => {
    return (
    <>
    <div>
        <h1>
            Welcome to the Pet clinic!
            Public. 
        </h1>
        <h2>Please login</h2>
        <div className="text-beginnin">
            <button type="button" onClick={onLogin}>Login</button>
            <Link to ="login" className="btn btn-outline-light me-2">Login</Link>
            <Routes>
            <Route path="/login" element={<Login />}/>
            </Routes>        
        </div>        
    </div>
    </>
    )
}

export default Home;