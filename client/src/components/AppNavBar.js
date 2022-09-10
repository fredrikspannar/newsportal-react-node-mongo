import React from 'react';

import { AppBar, Box, Toolbar,Typography, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import { NavLink } from "react-router-dom";

import { UserBar } from "./UserBar";

const StyledNavLink = styled(NavLink)`
  color: #fff;
  text-decoration:none;
  &:hover { color:#aaa; }
`;

const AppNavBar = ({user}) => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') || false;

    return (
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <DynamicFeedIcon /> &nbsp; Newsportal
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink to="/">Home</NavLink>
          </Typography>

          {isAuthenticated && <UserBar user={user} />}
        </Toolbar>
      </AppBar>
      </Box>
    );
};

export default AppNavBar;