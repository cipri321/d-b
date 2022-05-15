import React from 'react';
import {Box, Divider, Drawer, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import {List} from "@mui/icons-material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const Menu = (props) => {
    const list = (anchor) => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={props.setOpen(false)}
            onKeyDown={props.setOpen(false)}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    return (
        <>
            <Drawer
                anchor={'left'}
                open={props.open}
                onClose={props.handleClose}
            >
                {list('left')}
            </Drawer>
        </>
    )
}
export default Menu;