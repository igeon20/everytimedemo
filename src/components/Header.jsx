import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Header = () => {
  const location = useLocation();
  const isSubPage = location.pathname !== '/' && location.pathname !== '/schedule';

  const navLinkStyle = (path) => ({
    color: location.pathname === path ? 'primary.main' : 'inherit',
    textDecoration: 'none',
    fontWeight: 'bold',
    mx: 1.5,
    fontSize: '1rem',
  });

  return (
    <AppBar position="sticky">
      <Toolbar>
        {isSubPage ? (
          <IconButton component={RouterLink} to="/" edge="start" sx={{ width: 128 }}>
            <ArrowBackIcon />
          </IconButton>
        ) : (
          <Typography variant="h6" component="div" sx={{ color: 'primary.main', fontWeight: 'bold', width: 128 }}>
            EVERYTIME
          </Typography>
        )}
        
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Button component={RouterLink} to="/" sx={navLinkStyle('/')}>
            게시판
          </Button>
          <Button component={RouterLink} to="/schedule" sx={navLinkStyle('/schedule')}>
            시간표
          </Button>
          <Button sx={navLinkStyle('/classroom')}>강의실</Button>
          <Button sx={navLinkStyle('/calculator')}>학점계산기</Button>
          <Button sx={navLinkStyle('/friends')}>친구</Button>
          <Button sx={navLinkStyle('/bookstore')}>책방</Button>
          <Button sx={navLinkStyle('/campuspick')}>캠퍼스픽</Button>
        </Box>

        <Box sx={{ width: 128 }} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
