import FaceIcon from '@mui/icons-material/Face';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { Button, Menu, MenuItem, IconButton } from '@mui/material';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserBar = ({user}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const navigate = useNavigate();

    return (
        <>
            <IconButton color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <FaceIcon />
            </IconButton>
            {user.firstname} {user.lastname}

            <Button onClick={handleClick}><ArrowDropDownIcon style={{ color: "#fff"}} /></Button>
            <Menu open={open} onClose={handleClose} anchorEl={anchorEl} anchorOrigin={{vertical: 'center',horizontal: 'left'}} >
                <MenuItem onClick={() => navigate('/profile') }>Profile</MenuItem>
                <MenuItem onClick={() => navigate('/logout') }>Logout</MenuItem>
            </Menu>            
        </>
    );
};