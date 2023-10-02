import React from 'react'
import { Box } from '@mui/material'
const Logo = () => {
  return (
    <Box sx={{
      maxWidth: '350px',
      width: '20px',
      height: 'auto',
      textAlign: 'center',

    }}>
      <img
        src="/Logo.png"
        alt="Logo"
        style={{
          maxWidth: '100vw',
          width: '350px',
          margin:'20px',
          height: 'auto'
        }} />
    </Box>
  )
}

export default Logo