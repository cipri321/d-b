import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navbar from "../components/Navbar";

const Grades = () => {
    const grades = [
        {'course':'oop', 'grade':10, 'id':1},
        {'course':'mpp', 'grade':2, 'id':2},
        {'course':'dsa', 'grade':3, 'id':3},
        {'course':'os', 'grade':5, 'id':4},
        {'course':'logica', 'grade':8, 'id':5}
    ]
    return (
        <>
            <Navbar title='Grades'/>

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
                        {grades.map((grade) => (
                            <TableRow
                                key={grade['id']}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="right">
                                    {grade['id']}
                                </TableCell>
                                <TableCell align="right">{grade['course']}</TableCell>
                                <TableCell align="right">{grade['grade']}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Grades;