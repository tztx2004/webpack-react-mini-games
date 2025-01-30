import React from 'react';
import Input from '@mui/material/Input';

const ariaLabel = { 'aria-label': 'description' };

const Inputs = ({ ...props }) => {
  return (
    <div>
      <Input id={'ss'} inputProps={ariaLabel} {...props} />
    </div>
  );
};

export default Inputs;
