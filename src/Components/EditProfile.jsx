import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';

const EditProfile = ({
  editedUser,
  handleInputChange,
  handleSaveClick,
  handleCancelClick,
}) => {
  return (
    <Box sx={{
      borderRadius: '20px',
      border: '5px solid #180E95',
      background: '#FFF',
      maxWidth: '700px',
      width: '100%',
      height: 'auto',
      marginLeft: '500px',
      marginTop: '20px'
    }}>
      <Grid container sx={{ padding: '30px' }}>
        {/* Render your form fields for editing the user's profile data here */}
        {/* Example: */}
        <Grid item>
          <Typography
            sx={{
              color: '#000',
              fontFamily: 'Aleo, sans-serif',
              fontSize: '35px',
              fontStyle: 'normal',
              fontWeight: '700',
              lineHeight: 'normal',
              textTransform: 'capitalize',
            }}>
            Edit Profile
          </Typography>
          <input
            type="text"
            name="firstname"
            value={editedUser.firstname}
            onChange={handleInputChange}
          />
          {/* Add other input fields for editing */}
        </Grid>
        <Grid item display={'flex'} flexDirection={'column'} spacing={'2'} marginLeft={'90px'} marginTop={'50px'}>
          <Button
            onClick={handleSaveClick}
            sx={{
              marginBottom: '10px',
              paddingLeft: '20px',
              paddingRight: '20px',
              color: '#202020',
              fontFamily: 'Aleo, sans-serif',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: 'normal',
              textTransform: 'capitalize',
              border: '2px solid #000'
            }}
          > Save</Button>
          <Button
            onClick={handleCancelClick}
            sx={{
              paddingLeft: '30px',
              paddingRight: '30px',
              color: '#202020',
              fontFamily: 'Aleo, sans-serif',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: 'normal',
              textTransform: 'capitalize',
              border: '2px solid #000'
            }}
          > Cancel</Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EditProfile;
