import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

const AltLogin = () => {
    return (
        <Box xs={12} sm={12} md={12} sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '10px', sm: '10px' } }}>
                        <Grid item sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '5px',

                        }}>
                            <Typography 
                            sx={{color: '#000',fontFamily: 'Aleo, sans-serif',fontSize: '15px',fontStyle: 'normal',fontWeight: '700',lineHeight: 'normal',}}>
                                Login </Typography>
                            <Typography
                            sx={{color: '#000',fontFamily: 'Aleo, sans-serif',fontSize: '15px',fontStyle: 'normal',fontWeight: '700',lineHeight: 'normal',}}>
                                with</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} 
                        sx={{ display: 'flex', flexDirection: 'row', gap: '20px',marginLeft: '-17px'}}>
                            <img
                                src='/google.png'
                                alt='Google'
                                style={{
                                    maxWidth:'100%',
                                    width: '100%',
                                    height: 'auto',
                                    display:'flex',
                                }} />
                            <img
                                src='/facebook.png'
                                alt='Facebook'
                                style={{maxWidth:'100%', width: '100%',height: 'auto',display:'flex',
                                }} />
                        </Grid>
</Box>
    )
}

export default AltLogin