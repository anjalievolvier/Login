import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import SignupForm from './SignupForm';

const SignupBox = () => {
  return (
    <Grid item xs={12} sm={12} md={12} spacing={'2'} p={'10px'}>
      <Box
        sx={{
          backgroundColor: '#E1E3FF',
          maxWidth: '500px', // Set maximum width
          margin: '20px',
          padding: '60px', // Add padding for spacing
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <SignupForm />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center', // Center align text
            marginTop: '10px',
          }}
        >
          <Typography
            sx={{
              color: '#000',
              textAlign: 'center',
              fontFamily: 'Aleo, sans-serif',
              fontSize: '10px',
              fontStyle: 'normal',
              fontWeight: '400',
              lineHeight: 'normal',
              marginTop: '5px',
            }}
          >
            By signing in, you are agreeing to our{' '}
            <span style={{ textDecoration: 'underline' }}>
              Terms and Conditions &nbsp;
            </span>
            <span style={{ textDecoration: 'none' }}>&</span>
            <span style={{ textDecoration: 'underline' }}> Privacy Policy</span>
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default SignupBox;
