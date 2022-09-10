import React from 'react';

import { AppBar, Box, Toolbar,Typography, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import { useNavigate, NavLink, useLocation } from "react-router-dom";

import { UserBar } from "./UserBar";

const StyledNavLink = styled(NavLink)`
  color: #fff;
  text-decoration:none;
  &:hover { color:#aaa; }
`;

const AppNavBar = ({user}) => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') || false;
    const navigate = useNavigate();
    const location = useLocation();

    return (
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <DynamicFeedIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <StyledNavLink to="/">Home</StyledNavLink>
          </Typography>

          {isAuthenticated 
            ? <UserBar user={user} />
            : location.pathname !== "/login" && <Button color="inherit" onClick={() => navigate('/login') }>Login</Button>
          }
        </Toolbar>
      </AppBar>
      </Box>
    );
};

export default AppNavBar;