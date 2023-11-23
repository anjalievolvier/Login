import React from 'react'
import { Box } from '@mui/material'
const Logo = () => {
  return (
    <Box sx={{
      maxWidth: '350px',
      width: '100%',
      height: 'auto',
      textAlign: 'center',
    }}>
      <img
        src="/Logo.png"
        alt="Logo"
        style={{
          maxWidth: '100%',
          width: '100%',
          height: 'auto',
          marginLeft:'20px',
          marginTop:'10px'
        }} />
    </Box>
  )
}

export default Logo