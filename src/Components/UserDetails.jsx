import React from 'react'
import { Typography, Box, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { useState } from 'react';
import { useNavigate, } from "react-router-dom"
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SignupForm from './SignupForm';



function UserDetails({ user,authToken,setAuthToken, }) {

  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {

    setIsEditing(true);

  };
  const handleClose = () => {
    setIsEditing(false);
  };



  const history = useNavigate();

  // const handleLogoutClick = () => {
   
  //   history('/');
  // }
 
  const handleLogoutClick = async () => {
    try {
     
      const response = await fetch("http://localhost:8000/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id }),
      });
      
  
      if (response.status === 200) {
        // Clear the token from local storage
        localStorage.removeItem('authToken');
        
        // Update the authentication state to indicate the user is not authenticated
        setAuthToken(null); 
           
      
        history('/login');
      } else {
        // Handle the case where the logout request on the server failed
        console.error("Logout failed on the server");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  

  return (
    <Box
      sx={{
        // gap:'60px',
        // margin:'10px',   
        borderRadius: '20px',
        border: '5px solid #180E95',
        background: '#FFF',
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'center', sm: 'center' },
        padding: '20px',
      }}>
      {/* <Grid container sx={{ padding: '30px',display:'flex',flexWrap:'wrap' }}> */}
      <Box display={'flex'} flexDirection={{ xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' }} gap={'20px'}>
        <Box>
          <Avatar sx={{
            width: '150px',
            height: '150px',
            fontSize: '50px',
            backgroundColor: '#180E95',
            // marginRight: '20px' 
          }}>
            {user.firstname.charAt(0).toUpperCase() + user.lastname.charAt(0).toUpperCase()}</Avatar>
        </Box>
        <Box>
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
            {user.firstname} {user.lastname}
          </Typography>

          <Typography sx={{
            color: '#000',
            fontFamily: 'Aleo, sans-serif',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'normal',
          }}>
            {user.email}
          </Typography>

          <Typography sx={{
            color: '#000',
            fontFamily: 'Aleo, sans-serif',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'normal',
          }}>
            +91{' '}
            {user.phone}
          </Typography>

          <Typography sx={{
            color: '#000',
            fontFamily: 'Aleo, sans-serif',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'normal',
          }}>
            {user.gender === 'female' ? (
              <FemaleIcon fontSize="inherit" color="#0E9B9" />
            ) : (
              <MaleIcon fontSize="inherit" color="#0E9B9" />
            )}  {user.gender}
          </Typography>
        </Box>
      </Box>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} gap={'10px'}
        sx={{ marginTop: { xs: '20px', sm: '20px' } }}>
        <Button onClick={handleEditClick}
          sx={{
            color: '#202020',
            fontFamily: 'Aleo, sans-serif',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: 'normal',
            textTransform: 'capitalize',
            border: '2px solid #000',
            marginBottom: '10px'
          }}>Edit Details</Button>

        <Dialog open={isEditing} onClose={handleClose}
        // maxWidth={'sm'} 
        // fullWidth
        >
          <DialogTitle
            sx={{
              color: '#202020',
              fontFamily: 'Aleo, sans-serif',
              fontSize: '20px',
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: 'normal',
              textTransform: 'capitalize',
            }}>
            Edit Profile</DialogTitle>
          <DialogContent>
            <SignupForm userData={user} onClose={handleClose} />
          </DialogContent>
        </Dialog>
        <Button
          onClick={handleLogoutClick}
          sx={{
            paddingLeft: '25px',
            paddingRight: '25px',
            color: '#202020',
            fontFamily: 'Aleo, sans-serif',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: 'normal',
            textTransform: 'capitalize',
            border: '2px solid #000'
          }}
        > LogOut</Button>
      </Box>
    </Box>
  )
}

export default UserDetails