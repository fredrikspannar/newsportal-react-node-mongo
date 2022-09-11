import React from 'react';

import { AppBar, Box, Toolbar,Typography, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavLink } from "react-router-dom";

import { UserBar } from "./UserBar";

import newsportalLogo from "./newsportal-logo.png";

const StyledNavLink = styled(NavLink)`
  color: #fff;
  text-decoration:none;
  margin-right: 20px;
  margin-left: 10px;
  &:hover { color:#aaa; }
`;

const AppNavBar = ({user}) => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') || false;

    return (
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <img src={newsportalLogo} alt="" style={{height: "60px", width: "auto"}} />
          </IconButton>

          <Typography variant="h6" component="div">
            <StyledNavLink to="/">Home</StyledNavLink>
          </Typography>
          
          {isAuthenticated && 
            <Typography variant="h6" component="div">
                <StyledNavLink to="/categories">Categories</StyledNavLink>
            </Typography>
          }

          {isAuthenticated && <UserBar user={user} />}
        </Toolbar>
      </AppBar>
      </Box>
    );
};

export default AppNavBar;