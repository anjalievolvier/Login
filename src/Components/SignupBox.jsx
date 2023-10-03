import React from 'react';
import { Grid, Box,Typography } from '@mui/material';
import SignupForm from './SignupForm';

const SignupBox = () => {
  return (
    <Grid container>
      <Grid item xs={10} sm={10} md={11}>
        <Box
          sx={{
            backgroundColor: '#E1E3FF',
            width: '100%',
            height: '530px',
            margin: '80px 10px 10px 20px',
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
      </Grid>
    </Grid>
  );
};

export default SignupBox;
