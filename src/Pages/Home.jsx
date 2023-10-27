import React, { useState, useEffect } from 'react';
import { Typography, Grid, Box } from '@mui/material';
import axios from 'axios';
import Logo from '../Components/Logo';
import AppBar from '@mui/material/AppBar';
import UserDetails from '../Components/UserDetails';
const Home = () => {

  // const location = useLocation();

  // const userId = location.state.userId;



  const [user, setUser] = useState(null);

  // const [isEditing, setIsEditing] = useState(false);

  // const [editedUser, setEditedUser] = useState(null);


  const [userId] = useState(localStorage.getItem('userId'));
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  useEffect(() => {
    // Fetch the user details using the user ID and the authToken
    const authToken = localStorage.getItem('authToken'); // Get the authentication token from local storage
    const userId = localStorage.getItem('userId'); 


    if (userId && authToken) {
      axios
        .get(`http://localhost:8000/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include the authToken in the request headers
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });
    }
  }, [userId]);


  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: '#180E95', padding: '20px' }}><Logo /></AppBar>
      {user ? (
        <Grid container
          display={'flex'}
          flexDirection={'column'}
          paddingLeft={{xs:'50px',sm:'180px',md:'200px',lg:'320px',xl:'450px'}}//350 400
          paddingRight={{xs:'100px',sm:'180px',md:'200px',lg:'380px',xl:'500px'}}//400 500
          //  backgroundColor={'blue'}
          paddingTop={'50px'}>
           <Grid item 
           sx={{
            width: '100%',
            height: 'auto',
            marginBottom:'20px',
            // backgroundColor:'red',
            flexDirection:'column',
            // display: 'flex',
            // flexDirection: 'column',
            alignItems: 'center',
            // overflowX: 'hidden', // Prevent horizontal scrolling
           }}>
             <Box    
          sx={{
          textAlign:'left',
          }}>
            <Typography sx={{
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
            </Box>
          </Grid>
         
          <Grid item xs={12}>
            {/* Pass the 'user' object as a prop to UserDetails component */}
            <UserDetails user={user} authToken={authToken} setAuthToken={setAuthToken} />
          </Grid>
        </Grid>
      ) : (
        <p> loading......</p>
      )}
    </Box>
  )
}

export default Home