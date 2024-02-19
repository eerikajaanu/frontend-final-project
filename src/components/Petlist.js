import React, { useState, useEffect } from "react";
import { Link , Routes, Route } from 'react-router-dom';
import Login from './Login';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PetInfo from "./PetInfo";


const Petlist = (props) => {
  const [pets, setPets] = useState([]);
  const [alive, setAlive] = useState(false);

    useEffect(() => {
        if (props.token) {
          fetch(`http://localhost:4000/pets`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${props.token}`,
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
      }, [props.token]);

    const checkbox = () => {
      setAlive(!alive);
    }

    const isAlive = alive ? pets.filter(pet => pet.status === "alive") : pets;
     
    return (
    <>
    <h2>Pets:</h2>
    <input type="checkbox" checked={alive} onChange={checkbox}/>
    
    <TableContainer component={Paper}>
                <Table  sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead className='otsikko'>
                    <TableRow>
                        <TableCell><b>Petname</b></TableCell>
                        <TableCell align="left"><b>Owner Id</b></TableCell>
                        <TableCell align="left"><b>Type</b></TableCell>
                        <TableCell align="left"><b>Status</b></TableCell>
                        <TableCell align="left"><b>Last visit</b></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {isAlive.map((pet) => (
                        <TableRow key={pet.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        > 
                        <TableCell component="th" scope="pets"><Link to={`/PetInfo`}>{pet.name}</Link></TableCell>
                        <TableCell align="left">{pet.ownerId}</TableCell>
                        <TableCell align="left">{pet.petType}</TableCell>
                        <TableCell align="left">{pet.status}</TableCell>
                        <TableCell align="left">{pet.dob}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
    <Routes>
      <Route path='/PetInfo' element={<PetInfo />}/>
    </Routes>
    </>
    )
}

export default Petlist;