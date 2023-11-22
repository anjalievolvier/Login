import React from 'react';
import { Grid } from '@mui/material';

const BgImage = () => {
  return (
    <Grid container
    justifyContent="center"
      alignItems="center"
      sx={{overflow:'hidden'}}
      >
      <Grid item xs={12} sm={12} md={12} >
        <img
        src='/Login.png'
        alt='Background'
        style={{width:'100%',height:'100%',display:'flex',
        }}
        />
      </Grid>

    </Grid>
  );
};

export default BgImage;




