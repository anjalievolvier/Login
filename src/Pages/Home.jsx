import React, { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { Typography, Grid, Box } from '@mui/material';
import axios from 'axios';
import Logo from '../Components/Logo';
import AppBar from '@mui/material/AppBar';
import UserDetails from '../Components/UserDetails';
const Home = () => {
  const location = useLocation();
  const userId = location.state.userId;
  const [user, setUser] = useState(null);
  useEffect(() => {

    // Fetch the user details using the user ID

    if (userId) {

      axios.get(`http://localhost:8000/user/${userId}`)

        .then((response) => {
          setUser(response.data);
        })

        .catch((error) => {
          console.error("Error fetching user details:", error);

        });
    }
  }, [userId]);
  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: '#180E95', padding: '20px' }}><Logo /></AppBar>
      {user ? (
        <Grid container
        sx={{
        paddingLeft:{xs:'30px',sm:'150px',md:'300px',lg:'500px'},
        }}>
          <Grid item sx={{
            width: '100%', height: 'auto', 
            // marginLeft:{xs:'100px',sm:'250px',md:'350px',lg:'450px'},
             marginTop: '100px'
          }}><Typography sx={{
            color: '#000',
            fontFamily: 'Aleo, sans-serif',
            fontSize: '30px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'normal',
          }}>Hey <span style={{
            color: '#180E95', fontFamily: 'Aleo, sans-serif',
            fontSize: '30px',
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: 'normal',
            textTransform: 'capitalize',
          }}>{user.firstname}</span>,</Typography>
            <Typography sx={{
              color: '#000',
              fontFamily: 'Aleo, sans-serif',
              fontSize: '30px',
              fontStyle: 'normal',
              fontWeight: '400',
              lineHeight: 'normal',
            }}>here is your <span style={{
              color: '#000',
              fontFamily: 'Aleo, sans-serif',
              fontSize: '30px',
              fontStyle: 'normal',
              fontWeight: '700',
              lineHeight: 'normal'
            }}>health card</span> </Typography>
          </Grid>
          <Grid item>
            {/* Pass the 'user' object as a prop to UserDetails component */}
            <UserDetails user={user} />
          </Grid>
        </Grid>
      ) : (
        <p> loading......</p>
      )}
    </Box>
  )
}

export default Home