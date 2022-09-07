import React from 'react';

import { 
            AppBar, Box, Toolbar,
            Typography, Button, IconButton
        } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";

const AppNavBar = () => {
    const navigate = useNavigate();

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
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Home
          </Typography>
          <Button color="inherit" onClick={() => navigate('/login') }>Login</Button>
        </Toolbar>
      </AppBar>
      </Box>
    );
};

export default AppNavBar;