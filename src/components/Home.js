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
    </div>
    </>
    )
}

export default Home;