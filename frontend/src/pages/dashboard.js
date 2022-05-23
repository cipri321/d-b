import React from 'react';
import {Box} from "@mui/material";
import Navbar from "../components/Navbar";
import Menu from '../components/Menu'

const Dashboard = (props) => {
    const [openMenu, setOpenMenu] = React.useState(false);
    const toggleOpenMenu = () => {
        console.log('toggle')
        setOpenMenu((prev)=>!prev)
    }
    return (
        <Box>
            <Navbar title='Dashboard' setOpenMenu={(val)=>toggleOpenMenu(val)}/>
        </Box>
    )
}
export default Dashboard;