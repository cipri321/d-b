import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navbar from "../components/Navbar";
import {getStudentGrades} from "../http/api";
import YearSelector from "../components/YearSelector";

const Grades = () => {
    const [grades, setGrades] = React.useState([])
    const [selectedYear, setSelectedYear] = React.useState(0);

    React.useEffect(async ()=> {
        let gr = await getStudentGrades({year_of_study_id: selectedYear})
        setGrades(gr)
    }, [selectedYear])
    return (
        <>
            <Navbar title='Grades'/>
            <YearSelector onChange={(val)=>{console.log(val);setSelectedYear(val.value)}}/>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">ID</TableCell>
                            <TableCell align="right">Course</TableCell>
                            <TableCell align="right">Grade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(grades).map((name, idx) => (
                            <TableRow
                                key={name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="right">
                                    {idx+1}
                                </TableCell>
                                <TableCell align="right">{name}</TableCell>
                                <TableCell align="right">{grades[name]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Grades;