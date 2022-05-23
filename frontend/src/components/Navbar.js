import React from 'react';
import {
    AppBar,
    Box,
    FormControlLabel,
    FormGroup,
    IconButton, Menu,
    MenuItem,
    Switch,
    Toolbar,
    Typography
} from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import TokenUtils from "../utils/tokenUtils";
import userRepository from "../http/repositories/userRepository";


const Navbar = (props) => {

    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        userRepository.logout();
    }

    const handleProfile = () => {
        window.location = '/profile'
    }
    const handleGrades = () => {
        window.location = '/grades'
    }

    const handleContract = () => {
        window.location = '/contract'
    }
    const handleAddOptionals = () => {
        window.location = '/addOptionals'
    }
    const handleEnroll = () => {
        window.location = '/enroll'
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={props.toggleMenu}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {props.title}
                    </Typography>
                    {TokenUtils.isAuthenticated() && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                                <MenuItem onClick={handleEnroll}>Enroll</MenuItem>
                                <MenuItem onClick={handleGrades}>Grades</MenuItem>
                                <MenuItem onClick={handleAddOptionals}>Add Optionals</MenuItem>
                                <MenuItem onClick={handleContract}>Contract</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>

        </Box>


    );
}
export default Navbar;