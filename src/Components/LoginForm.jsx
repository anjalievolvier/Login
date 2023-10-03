import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Box,
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

      if (response.data && response.data.user && response.data.user._id) {
        const userId = response.data.user._id;
        history('/home', { state: { userId } });
      } else if (response.data === 'User does not exist') {
        alert('User has not signed up');
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
    >
      <Grid item xs={10} sm={10} md={8} lg={10} >
        <Box>
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
              width: '100%',
              height: '55px',
              borderRadius: 0,
              border: '1px solid #736EFF',
              background: '#F4F4FF',
              marginTop: '10px',
              padding:'0',
            }}
          />
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
              width: '100%',
              height: '55px',
              border: '1px solid #736EFF',
              background: '#F4F4FF',
              marginTop: '10px',
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
              backgroundColor:'#180E95',
              textTransform: 'capitalize',
              marginTop: '10px',
              height: '60px',
              borderRadius: '0',
              width: '100%',
            }}
          >
            Continue
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
