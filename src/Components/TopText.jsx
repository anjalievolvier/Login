import React from 'react'
import { Box,Typography } from '@mui/material'
const TopText = () => {
  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
        marginBottom: '10px',
        marginLeft:'100px',
        marginTop:'40px'
      }}>
      <Typography sx={{color: '#000',
      fontFamily: 'Aleo, sans-serif',
      fontSize: '30px',
      fontStyle: 'normal',
      fontWeight: '700',
      lineHeight: 'normal',
      marginBottom:'5px'
      }}>Login</Typography>
    <Typography sx={{
      color: '#000',
      fontFamily: 'Aleo, sans-serif',
      fontSize: '9.6px',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 'normal',
    }}>Welcome to the World of Healthcare! Please log in to access your personalized health information
     <br/> and services.</Typography>
     </Box>
  )
}

export default TopText