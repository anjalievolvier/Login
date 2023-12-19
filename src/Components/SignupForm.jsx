import React, { useEffect, useState } from 'react';
import axios from "axios";
import { TextField, Typography, Button, InputAdornment, IconButton, Grid, Select, MenuItem, FormControl, InputLabel, } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const styles = {
    placeholder: {
      color: '#31304D', 
    //   fontStyle: 'normal', 
      fontFamily: 'Aleo, sans-serif',
       fontSize: '15px',
       fontWeight: '400'
    },
  };
function SignupForm({ userData, onClose }) {

    const history = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [registrationMessage, setRegistrationMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const isEditing = (userData ? true : false);
    useEffect(() => {
        if (isEditing) {
            setFirstname(userData.firstname);
            setLastname(userData.lastname);
            setEmail(userData.email);
            setPhone(userData.phone);
            setGender(userData.gender);
        }
    }, [userData, isEditing]);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    async function submit(e) {
        e.preventDefault();
        if (password.length < 8) {
            setPasswordError(true);
            return;
        } else {
            setPasswordError(false);
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError(true);
            return;
        } else {
            setEmailError(false);
        }
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            setPhoneError(true);
            return;
        } else {
            setPhoneError(false);
        }
        if (isEditing) {
            try {
                await axios.put(`http://localhost:8000/user/${userData._id}`, {
                    firstname,
                    lastname,
                    email,
                    password,
                    phone,
                    gender,
                });
                onClose();
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        }
        else {
            if (password !== ConfirmPassword) {
                setPasswordError(true);
                return;
            } else {
                setPasswordError(false);
            }
            try {
                await axios
                    .post("http://localhost:8000/signup", {
                        email,
                        password,
                        firstname,
                        lastname,
                        gender,
                        phone,
                    })
                    .then((res) => {
                        console.log("response", res);
                        if (res.data === "exist") {
                            setRegistrationMessage("User already exists");
                        } else if (res.data === "not exist") {
                            setRegistrationMessage("User successfully registered");
                            // Redirect after a delay
                            setTimeout(() => {
                                history("/login");
                            }, 2000); // Delay for 2 seconds
                        }
                    })
                    .catch((e) => {
                        setRegistrationMessage("Registration failed");
                        console.log(e);
                    });
            } catch (e) {
                console.log(e);
            }
        }
    }
    const handleCancelClick = () => {
        onClose();
    };
    return (
        <Grid container justifyContent="center" alignItems="center" spacing={1} >
            <form method="POST">
                <Grid item xs={12} sm={12} md={12} lg={12} display={'flex'}
                    gap={{ xs: '10px', lg: '20px' }} paddingTop={'25px'}
                    flexDirection={{ xs: 'column', md: 'row', lg: 'row' }} >
                    <TextField
                     sx={{ borderRadius: 0, border: '1px solid #736EFF', background: '#FFFCF3', }}
                        onChange={(e) => setFirstname(e.target.value)}
                        name="firstname"
                        value={firstname}
                        placeholder='First name'
                        InputProps={{
                            style: styles.placeholder,
                          }}
                        // label={
                        //     <Typography
                        //         sx={{ color: '#B4B4B4', fontFamily: 'Aleo, sans-serif', fontSize: '15px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal', }}>
                        //         First name
                        //     </Typography>
                        // }
                       
                        id="outlined-size-small" size="small" flex={1} />
                    <TextField
                        onChange={(e) => setLastname(e.target.value)}
                        name="lastname"
                        value={lastname}
                        placeholder='Last name'
                        InputProps={{
                            style: styles.placeholder,
                          }}
                        // label={<Typography
                        //     sx={{ color: '#B4B4B4', fontFamily: 'Aleo, sans-serif', fontSize: '15px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal', }}>
                        //     Last name
                        // </Typography>
                        // }
                        sx={{ borderRadius: 0, border: '1px solid #736EFF', background: '#FFFCF3', }}
                        id="outlined-size-small" size="small" flex={1} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} marginTop={'15px'}>
                    <TextField
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        value={email}
                        placeholder='Email'
                        InputProps={{
                            style: styles.placeholder,
                          }}
                        // label={<Typography
                        //     sx={{ color: '#B4B4B4', fontFamily: 'Aleo, sans-serif', fontSize: '15px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal', }}>
                        //     Email
                        // </Typography>
                        // }
                        sx={{ width: '100%', borderRadius: 0, border: '1px solid #736EFF', background: '#FFFCF3', }}
                        id="outlined-size-small" size="small" error={emailError}
                        helperText={emailError ? "Invalid email address" : ""} />
                </Grid>
                <br />
                <Grid item xs={12} sm={12} md={12} lg={12} >
                    <TextField
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        placeholder='Password'
                        // InputProps={{
                        //     style: styles.placeholder,
                        //   }}
                        // label={<Typography
                        //     sx={{ color: '#B4B4B4', fontFamily: 'Aleo, sans-serif', fontSize: '15px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal', }}>
                        //     Password
                        // </Typography>
                        // }
                        sx={{ width: '100%', borderRadius: 0, flexShrink: 0, border: '1px solid #736EFF', background: '#FFFCF3', }}
                        id="outlined-size-small"
                        size="small"
                        type={showPassword ? "text" : "password"}
                        error={passwordError}
                        helperText={
                            passwordError
                                ? "Password must be at least 8 characters long"
                                : ""
                        }
                        InputProps={{
                                style: styles.placeholder,
                              
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        onClick={togglePasswordVisibility}
                                        tabIndex={-1}>
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }} />
                </Grid>
                <br />
                <Grid item xs={12} sm={12} md={12} lg={12} >
                    <TextField
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        name="ConfirmPassword"
                        value={ConfirmPassword}
                        // label={<Typography
                        //     sx={{ color: '#B4B4B4', fontFamily: 'Aleo, sans-serif', fontSize: '15px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal', }}>
                        //     Confirm Password
                        // </Typography>
                        // }
                        placeholder='Confirm Password'
                        sx={{ width: '100%', borderRadius: 0, flexShrink: 0, border: '1px solid #736EFF', background: '#FFFCF3', }}
                        id="outlined-size-small" size="small"
                        type={showPassword ? "text" : "password"}
                        error={passwordError}
                        helperText={passwordError ? "Passwords do not match" : ""}
                        InputProps={{
                            style: styles.placeholder,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        onClick={togglePasswordVisibility}
                                        tabIndex={-1}>
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }} />
                </Grid>
                <br />
                <Grid item xs={12} sm={12} md={12} lg={12} >
                    <TextField onChange={(e) => setPhone(e.target.value)}
                        name="phone"
                        value={phone}
                        // label={<Typography
                        //     sx={{ color: '#B4B4B4', fontFamily: 'Aleo, sans-serif', fontSize: '15px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal', }}>
                        //     Mobile Number
                        // </Typography>
                        // }
                        placeholder='Mobile Number'
                        InputProps={{
                            style: styles.placeholder,
                          }}
                        sx={{width: '100%',flexShrink: 0,borderRadius: 0,border: '1px solid #736EFF',background: '#FFFCF3',}}
                        id="outlined-size-small" size="small"
                        error={phoneError}
                        helperText={phoneError ? "Invalid phone number" : ""}/>
                </Grid>
                <br />
                <Grid item xs={12} sm={12} md={12} lg={12} >
                    <FormControl fullWidth >
                        <InputLabel id="demo-simple-select-label"
                            sx={{color: '#B4B4B4',fontFamily: 'Aleo, sans-serif',fontSize: '15px',fontStyle: 'normal',fontWeight: '400',lineHeight: 'normal'
                            }}>Gender</InputLabel>
                        <Select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            sx={{width: '100%',height: '37px',flexShrink: 0,border: '1px solid #736EFF',background: '#FFFCF3',}}>
                            <MenuItem value="">Select Gender</MenuItem>
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {
                    isEditing ? (
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            <Button onClick={submit} fullWidth variant="contained"
                                 color="primary"
                                sx={{fontFamily: 'Aleo, sans-serif',fontSize: '14px',fontStyle: 'normal',fontWeight: '400',lineHeight: 'normal',backgroundColor: '#180E95',textTransform: 'capitalize',marginTop: '15px', height: '40px',borderRadius: '0',width: '100%',}}>
                                Save
                            </Button>
                            <Button
                                onClick={handleCancelClick}
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
                                    marginTop: '15px',
                                    height: '40px',
                                    borderRadius: '0',
                                    width: '100%',
                                }}
                            >
                                Cancel
                            </Button>
                        </Grid>

                    ) : (
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
                                    marginTop: '15px',
                                    height: '40px',
                                    borderRadius: '0',
                                    width: '100%',
                                }}
                            >
                                Sign up
                            </Button>
                        </Grid>
                    )}
            </form>
            <Typography>{registrationMessage}</Typography>
        </Grid>
    );
}

export default SignupForm;