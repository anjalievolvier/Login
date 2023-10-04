import React from 'react'
import { Box, Typography } from '@mui/material'
const TopText = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: '100%',
      marginBottom: '10px',
      marginLeft: '100px',
      marginTop: '40px'
    }}>
      <Typography sx={{
        color: '#000',
        fontFamily: 'Aleo, sans-serif',
        fontSize: '30px',
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 'normal',
        marginBottom: '5px',
        marginLeft:'5px'
      }}>Login</Typography>
      <Typography sx={{
        color: '#000',
        fontFamily: 'Aleo, sans-serif',
        fontSize: '13px',
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 'normal',
        padding:'10px',
        marginRight:'40px'
      }}>Welcome to the World of Healthcare! Please log in to access your personalized health information
        and services.</Typography>
    </Box>
  )
}

export default TopText