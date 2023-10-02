import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

const AltLogin = () => {
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '10px', sm: '10px' } }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '5px',

                        }}>
                            <Typography 
                            sx={{
                                color: '#000',
                            fontFamily: 'Aleo, sans-serif',
                            fontSize: '15px',
                            fontStyle: 'normal',
                            fontWeight: '700',
                            lineHeight: 'normal',
                            }}>Login </Typography>
                            <Typography
                            sx={{
                                color: '#000',
                            fontFamily: 'Aleo, sans-serif',
                            fontSize: '15px',
                            fontStyle: 'normal',
                            fontWeight: '700',
                            lineHeight: 'normal',
                            }}>with</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px',marginLeft: '-17px'}}>
                            <img
                                src='/google.png'
                                alt='Google'
                                style={{
                                    width: '40px',
                                    height: '40px',
                                }} />
                            <img
                                src='/facebook.png'
                                alt='Facebook'
                                style={{
                                    width: '40px',
                                    height: '40px',
                                }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AltLogin