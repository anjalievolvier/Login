import React from 'react';
import { Grid, Box, Typography, Divider} from '@mui/material';
import { Link } from "react-router-dom";
import LoginForm from './LoginForm';
import AltLogin from './AltLogin';
import TopText from './TopText';

const LoginBox = () => {
  const isMobile = window.innerWidth <= 600; // Define a threshold for mobile view

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12}>
        <Box
          sx={{
            backgroundColor: '#E1E3FF',
            // width: '100%',
            height: '100%',
            marginBottom: "10px",
            padding:"10px",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop:'25px'
          }}
        >
          {!isMobile && <TopText />} 
          {isMobile ? (
            <>
              <AltLogin />
              <Box >
            <Divider
              sx={{
                marginTop: '20px',
                marginBottom: '20px',
                width: '100%',
                height: '1.5px',
                background: '#180E95',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: '#E1E3FF',
                  padding: '0 5px',
                  margin: '0 15px',
                }}
              >
                or
              </Typography>
            </Divider>
          </Box>
              <LoginForm />
            </>
          ) : (
            <>
              <LoginForm />
              {/* <Box>
            <Divider
              sx={{
                textAlign:'center',
                marginTop: '20px',
                marginBottom: '20px',
                width: '100%',
                height: '1.3px',
                background: '#180E95',
                
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: '#E1E3FF',
                  padding: '0 5px',
                  margin: '0 15px',
                }}
              >
                or
              </Typography>
            </Divider>
          </Box> */}

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
      </Grid>
    </Grid>
  );
}

export default LoginBox;
