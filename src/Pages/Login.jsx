import React from 'react';
import { Box } from '@mui/material';
import BgImage from '../Components/BgImage';
import LoginBox from '../Components/LoginBox';
import Logo from '../Components/Logo';
const Login = () => {
  return (
    <Box display={'flex'}
      flexDirection={'row'}
      sx={{ backgroundColor: '#180E95' }}>
      <Logo />
      <LoginBox />
      <BgImage />
    </Box>
  );
};

export default Login;






