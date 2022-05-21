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

const OptionalsPage = () =>{
    const [selectedYear, setSelectedYear] = React.useState(0);
    const [optionals, setOptionals] = React.useState([
        {id: 1, name: 'VR', credits: 4},
        {id: 2, name: 'Cryptography', credits: 4},
        {id: 3, name: 'Blockchain', credits: 7},
        {id: 4, name: 'Murder Cases', credits: 3}
    ]);
    const [name, setName] = React.useState('');
    const [credits, setCredits] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        let newOptionals = optionals.slice();
        let newId = 0;
        optionals.map(
            (opt) => {
                if(opt.id > newId){
                    newId = opt.id;
                }
            }
        )
        newOptionals.push({id: newId + 1,name: name, credits: credits});
        setOptionals(newOptionals);
    }
    return (
        <>
            <Navbar title='Optionals'/>
            <YearSelector onChange={(val)=>{console.log(val);setSelectedYear(val.value)}}/>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">ID</TableCell>
                            <TableCell align="right">Optional</TableCell>
                            <TableCell align="right">Credits</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {optionals.map((opt) => (
                            <TableRow key={opt}>
                                <TableCell align="right">{opt.id}</TableCell>
                                <TableCell align="right">{opt.name}</TableCell>
                                <TableCell align="right">{opt.credits}</TableCell>
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
                <p></p>
                <Button variant={'outlined'} type='submit'>Add</Button>
            </form>
        </>
    )
}
export default OptionalsPage;