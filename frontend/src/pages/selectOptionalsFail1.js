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

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";


const SelectOptionalsPage = () => {
    const [selectedYear, setSelectedYear] = React.useState(0);
    const [optionals, setOptionals] = React.useState([
        {id: 1, name: 'VR', credits: 4, yearID: 1},
        {id: 2, name: 'Cryptography', credits: 4, yearID: 1},
        {id: 3, name: 'Blockchain', credits: 7, yearID: 1},
        {id: 4, name: 'Murder Cases', credits: 3, yearID: 2}
    ]);
    return(
        <>
            <Navbar title=' Add Optionals'/>
            <YearSelector onChange={(val)=>{console.log(val);setSelectedYear(val.value)}}/>
            <DragDropContext>
                <TableContainer component={Paper}>

                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right">ID</TableCell>
                                <TableCell align="right">Optional</TableCell>
                                <TableCell align="right">Credits</TableCell>
                                <TableCell align="right">Year ID</TableCell>
                            </TableRow>
                        </TableHead>
                        <Droppable droppableId = "tbody">
                            {(provided) =>(
                                <TableBody ref={provided.innerRef} {...provided.droppableProps} className = "text">
                                    {optionals.map((opt) => (
                                        <Draggable draggableId = {opt.id} >
                                            {(provided) => (
                                                <TableRow key={opt} ref={provided.innerRef} {...provided.draggableProps}>
                                                    <TableCell ref={provided.innerRef} {...provided.dragHandleProps} align="right" >[][][]</TableCell>
                                                    <TableCell align="right">{opt.id}</TableCell>
                                                    <TableCell align="right">{opt.name}</TableCell>
                                                    <TableCell align="right">{opt.credits}</TableCell>
                                                    <TableCell align="right">{opt.yearID}</TableCell>
                                                </TableRow>
                                            )}
                                        </Draggable>
                                    ))}
                                </TableBody>
                            )}
                        </Droppable>
                    </Table>

                </TableContainer>
            </DragDropContext>
        </>
    )

}

export default SelectOptionalsPage;