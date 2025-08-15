import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Header = () => {
  const location = useLocation();
  const isSubPage = location.pathname !== '/';

  const navLinkStyle = (path) => ({
    color: location.pathname === path ? 'primary.main' : 'inherit',
    textDecoration: 'none',
    fontWeight: 'bold',
    mx: 1,
  });

  return (
    <AppBar position="sticky">
      <Toolbar>
        {isSubPage ? (
          <IconButton component={RouterLink} to="/" edge="start">
            <ArrowBackIcon />
          </IconButton>
        ) : (
          <Typography variant="h6" component="div" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            EVERYTIME
          </Typography>
        )}
        
        <Box sx={{ flexGrow: 1 }} />

        <Box>
          <Button component={RouterLink} to="/" sx={navLinkStyle('/')}>
            게시판
          </Button>
          <Button component={RouterLink} to="/schedule" sx={navLinkStyle('/schedule')}>
            시간표
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
