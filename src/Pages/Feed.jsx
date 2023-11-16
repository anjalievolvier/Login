import React from 'react';
import { Link } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import Caption from '../Components/Caption';
import Logo from '../Components/Logo';
import AppBar from '@mui/material/AppBar';
import { Box,Grid } from '@mui/material';
// import Post from '../Components/Post';
import Search from '../Components/Search';

function Feed() {
  // const location = useLocation();
  // const userId = location.state.userId;
  return (
    
    <Box>
      <form encType="multipart/form-data" >   
      <AppBar position="static" sx={{ backgroundColor: '#180E95', padding: '20px' }}>
        <Logo />
         <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
          <Link to='/home'>
            <HomeIcon style={{ color: 'white' }} />
          </Link>
        </Box>
      </AppBar>
      <Grid container
        sx={{
          display: "flex",
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft:{xs:'50px',sm:'100px',md:'200px', lg:'300px',xl:'400px'},
          paddingRight:{xs:'50px',sm:'100px',md:'200px',lg:'300px',xl:'400px'},
        }}
      >
        <Search/>
        <Caption />
      </Grid>
      </form>

    </Box>
   

  );
}

export default Feed;