import React, { useState } from 'react';
import { Typography, Box, Avatar, Divider } from '@mui/material';

const Comment = ({ comment }) => {
  const [blurred, setBlurred] = useState(comment.isSensitive);

  const commentStyle = {
    cursor: comment.isSensitive ? 'pointer' : 'default',
    filter: blurred ? 'blur(5px)' : 'none',
    transition: 'filter 0.3s',
  };

  const handleToggleBlur = () => {
    if (comment.isSensitive) {
      setBlurred(!blurred);
    }
  };

  return (
    <Box sx={{ py: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Avatar sx={{ width: 28, height: 28, mr: 1, backgroundColor: '#f0f0f0' }} />
        <Box>
          <Typography sx={{ fontWeight: 'bold', fontSize: '0.8rem' }}>{comment.author}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>{comment.timestamp}</Typography>
        </Box>
      </Box>
      <Box onClick={handleToggleBlur} style={commentStyle}>
        <Typography variant="body2" sx={{ color: 'text.primary' }}>
          {comment.content}
        </Typography>
        {blurred && (
          <Box sx={{ textAlign: 'center', fontSize: '0.8rem', fontWeight: 'bold', color: 'text.secondary', mt: 1 }}>
            클릭하여 내용 보기
          </Box>
        )}
      </Box>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};

export default Comment;
