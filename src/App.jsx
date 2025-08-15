import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Board from './pages/Board';
import Schedule from './pages/Schedule';
import PostDetail from './pages/PostDetail';
import { CssBaseline, Box } from '@mui/material';

function App() {
  return (
    <Box sx={{ backgroundColor: '#F8F8F8', minHeight: '100vh' }}>
      <CssBaseline />
      <Header />
      <Box component="main" sx={{ p: { xs: 1, sm: 2 } }}>
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;