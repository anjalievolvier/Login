import React, { useState } from 'react'
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

import { Box, TextField, Typography, Button, Divider, useMediaQuery, IconButton, InputAdornment } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const Boxs = () => {
  const history = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function submit(e) {
    e.preventDefault();

    try {

      await axios.post("http://localhost:8000/", {
        email, password
      })
        .then(res => {
          console.log("response",res)
          if (res.data && res.data.user && res.data.user._id) {
            const userId=res.data.user._id;
            history("/home",{state:{userId:userId}})
          }
          else if (res.data === "User does not exist") {
            alert("User have not sign up")
          }
        })
        .catch(e => {
          alert("wrong details")
          console.log(e);
        })

    }
    catch (e) {
      console.log(e);

    }

  }

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <Box sx={{
      width: '500px',
      height: '540px',
      flexShrink: 0,
      backgroundColor: '#E1E3FF',
      position: 'absolute',
      top: '55%',
      left: '25%',
      transform: 'translate(-50%,-50%)',
      '@media (max-width: 768px)': {
        width: '90%', // Adjust the width for smaller screens
        height: '350px', // Adjust the height for smaller screens
        top: '78%', // Reposition the box for smaller screens
        left: '50%', // Reposition the box for smaller screens
        transform: 'translate(-50%, -50%)', // Reposition the box for smaller screens
      },

    }}>
      {/* To hide content in small screen */}
      {!isMobile && (
        <div>
          <Typography style={{
            color: '#000',
            fontFamily: 'Aleo, sans-serif',
            fontSize: '30px',
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: 'normal',
            position: 'absolute',
            top: '2%',
            left: '7%'
          }}>Login</Typography>
          <Typography style={{
            color: '#000',
            fontFamily: 'Aleo, sans-serif',
            fontSize: '9.6px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'normal',
            position: 'absolute',
            top: '12%',
            left: '7%',
            width: '90%',
          }}>Welcome to the World of Healthcare! Please log in to access your personalized health information
            and services.</Typography>
        </div>
      )}
      {/* textfield for username */}
      <TextField label={(<Typography style={{
        color: '#B4B4B4',
        fontFamily: 'Aleo, sans-serif',
        fontSize: '20px',
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 'normal'
      }}>Email</Typography>)}
        onChange={(e) => { setEmail(e.target.value) }}
        placeholder='Email' variant='outlined'
        sx={{
          width: '88%',
          height: '53.667px',
          flexShrink: 0,
          borderRadius: 0,
          border: isMobile ? '1px solid #EEE1C3' : '1px solid #736EFF',
          background: isMobile ? '#FFFCF3' : '#F4F4FF',
          position: 'absolute',
          top: isMobile ? '36%' : '100px',
          left: isMobile ? '25px' : '30px'
        }}>
        {/* Textfield for password */}

      </TextField>
      <TextField label={(<Typography style={{
        color: '#B4B4B4',
        fontFamily: 'Aleo, sans-serif',
        fontSize: '20px',
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 'normal'
      }}>Password</Typography>)}
        onChange={(e) => { setPassword(e.target.value) }}
        placeholder='Password' variant='outlined'
        type={showPassword ? 'text' : 'password'}
        sx={{
          width: '88%',
          height: '53.667px',
          flexShrink: 0,
          border: isMobile ? '1px solid #EEE1C3' : '1px solid #736EFF',
          background: isMobile ? '#FFFCF3' : '#F4F4FF',
          Position: 'absolute',
          top: isMobile ? '55%' : '180px',
          left: isMobile ? '25px' : '30px'

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
        }}>

      </TextField>
      <Button
        onClick={submit}
        sx={{
          width: '88%',
          height: '53.667px',
          position: 'absolute',
          top: '260px',
          left: isMobile ? '25px' : '30px',
          flexShrink: '0',
          background: '#180E95',
          color: '#FFF',
          fontFamily: 'Aleo, sans-serif',
          fontSize: '10px',
          fontStyle: 'normal',
          fontWeight: '400',
          lineHeight: 'normal',
          textTransform: 'capitalize'
        }}>Continue
      </Button>

      <img
        src="/facebook.png"
        alt="facebook"
        style={{
          maxWidth: '100%',
          width: isMobile ? '25px' : '50px',
          height: 'auto',
          position: 'absolute',
          top: isMobile ? '15%' : '80%',
          left: isMobile ? '55%' : '50%'

        }} />
      <img
        src="/google.png"
        alt="google"
        style={{
          maxWidth: '100%',
          width: isMobile ? '25px' : '50px',
          height: 'auto',
          position: 'absolute',
          top: isMobile ? '15%' : '80%',
          left: isMobile ? '40%' : '35%'

        }} />
      <Typography style={{
        color: '#000',
        fontFamily: 'Aleo, sans-serif',
        fontSize: '15px',
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 'normal',
        position: 'absolute',
        top: isMobile ? '6%' : '73%',
        left: '40%'
      }}>Login with</Typography>
      <Box>
        <Divider
          style={{
            marginTop: isMobile ? '45px' : '320px',
            marginBottom: '100px',
            marginLeft: '33px',
            width: isMobile ? '295px' : '420px',
            height: '1.2px',
            background: '#180E95',

          }}>
          <Typography
            variant="body1"
            style={{
              position: 'absolute',
              top: isMobile ? '100px' : '375px',
              left: isMobile ? '50%' : '48%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#E1E3FF',
              padding: '0 10px',
            }}
          >
            or
          </Typography>
        </Divider>
      </Box>

      <Typography style={{
        width: '200.556px',
        height: '50.343px',
        flexShrink: '0',
        color: '#000',
        textAlign: 'center',
        fontFamily: 'Aleo, sans-serif',
        fontSize: '10px',
        fontStyle: 'normal',
        fontWight: '400',
        lineHeight: 'normal',
        position: 'absolute',
        top: isMobile ? '91%' : '95%',
        left: isMobile ? '20%' : '10%'
      }}>By signing in you are agreeing to our</Typography>
      <Typography style={{
        width: '200.556px',
        height: '50.343px',
        flexShrink: '0',
        color: '#000',
        fontFamily: 'Aleo, sans-serif',
        fontSize: '10px',
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 'normal',
        // textDecorationLine: 'underline',
        position: 'absolute',
        top: isMobile ? '95%' : '95%',
        left: isMobile ? '22%' : '48%'

      }}>
        <span style={{ textDecoration: 'underline' }}>Terms and Conditions &nbsp;</span>
        <span style={{ textDecorationLine: 'none' }}>&</span>
        <span style={{ textDecorationLine: 'underline' }}> Privacy Policy</span>
      </Typography>
      <Typography style={{
        position: 'absolute',
        top: '325px',
        left: '225px'
      }}>OR</Typography>
      <br />
      <Link to="/signup" style={{
        position: 'absolute',
        top: '345px',
        left: '215px'
      }}>Signup</Link>

    </Box>
  )
}

export default Boxs
