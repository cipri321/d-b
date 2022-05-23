import React from 'react';
import Navbar from "../components/Navbar";
import YearSelector from "../components/YearSelector";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {Button} from "@mui/material";

import { IconName } from "react-icons/fa";


const SelectOptionalsPage = () => {
    const [selectedYear, setSelectedYear] = React.useState(0);
    const [optionals, setOptionals] = React.useState([
        {id: 5, name: 'VR', credits: 4, yearID: 1},
        {id: 2, name: 'Cryptography', credits: 4, yearID: 1},
        {id: 7, name: 'Blockchain', credits: 7, yearID: 1},
        {id: 1, name: 'Murder Cases', credits: 3, yearID: 2}
    ]);

    function moveUp(opt){
        let index = optionals.findIndex(x => x.id === opt.id)
        if(index > 0){
            let newOptionals = optionals.slice();
            let aux = newOptionals[index];
            newOptionals[index] = newOptionals[index-1];
            newOptionals[index-1] = aux;
            setOptionals(newOptionals);
        }
        console.log(index);
        console.log(optionals);
    }

    function moveDown(opt){
        let index = optionals.findIndex(o => o.id === opt.id)
        if(index < optionals.length - 1){
            let newOptionals = optionals.slice();
            let aux = newOptionals[index];
            newOptionals[index] = newOptionals[index+1];
            newOptionals[index + 1] = aux;
            setOptionals(newOptionals);
        }
        console.log(optionals.length);
        console.log(index);
        console.log(optionals);
    }
    return(
        <>
            <Navbar title='Select Optionals'/>
            <YearSelector onChange={(val)=>{console.log(val);setSelectedYear(val.value)}}/>
            <TableContainer component={Paper}>

                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">ID</TableCell>
                            <TableCell align="right">Optional</TableCell>
                            <TableCell align="right">Credits</TableCell>
                            <TableCell align="right">Year ID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className = "text">
                        {optionals.map((opt) => (
                            <TableRow key={opt}>
                                <TableCell align="right"><button onClick = {() => moveUp(opt)}>^^^</button></TableCell>
                                <TableCell align="right"><button  onClick = {() => moveDown(opt)}>...</button></TableCell>
                                <TableCell align="right">{opt.id}</TableCell>
                                <TableCell align="right">{opt.name}</TableCell>
                                <TableCell align="right">{opt.credits}</TableCell>
                                <TableCell align="right">{opt.yearID}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>
        </>
    )

}

export default SelectOptionalsPage;