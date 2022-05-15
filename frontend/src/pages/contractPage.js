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

const ContractPage = (props) => {
    const [selectedYear, setSelectedYear] = React.useState(0);
    const optionals = {
        0: [],
        1: [{id:1, name:'Virtual reality'}, {id:2, name:'bussiness intelligence'}],
        2: [{id:1, name:'optionaldrept1'}, {id:1, name:'optionaldrept2'}],
    }

    const options = [
        {value:0, label:''},
        {value:1, label: 'Facultatea de Matematica si Informatica - Anul 1'},
        {value:2, label: 'Facultatea de Drept - Anul 2'}
    ]

    const curriculum = {
        0:[],
        1:[{course:'Object Oriented Programming', credits:6},
            {course:'Operating Systems', credits:6},
            {course:'Data structures and algorithms', credits:6},
            {course:'Graph Algorithms', credits:6},
            {course:'Dynamic systems', credits:6},
        ],
        2: [{course:'Drept21', credits:10},
            {course:'Drepsadfat21', credits:10},
            {course:'Dreafasfwegwgwgwgwpt21', credits:10}
        ]
    }
    const [optionalOrder, setOptionalOrder] = React.useState([]);
    return (
        <>
            <Navbar title='Contract'/>

            <Box sx={{width:'50%', margin:'auto'}}>
                <Stack spacing={2}>
                    <Select options={options} onChange={(val)=>{
                        setSelectedYear(val.value)
                    }}/>



                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 400 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Course</TableCell>
                                    <TableCell align="right">Credits</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {curriculum[selectedYear].map((course) => (
                                    <TableRow
                                        key={course['course']}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="right">{course['course']}</TableCell>
                                        <TableCell align="right">{course['credits']}</TableCell>
                                    </TableRow>
                                ))}
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