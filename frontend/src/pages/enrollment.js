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
import {Button} from "@mui/material";

const EnrollmentPage = () => {
    const [enrollment, setEnrollment] = React.useState([
        {id: 1, student_id: 1, year_of_study_id: 1},
        {id: 2, student_id: 2, year_of_study_id: 1},
        {id: 3, student_id: 3, year_of_study_id: 2}
    ]);
    const [student_id, setStudent_id] = React.useState('');
    const [year_of_study_id, SetYear_of_study_id] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        let newEnrollment = enrollment.slice();
        let newId = enrollment.length + 1;
        newEnrollment.push({id: newId,student_id: student_id, year_of_study_id: year_of_study_id});
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
            {/*<p>Propose new optional:</p>*/}
            {/*<form onSubmit={handleSubmit}>*/}
            {/*    <input*/}
            {/*        placeholder={'Name'}*/}
            {/*        type="text"*/}
            {/*        value={name}*/}
            {/*        onChange={(e) => setName(e.target.value)}*/}
            {/*    />*/}
            {/*    <input*/}
            {/*        placeholder={'Credits'}*/}
            {/*        type="number"*/}
            {/*        value={credits}*/}
            {/*        onChange={(e) => setCredits(e.target.value)}*/}
            {/*    />*/}
            {/*    <input*/}
            {/*        placeholder={'Year ID'}*/}
            {/*        type="number"*/}
            {/*        value={yearID}*/}
            {/*        onChange={(e) => setYearID(e.target.value)}*/}
            {/*    />*/}
            {/*    <p></p>*/}
            {/*    <Button variant={'outlined'} type='submit'>Add</Button>*/}
            {/*</form>*/}
        </>
    )
}
export default EnrollmentPage;