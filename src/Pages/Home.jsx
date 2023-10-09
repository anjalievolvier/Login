import React, { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { Typography, Grid, Box } from '@mui/material';
import axios from 'axios';
import Logo from '../Components/Logo';
import AppBar from '@mui/material/AppBar';
import UserDetails from '../Components/UserDetails'
const Home = () => {
  const location = useLocation();
  const userId = location.state.userId;
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  useEffect(() => {

    // Fetch the user details using the user ID

    if (userId) {

      axios.get(`http://localhost:8000/user/${userId}`)

        .then((response) => {
          setUser(response.data);

          // Initialize editedUser with the fetched user data
          setEditedUser(response.data);

        })

        .catch((error) => {
          console.error("Error fetching user details:", error);

        });
    }
  }, [userId]);
  const handleEditClick = () => {

    setIsEditing(true);
  };
  const handleCancelClick = () => {
    setIsEditing(false);

    // Reset editedUser to the original user data
    setEditedUser(user);

  };
  const handleSaveClick = async () => {
    try {

      // Send a PUT request to update the user's profile

      const response = await axios.put(`http://localhost:8000/user/${userId}`, editedUser);
      // Update the user with the updated data
       setUser(response.data);
      setIsEditing(false);

    } catch (error) {
      console.error('Error updating profile:', error);
    }

  };
  const handleInputChange = (e) => {
  const { name, value } = e.target;

    // Update the editedUser object when input fields change

    setEditedUser({ ...editedUser, [name]: value });
  };
  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: '#180E95', padding: '20px' }}><Logo /></AppBar>
      {user ? (
        <Grid container>
          <Grid item sx={{
            width: '100%', height: 'auto', marginLeft: '500px', marginTop: '50px'
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