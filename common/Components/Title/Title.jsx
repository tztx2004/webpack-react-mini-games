import React from 'react';
import { Typography } from '@mui/material';

const Title = ({ text }) => {
  return (
    <Typography variant='h3' gutterBottom>
      {text}
    </Typography>
  );
};

export default Title;
