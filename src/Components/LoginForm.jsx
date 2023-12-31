import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  TextField,
  Typography,
  Button,
  IconButton,
  InputAdornment,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const LoginForm = () => {
  const history = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/', {
        email,
        password,
      });

      console.log('response', response);

      if (response.data && response.data.user && response.data.user._id && response.data.authToken) {
        const userId = response.data.user._id;
        const authToken = response.data.authToken;
        localStorage.setItem('authToken',authToken);
        localStorage.setItem('userId',userId);
       
        //setCurrentUser(authToken);
        history('/', { state: { userId } });
      } 
      else if (response.data === 'User does not exist') {
        alert('User has not signed up');
      } else{
        alert('Wrong details');
      }
    } catch (error) {
      alert('Wrong details');
      console.error(error);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      spacing={2}
      overflow={'hidden'}
    >
      <Grid item xs={12} sm={12} md={12} lg={12} >

        <TextField
          label={
            <Typography sx={{
              color: '#B4B4B4',
              fontFamily: 'Aleo, sans-serif',
              fontSize: '20px',
              fontStyle: 'normal',
              fontWeight: '400',
              lineHeight: 'normal',
            }}>Email</Typography>
          }
          onChange={(e) => { setEmail(e.target.value) }}
          placeholder="Email"
          variant="outlined"
          sx={{
            width: '99%',
            height: '55px',
            borderRadius: 0,
            border: '1px solid #736EFF',
            background: '#F4F4FF',
            // marginTop: '10px',
            // padding:'0',
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} >
        <TextField
          label={
            <Typography sx={{
              color: '#B4B4B4',
              fontFamily: 'Aleo, sans-serif',
              fontSize: '20px',
              fontStyle: 'normal',
              fontWeight: '400',
              lineHeight: 'normal',
            }}>Password</Typography>
          }
          onChange={(e) => { setPassword(e.target.value) }}
          placeholder="Password"
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          sx={{
            width: '99%',
            height: '55px',
            border: '1px solid #736EFF',
            background: '#F4F4FF',
            // marginTop: '10px',
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={togglePasswordVisibility}
                  edge="end"
                  color="transparent"
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} >
        <Button
          onClick={submit}
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            fontFamily: 'Aleo, sans-serif',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'normal',
            backgroundColor: '#180E95',
            textTransform: 'capitalize',
            // marginTop: '10px',
            height: '60px',
            borderRadius: '0',
            width: '99%',
          }}
        >
          Continue
        </Button>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
