import React from 'react';
import { Box } from '@mui/material';
import Logo from '../Components/Logo';
import SignupBox from '../Components/SignupBox';
import BgImage from '../Components/BgImage';
const Signup = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#180E95',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
  <Logo/>
      <SignupBox />
      <BgImage />
    </Box>
  );
};

export default Signup;
