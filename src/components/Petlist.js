import React, { useState, useEffect, Component } from "react";
import { Link , Routes, Route } from 'react-router-dom';
import Login from './Login';



const Petlist = (rest) => {
  const [pets, setPets] = useState([])
    useEffect(() => {
        if (rest.token) {
          fetch(`http://localhost:4000/pets`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${rest.token}`,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              setPets(data); 
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        }
      }, [rest.token]);
    return (
    <>
    <div>
           <h2>Pets:</h2>
           {pets.map }   
    </div>
    </>
    )
}

export default Petlist;