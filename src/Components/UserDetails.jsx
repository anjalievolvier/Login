import React from 'react'
import { Typography, Box, Grid, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { useState } from 'react';
import { useNavigate, } from "react-router-dom"
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SignupForm from './SignupForm';




function UserDetails({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {

    setIsEditing(true);

  };
  const handleClose = () => {
    setIsEditing(false);
  };

  const history = useNavigate();

  const handleLogoutClick = () => {

    history('/');
  };
  return (
    <Grid container xs={12} sm={12} md={12} lg={12} 
    sx={{
      borderRadius: '20px',
      border: '5px solid #180E95',
      background: '#FFF',
      // maxWidth: '700px',
      width: 'auto',
      height: 'auto',
      padding:'50px',
      // marginLeft:'20px',
      marginRight:'20px',
      // marginLeft:{xs:'100px',sm:'250px',md:'350px',lg:'450px'},
      // marginRight:{xs:'100px',sm:'250px',md:'350px',lg:'450px'},
      // marginLeft: '500px',
      marginTop: '20px'
    }}>
      {/* <Grid container sx={{ padding: '30px',display:'flex',flexWrap:'wrap' }}> */}
        <Grid item>
          <Avatar sx={{ width: '150px', height: '150px', fontSize: '50px', backgroundColor: '#180E95', marginRight: '20px' }}>
            {user.firstname.charAt(0).toUpperCase() + user.lastname.charAt(0).toUpperCase()}</Avatar>
        </Grid>
        <Grid item margin={'10px'} paddingTop={'25px'}>
          <Typography
            sx={{
              color: '#000',
              fontFamily: 'Aleo, sans-serif',
              fontSize: '40px',
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
            fontSize: '20px',
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
    <FemaleIcon fontSize="inherit" color="#0E9B9"  /> 
  ) : (
    <MaleIcon fontSize="inherit" color="#0E9B9" /> 
  ) }  {user.gender}
          </Typography>

        </Grid>
        <Grid item display={'flex'} flexDirection={'column'} spacing={'2'}
        sx={{marginLeft:{xs:'20px',sm:'30px',md:'40px',lg:'80px'} ,
        marginTop:'50px'}} >
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
          <Button
            onClick={handleLogoutClick}
            sx={{
              // paddingLeft: '30px',
              // paddingRight: '30px',
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
        </Grid>
      {/* </Grid> */}

      <Dialog open={isEditing} onClose={handleClose}
      // maxWidth={'sm'} 
      fullWidth
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
            <DialogContent sx={{overflow:'auto'}}>
              <Box sx={{width: '100%'}}>
              <SignupForm userData={user} onClose={handleClose}/>
              </Box>
            </DialogContent>
          </Dialog>
    </Grid>
  )
}

export default UserDetails