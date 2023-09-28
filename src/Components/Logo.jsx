import React from 'react'
import { Box, useMediaQuery } from '@mui/material'
const Logo = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <Box sx={{
      position:'absolute',
      top:isMobile ? '50%' : '3%',
      left:'5%',
      // transform:'translate(-50%,-50%)',
      transform: isMobile ? 'translate(20%, 20%)' : 'none',
      maxWidth:'350px',
      width: '80%', 
      height: 'auto', 
      textAlign: 'center',

    }}>
      <img
      src="/Logo.png"
      alt="Logo"
      style={{ maxWidth:'100%',
        width: isMobile ? '80%' : '100%', 
      height: 'auto'}}/>
    </Box>
  )
}

export default Logo