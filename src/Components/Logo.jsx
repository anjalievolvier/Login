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
          maxWidth: '100vw',
          width: '100%',
          height: 'auto',
          marginTop:'20px'
        }} />
    </Box>
  )
}

export default Logo