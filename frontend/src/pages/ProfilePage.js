import React from 'react';
import {Box} from "@mui/material";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";

const ProfilePage = (props) => {
    return (
        <Box>
            <Navbar title='Profile'/>
            <Profile/>
        </Box>
    )
}
export default ProfilePage;