import React from 'react';
import Navbar from "../components/Navbar";
import YearSelector from "../components/YearSelector";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button, TextField} from "@mui/material";
import userRepository from "../http/repositories/userRepository";
import TokenStorage from '../utils/tokenUtils'

const EnrollmentPage = () => {

    const [enrollment, setEnrollment] = React.useState([
        {id: 1, student_id: TokenStorage.getUserId(), year_of_study_id: 1},
        {id: 2, student_id: TokenStorage.getUserId(), year_of_study_id: 2},
    ]);
    const [year_of_study_id, setYear_of_study_id] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        let newEnrollment = enrollment.slice();
        let newId = enrollment.length + 1;
        newEnrollment.push({id: newId,student_id: TokenStorage.getUserId(), year_of_study_id: year_of_study_id});
        setEnrollment(newEnrollment);
    }

    return (
        <>
            <Navbar title='Enroll'/>
            <YearSelector onChange={(val)=>{console.log(val);setEnrollment(val.value)}}/>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">ID</TableCell>
                            <TableCell align="right">StudentID</TableCell>
                            <TableCell align="right">Year of Study ID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {enrollment.map((enroll) => (
                            <TableRow key={enroll}>
                                <TableCell align="right">{enroll.id}</TableCell>
                                <TableCell align="right">{enroll.student_id}</TableCell>
                                <TableCell align="right">{enroll.year_of_study_id}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <p>Enroll to a new year of study</p>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder={'Year ID'}
                    type="number"
                    value={year_of_study_id}
                    onChange={(e) => setYear_of_study_id(e.target.value)}
                />
                <p></p>
                <Button variant={'outlined'} type='submit'>Enroll</Button>
            </form>
        </>
    )
}
export default EnrollmentPage;