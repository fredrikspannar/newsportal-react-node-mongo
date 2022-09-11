import FaceIcon from '@mui/icons-material/Face';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { Button, Menu, MenuItem, IconButton, Paper } from '@mui/material';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';

const UserBarStyled = styled(Paper)`
    background-color: inherit;
    box-shadow: none;
    border: 0;
    color: #fff;
    margin-left: auto;
`;

export const UserBar = ({user}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    let open = Boolean(anchorEl);
    
    const navigate = useNavigate();

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        // close popup 
      open = false;
      setAnchorEl(null);
    };

    const goToPage = (url) => {
        // close popup and navigate to target
        open = false;
        setAnchorEl(null);
        navigate(url);
    }

    return (
        <UserBarStyled>
            <IconButton color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <FaceIcon />
            </IconButton>
            {user.firstname} {user.lastname}

            <Button onClick={handleClick}><ArrowDropDownIcon style={{ color: "#fff"}} /></Button>
            <Menu open={open} onClose={handleClose} anchorEl={anchorEl} anchorOrigin={{vertical: 'center',horizontal: 'left'}} >
                <MenuItem onClick={() => goToPage('/profile') }>Profile</MenuItem>
                <MenuItem onClick={() => goToPage('/logout') }>Logout</MenuItem>
            </Menu>            
        </UserBarStyled>
    );
};