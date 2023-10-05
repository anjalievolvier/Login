import React from 'react';
import { Box,Typography } from '@mui/material';
import SignupForm from './SignupForm';

const SignupBox = () => {
  return (
  
        <Box xs={12} sm={12} md={12} spacing={'2'}
        display={'flex'}
     flexDirection={'row'}
          sx={{
            backgroundColor: '#E1E3FF',
            width: '500px',
            height: '500px',
             margin: '20px',
             padding:'50px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <SignupForm />
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
                marginTop:'5px'
              }} >
              By signing in you are agreeing to our{' '}
              <span style={{ textDecoration: 'underline' }}>Terms and Conditions &nbsp;</span>
              <span style={{ textDecoration: 'none' }}>&</span>
              <span style={{ textDecoration: 'underline' }}> Privacy Policy</span>
            </Typography>
          </Box>
        </Box>
  );
};

export default SignupBox;
