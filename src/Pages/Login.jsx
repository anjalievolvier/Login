import React from 'react'
import { Box } from '@mui/material';
const Login = () => {
  return (
    <Box sx={{
      backgroundColor: '#180E95;',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      margin: '0',
      padding: '0',
      position: 'relative',
      height: '100vh',
      width: '100vw',
      '@media (max-width: 768px)': {
        backgroundSize: '100% 100%',
      },
    }}>

      <Box sx={{
        backgroundImage: "url('/Login.png')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'right',
        padding: '0',
        margin: '0',
        height: '100vh',
        width: '100vw',
        '@media (max-width: 768px)': {
          width: '100%', // Adjust the width for smaller screens
          height: '400px', // Adjust the height for smaller screens
          position: 'center',
          backgroundSize: '100% 100%', // Set background size to cover the entire container
          backgroundPosition: 'top', // Align the background image to the top
          transform: 'translate(0%, 0%)', // Reposition the box for smaller screens
        },
      }}></Box>
    </Box>

  )
}

export default Login;