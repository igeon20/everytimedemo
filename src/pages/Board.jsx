import React from 'react';
import { posts } from '../data/posts';
import Post from '../components/Post';
import { Container, Typography, Paper, Box, Divider } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const Board = () => {
  return (
    <Container maxWidth="md" sx={{ p: 0, backgroundColor: '#fff' }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>자유게시판</Typography>
      </Box>
      <Divider />
      <Paper elevation={0} square>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </Paper>
    </Container>
  );
};

export default Board;
