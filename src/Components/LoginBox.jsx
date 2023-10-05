import React from 'react';
import { Grid, Box, Typography} from '@mui/material';
import { Link } from "react-router-dom";
import LoginForm from './LoginForm';
import AltLogin from './AltLogin';
import TopText from './TopText';

const LoginBox = () => {
  const isMobile = window.innerWidth <= 600; // Define a threshold for mobile view

  return (
      <Box xs={12} sm={12} md={12} spacing={'2'}
           display={'flex'}
        flexDirection={'row'}
          sx={{
            backgroundColor: '#E1E3FF',
            padding:{md:'50px', xs:'20px 30px 20px 30px'},
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin:{md:'30px', xs:'5px 20px 10px 20px'},
          }}
        >
          {!isMobile && <TopText />} 
          {isMobile ? (
            <>
              <AltLogin />
              <Grid item sx={{
      justifyContent: 'center',
      width: '100%',
      alignItems: 'center',
      height: '40px',
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flex: 1, height: '1.3px', background: '#180E95' }} />
        <Typography
          variant="body1"
          sx={{
            backgroundColor: '#E1E3FF',
            padding: '0 20px', 
          }}
        >
          or
        </Typography>
        <Box sx={{ flex: 1, height: '1.3px', background: '#180E95' }} />
      </Box>
    </Grid>
              <LoginForm />
            </>
          ) : (
            <>
              <LoginForm />
          <Grid item sx={{
      justifyContent: 'center',
      width: '100%',
      alignItems: 'center',
      height: '40px',
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flex: 1, height: '1.3px', background: '#180E95' }} />
        <Typography
          variant="body1"
          sx={{
            backgroundColor: '#E1E3FF',
           padding: '0 20px', 
          }}
        >
          or
        </Typography>
        <Box sx={{ flex: 1, height: '1.3px', background: '#180E95' }} />
      </Box>
    </Grid>
              <AltLogin />
            </>
          )}
          
          <Box sx={{ display: 'flex', flexDirection: 'row', marginLeft: '-17px', marginTop: '10px' }}>
            <Typography variant="body2"
              sx={{
                color: '#000',
                fontFamily: 'Aleo, sans-serif',
              }}>
              New here?{' '}
              <Link to="/signup">
                Signup
              </Link>
              {' '} now
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', marginLeft: '15px', marginTop: '10px', }}>
            <Typography
              sx={{
                color: '#000',
                textAlign: 'center',
                fontFamily: 'Aleo, sans-serif',
                fontSize: '10px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: 'normal',
              }} >
              By signing in you are agreeing to our{' '}
              <span style={{ textDecoration: 'underline' }}>Terms and Conditions &nbsp;</span>
              <span style={{ textDecoration: 'none' }}>&</span>
              <span style={{ textDecoration: 'underline' }}> Privacy Policy</span>
            </Typography>
          </Box>
      </Box>
  );
}

export default LoginBox;
