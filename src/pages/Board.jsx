import React from 'react';
import { posts } from '../data/posts';
import { Container, Typography, Paper, Box, Divider, List, ListItem, ListItemText, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const DummyBoardList = () => (
  <Paper elevation={0} sx={{ p: 2, mb: 2, border: '1px solid #e5e5e5' }}>
    <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem', mb: 1 }}>즐겨찾는 게시판</Typography>
    <List dense sx={{ p: 0 }}>
      {['새내기게시판', '졸업생게시판', '비밀게시판', '동아리·학회'].map(text => (
        <ListItem key={text} sx={{ p: 0, py: 0.5 }}>
          <ListItemText primary={text} primaryTypographyProps={{ fontSize: '0.9rem' }} />
        </ListItem>
      ))}
    </List>
  </Paper>
);

const Board = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <DummyBoardList />
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper sx={{ border: '1px solid #e5e5e5' }}>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>자유게시판</Typography>
              <ChevronRightIcon />
            </Box>
            <Divider />
            <List sx={{ p: 0 }}>
              {posts.map((post) => (
                <React.Fragment key={post.id}>
                  <ListItem 
                    button 
                    component={RouterLink} 
                    to={`/post/${post.id}`}
                    sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'flex-start', 
                      py: 1.5,
                      textDecoration: 'none',
                      color: 'inherit'
                    }}
                  >
                    <ListItemText 
                      primary={post.title} 
                      primaryTypographyProps={{ fontWeight: '500', fontSize: '0.95rem' }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', mt: 0.5 }}>
                      <Typography variant="caption" sx={{ mr: 1.5 }}>{post.author}</Typography>
                      <Typography variant="caption" sx={{ mr: 2 }}>{post.timestamp}</Typography>
                      <ThumbUpOutlinedIcon sx={{ fontSize: '0.8rem', mr: 0.5, color: '#C62917' }} />
                      <Typography variant="caption" sx={{ mr: 1.5, color: '#C62917' }}>{Math.floor(Math.random() * 20)}</Typography>
                      <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: '0.8rem', mr: 0.5, color: '#0CAE63' }} />
                      <Typography variant="caption" sx={{ color: '#0CAE63' }}>{post.comments.length}</Typography>
                    </Box>
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Board;
