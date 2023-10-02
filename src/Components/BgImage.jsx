import React from 'react';
import { Box } from '@mui/material';

const BgImage = () => {
  return (
    
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        backgroundImage: `url("/Login.png")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    ></Box>
  );
};

export default BgImage;


