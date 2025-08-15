import React from 'react';
import { useParams } from 'react-router-dom';
import { posts } from '../data/posts';
import Post from '../components/Post';
import Comment from '../components/Comment';
import { Container, Paper, Box, Typography, Divider } from '@mui/material';

const PostDetail = () => {
  const { id } = useParams();
  const post = posts.find(p => p.id === parseInt(id));

  if (!post) {
    return <Typography>게시물을 찾을 수 없습니다.</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ p: 0, backgroundColor: '#fff' }}>
      <Paper elevation={0} square>
        <Post post={post} />
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            댓글 {post.comments.length}
          </Typography>
          {post.comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default PostDetail;
