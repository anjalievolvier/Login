import { Avatar, Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate} from 'react-router-dom';

import FemaleIcon from '@mui/icons-material/Female'
import MaleIcon from '@mui/icons-material/Male'
const UserDetails = ({user}) => {
    const history = useNavigate();
    const handleLogout = () => {
        history('/'); 
      };
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
        <Grid container sx={{padding:'30px'}}>
        <Grid item>
      <Avatar sx={{ width:'150px',height:'150px',fontSize:'50px', backgroundColor:'#180E95', margin:'10px' }}>
        {user.firstname.charAt(0).toUpperCase() + user.lastname.charAt(0).toUpperCase()}</Avatar>
      </Grid>
       <Grid item margin={'10px'} paddingTop={'25px'}>
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
            fontSize: '15px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'normal',
          }}>
         {user.email}
          </Typography>
  
          <Typography sx={{
            color: '#000',
            fontFamily: 'Aleo, sans-serif',
            fontSize: '15px',
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
            fontSize: '15px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'normal',
          }}>
        {user.gender === 'female' ? (
    <FemaleIcon fontSize="inherit" color="#0E9B9"  /> 
  ) : (
    <MaleIcon fontSize="inherit" color="#0E9B9" sx={{width:'26px',height:'26px'}} /> 
  ) }  {user.gender}
          </Typography>
  
          </Grid>
          <Grid item display={'flex'} flexDirection={'column'} spacing={'2'} marginLeft={'90px'} marginTop={'50px'}>
            <Button sx={{
                marginBottom:'10px',
                 paddingLeft:'20px',
                 paddingRight:'20px',
                color:'#202020',
                fontFamily: 'Aleo, sans-serif',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: '600',
                lineHeight: 'normal',
                textTransform: 'capitalize',
                border:'2px solid #000'
            }}
            > Edit Profile</Button>
             <Button 
              onClick={handleLogout}
             sx={{
                paddingLeft:'30px',
                paddingRight:'30px',
                color:'#202020',
                fontFamily: 'Aleo, sans-serif',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: '600',
                lineHeight: 'normal',
                textTransform: 'capitalize',
                border:'2px solid #000'
            }}
            > LogOut</Button>
          </Grid>
          </Grid>
        
      </Box>
  )
}

export default UserDetails