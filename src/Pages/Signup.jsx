import React from 'react';
import { Grid } from '@mui/material';
import Logo from '../Components/Logo';
import SignupBox from '../Components/SignupBox';
import BgImage from '../Components/BgImage';
const Signup = () => {
  return (
    <Grid container
      sx={{
        backgroundColor: '#180E95',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Grid item marginLeft={'30px'} marginTop={'10px'} marginRight={'20px'}>
  <Logo/>
      <SignupBox />
      </Grid>
      <Grid item marginLeft={'30px'}>
      <BgImage />
      </Grid>
      </Grid>
  );
};

export default Signup;
