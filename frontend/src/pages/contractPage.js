import React from 'react';
import Navbar from "../components/Navbar";
import Select from 'react-select'
import {Box, Stack} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import OptionalChooser from "../components/optionalChooser";
import YearSelector from "../components/YearSelector";
import {getCurriculum} from "../http/api";

const ContractPage = (props) => {
    const [selectedYear, setSelectedYear] = React.useState(0);
    const optionals = {
        0: [],
        1: [{id:1, name:'Virtual reality'}, {id:2, name:'bussiness intelligence'}],
        2: [{id:1, name:'optionaldrept1'}, {id:1, name:'optionaldrept2'}],
    }

    const [curriculum, setCurriculum] = React.useState([])

    React.useEffect(async ()=> {
        if (selectedYear !== 0) {
            let cur = await getCurriculum({year_of_study_id:selectedYear})
            setCurriculum(cur)
        }
    }, [selectedYear])

    const [optionalOrder, setOptionalOrder] = React.useState([]);
    return (
        <>
            <Navbar title='Contract'/>

            <Box sx={{width:'50%', margin:'auto'}}>
                <YearSelector onChange={(val)=>{console.log(val);setSelectedYear(val.value)}}/>
                <Stack>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 400 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Course</TableCell>
                                    <TableCell align="right">Credits</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {curriculum && curriculum.map((course, idx) =>
                                    {
                                        console.log(course)
                                        return (
                                            <TableRow
                                            key={idx}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="right">{course.fields.name}</TableCell>
                                            <TableCell align="right">6</TableCell>
                                        </TableRow>)
                                    }

                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <OptionalChooser optionals={optionals} setOrder={(val)=>setOptionalOrder(val)}/>
                </Stack>
            </Box>


        </>
    )
}
export default ContractPage;