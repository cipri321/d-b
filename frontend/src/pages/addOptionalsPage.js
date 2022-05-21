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

const AddOptionalsPage = () =>{
    const [selectedYear, setSelectedYear] = React.useState(0);
    const [optionals, setOptionals] = React.useState([
        {id: 1, name: 'VR', credits: 4, yearID: 1},
        {id: 2, name: 'Cryptography', credits: 4, yearID: 1},
        {id: 3, name: 'Blockchain', credits: 7, yearID: 1},
        {id: 4, name: 'Murder Cases', credits: 3, yearID: 2}
    ]);
    const [name, setName] = React.useState('');
    const [credits, setCredits] = React.useState('');
    const [yearID, setYearID] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        let newOptionals = optionals.slice();
        let newId = optionals.length + 1;
        newOptionals.push({id: newId,name: name, credits: credits, yearID: yearID});
        setOptionals(newOptionals);
    }
    return (
        <>
            <Navbar title=' Add Optionals'/>
            <YearSelector onChange={(val)=>{console.log(val);setSelectedYear(val.value)}}/>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">ID</TableCell>
                            <TableCell align="right">Optional</TableCell>
                            <TableCell align="right">Credits</TableCell>
                            <TableCell align="right">Year ID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {optionals.map((opt) => (
                            <TableRow key={opt}>
                                <TableCell align="right">{opt.id}</TableCell>
                                <TableCell align="right">{opt.name}</TableCell>
                                <TableCell align="right">{opt.credits}</TableCell>
                                <TableCell align="right">{opt.yearID}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <p>Propose new optional:</p>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder={'Name'}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    placeholder={'Credits'}
                    type="number"
                    value={credits}
                    onChange={(e) => setCredits(e.target.value)}
                />
                <input
                    placeholder={'Year ID'}
                    type="number"
                    value={yearID}
                    onChange={(e) => setYearID(e.target.value)}
                />
                <p></p>
                <Button variant={'outlined'} type='submit'>Add</Button>
            </form>
        </>
    )
}
export default AddOptionalsPage;