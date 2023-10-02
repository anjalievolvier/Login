import React from 'react'
import { Grid, Box, Typography, Divider } from '@mui/material'
import { Link } from "react-router-dom"
import LoginForm from './LoginForm'
import AltLogin from './AltLogin'
import TopText from './TopText'
const LoginBox = () => {
  return (
    <Grid container>
      <Grid item xs={6} sm={6} md={4}>
        <Box
          sx={{
            backgroundColor: '#E1E3FF',
            width: '550px',
            height: '530px',
            margin: "80px 10px 10px 20px",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <TopText />
          <LoginForm />
          <Box>
            <Divider
              sx={{
                marginTop: '20px',
                marginBottom: '20px',
                width: '450px',
                height: '1.5px',
                background: '#180E95',

              }}>
              <Typography
                variant="body1"
                sx={{
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: '#E1E3FF',
                  padding: '0 5px',
                  margin: '0 15px'
                }}
              >
                or
              </Typography>
            </Divider>
          </Box>
          <AltLogin />
          <Box sx={{ display: 'flex', flexDirection: 'row', marginLeft: '-17px', marginTop: '10px' }}>
            <Typography variant="body2">
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
              <span sxtyle={{ textDecoration: 'none' }}>&</span>
              <span style={{ textDecoration: 'underline' }}> Privacy Policy</span>

            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default LoginBox