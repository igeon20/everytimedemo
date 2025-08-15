import React, { useState } from 'react';
import { Typography, Button, Box, Divider, Avatar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

const Post = ({ post }) => {
  const [blurred, setBlurred] = useState(post.isSensitive);
  const [showSummary, setShowSummary] = useState(false);

  const postContentStyle = {
    cursor: post.isSensitive ? 'pointer' : 'default',
    filter: blurred ? 'blur(5px)' : 'none',
    transition: 'filter 0.3s',
  };

  const handleToggleBlur = (e) => {
    // Stop navigation when clicking on the blurred content itself
    if (post.isSensitive) {
      e.preventDefault();
      e.stopPropagation();
      setBlurred(!blurred);
    }
  };
  
  const handleSummaryToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSummary(!showSummary);
  }

  return (
    <Box component={RouterLink} to={`/post/${post.id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
      <Box sx={{ p: '16px 16px 8px 16px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar sx={{ width: 32, height: 32, mr: 1, backgroundColor: '#f9d4d1' }} />
          <Box>
            <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{post.author}</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>{post.timestamp}</Typography>
          </Box>
        </Box>

        <Typography variant="h5" sx={{ my: 1, fontSize: '1rem', fontWeight: 'bold' }}>
          {post.title}
        </Typography>
        
        <Box onClick={handleToggleBlur} style={postContentStyle}>
          <Typography variant="body1" sx={{ color: 'text.primary', minHeight: '30px', fontSize: '0.9rem' }}>
            {showSummary ? post.summary.replace(/\\n/g, '<br />') : post.content}
          </Typography>
          {blurred && (
            <Box sx={{ textAlign: 'center', fontWeight: 'bold', color: 'text.secondary', p: 2, backgroundColor: '#fafafa', borderRadius: 1 }}>
              민감한 내용입니다. 클릭하여 확인하세요.
            </Box>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, color: 'text.secondary' }}>
          <ThumbUpOutlinedIcon sx={{ fontSize: '1rem', mr: 0.5, color: '#C62917' }} />
          <Typography variant="caption" sx={{ mr: 2, color: '#C62917' }}>{Math.floor(Math.random() * 20)}</Typography>
          <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: '1rem', mr: 0.5, color: '#0CAE63' }} />
          <Typography variant="caption" sx={{ color: '#0CAE63' }}>{post.comments.length}</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button size="small" onClick={handleSummaryToggle} sx={{ color: 'text.secondary' }}>
            {showSummary ? '원문 보기' : 'AI 요약'}
          </Button>
        </Box>
        <Divider sx={{ mt: 1 }} />
      </Box>
    </Box>
  );
};

export default Post;
