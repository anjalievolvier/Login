import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import BgImage from '../Components/BgImage';
import Logo from '../Components/Logo';
import SignupBox from '../Components/SignupBox'
const Signup = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <Grid container
      sx={{
        display: "flex",
        flexDirection: isMobile ? 'column' : 'row',
        backgroundColor: '#180E95',
        minHeight: '100vh',
        overflow:'hidden'
      }}
    >
      {isMobile ? (
        <Grid container>
          <Grid item xs={12} sm={6}>
            <BgImage />
          </Grid>
          <Grid item xs={12} sm={6} sx={{backgroundColor: '#180E95'}}>
            <Logo />
           <SignupBox />
          </Grid>
         </Grid>
      ) : (
        <Grid container>
          <Grid item xs={12} sm={6} sx={{backgroundColor: '#180E95',
        padding:{xs:'10px',sm:'10px',md:'20px',lg:'30px'}}}>
            <Logo />
            <SignupBox />
          </Grid>
          <Grid item xs={12} sm={6} 
          sx={{backgroundImage:"url('/Login.png')",
          backgroundSize:'cover'}}>
            {/* <BgImage /> */}
          </Grid>
        </Grid>
      )}
    </Grid>
    
  )
}

export default Signup
