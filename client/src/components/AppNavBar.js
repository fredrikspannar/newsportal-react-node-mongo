import React from 'react';

import { 
            AppBar, Box, Toolbar,
            Typography, Button
        } from '@mui/material';

import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import { useNavigate } from "react-router-dom";

import { UserBar } from "./UserBar";

const AppNavBar = ({user}) => {
    const navigate = useNavigate();

    return (
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            <DynamicFeedIcon />
          </Typography>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Home
          </Typography>
          {user.isAuthenticated 
            ? <UserBar user={user} />
            : <Button color="inherit" onClick={() => navigate('/login') }>Login</Button>
          }
        </Toolbar>
      </AppBar>
      </Box>
    );
};

export default AppNavBar;