import React, { useState } from 'react';
import axios from "axios";
import {
    TextField,
    Typography,
    Button,
    InputAdornment,
    IconButton,
    Box,
    Grid,
    Select,
    MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function SignupForm() {
    const history = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [gender, setGender] = useState(""); // Use state for gender
    const [phone, setPhone] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [registrationMessage, setRegistrationMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    async function submit(e) {
        e.preventDefault();

        // Check if password and confirm password match
        if (password !== ConfirmPassword) {
            setPasswordError(true);
            return;
        } else {
            setPasswordError(false);
        }

        // Check if password contains at least 8 characters
        if (password.length < 8) {
            setPasswordError(true);
            return;
        } else {
            setPasswordError(false);
        }

        // Validate email using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError(true);
            return;
        } else {
            setEmailError(false);
        }

        // Validate phone number using regex (10-digit number)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            setPhoneError(true);
            return;
        } else {
            setPhoneError(false);
        }

        try {
            await axios
                .post("http://localhost:8000/signup", {
                    email,
                    password,
                    ConfirmPassword,
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
                            history("/");
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

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
            overflow={'hidden'}
        >

            <Box>
            <form method="POST">

                <Grid item xs={12} sm={12} md={12} lg={12} display={'flex'} gap={'20px'}>
                    <TextField
                        onChange={(e) => setFirstname(e.target.value)}
                        label={
                            <Typography
                                sx={{
                                    color: '#B4B4B4',
                                    fontFamily: 'Aleo, sans-serif',
                                    fontSize: '15px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal',
                                }}
                            >
                                First name
                            </Typography>
                        }
                        sx={{
                            borderRadius: 0,
                            border: '1px solid #736EFF',
                            background: '#FFFCF3',
                            // marginTop: '20px',
                        }}
                        id="outlined-size-small"
                        size="small"
                    />
                    <TextField
                        onChange={(e) => setLastname(e.target.value)}
                        label={
                            <Typography
                                sx={{
                                    color: '#B4B4B4',
                                    fontFamily: 'Aleo, sans-serif',
                                    fontSize: '15px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal',
                                }}
                            >
                                Last name
                            </Typography>
                        }
                        sx={{
                            borderRadius: 0,
                            border: '1px solid #736EFF',
                            background: '#FFFCF3',
                            // marginTop: '20px',
                        }}
                        id="outlined-size-small"
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} marginTop={'15px'}>
                    <TextField
                        onChange={(e) => setEmail(e.target.value)}
                        label={
                            <Typography
                                sx={{
                                    color: '#B4B4B4',
                                    fontFamily: 'Aleo, sans-serif',
                                    fontSize: '15px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal',
                                }}
                            >
                                Email
                            </Typography>
                        }
                        sx={{
                            width: '100%',
                            borderRadius: 0,
                            border: '1px solid #736EFF',
                            background: '#FFFCF3',
                            // marginTop: '16px',
                            // padding: '0',
                        }}
                        id="outlined-size-small"
                        size="small"
                        error={emailError}
                        helperText={emailError ? "Invalid email address" : ""}
                    />
                </Grid>
                <br />
                <Grid item xs={12} sm={12} md={12} lg={12} >
                    <TextField
                        onChange={(e) => setPassword(e.target.value)}
                        label={
                            <Typography
                                sx={{
                                    color: '#B4B4B4',
                                    fontFamily: 'Aleo, sans-serif',
                                    fontSize: '15px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal',
                                }}
                            >
                                Password
                            </Typography>
                        }
                        sx={{
                            width: '100%',
                            borderRadius: 0,
                            border: '1px solid #736EFF',
                            background: '#FFFCF3',
                            // marginTop: '16px',
                            // padding: '0',
                        }}
                        id="outlined-size-small"
                        size="small"
                        type={showPassword ? "text" : "password"} // Toggle password visibility
                        error={passwordError}
                        helperText={
                            passwordError
                                ? "Password must be at least 8 characters long"
                                : ""
                        }
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        onClick={togglePasswordVisibility}
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <br />
                <Grid item xs={12} sm={12} md={12} lg={12} >
                    <TextField
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        label={
                            <Typography
                                sx={{
                                    color: '#B4B4B4',
                                    fontFamily: 'Aleo, sans-serif',
                                    fontSize: '15px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal',
                                }}
                            >
                                Confirm Password
                            </Typography>
                        }
                        sx={{
                            width: '100%',
                            borderRadius: 0,
                            border: '1px solid #736EFF',
                            background: '#FFFCF3',
                            // marginTop: '16px',
                            // padding: '0',
                        }}
                        id="outlined-size-small"
                        size="small"
                        type={showPassword ? "text" : "password"} // Toggle password visibility
                        error={passwordError}
                        helperText={passwordError ? "Passwords do not match" : ""}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        onClick={togglePasswordVisibility}
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <br />
                <Grid item xs={12} sm={12} md={12} lg={12} >
                    <TextField
                        onChange={(e) => setPhone(e.target.value)}
                        label={
                            <Typography
                                sx={{
                                    color: '#B4B4B4',
                                    fontFamily: 'Aleo, sans-serif',
                                    fontSize: '15px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal',
                                }}
                            >
                                Mobile Number
                            </Typography>
                        }
                        sx={{
                            width: '100%',
                            borderRadius: 0,
                            border: '1px solid #736EFF',
                            background: '#FFFCF3',
                            // marginTop: '16px',
                            // padding: '0',
                        }}
                        id="outlined-size-small"
                        size="small"
                        error={phoneError}
                        helperText={phoneError ? "Invalid phone number" : ""}
                    />
                </Grid>
                <br />
                <Grid item xs={12} sm={12} md={12} lg={12} >
                    <Select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        label={
                            <Typography
                                sx={{
                                    color: '#B4B4B4',
                                    fontFamily: 'Aleo, sans-serif',
                                    fontSize: '15px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal',
                                }}
                            >
                                Gender
                            </Typography>
                        }
                        sx={{
                            width: '100%',
                            height: '40px',
                            borderRadius: 0,
                            border: '1px solid #736EFF',
                            background: '#FFFCF3',
                            // marginTop: '16px',
                            // padding: '0',
                        }}
                    >
                        <MenuItem value="">Select Gender</MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </Select>
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
                            backgroundColor:'#1B1B1B',
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
            </form>
            <Typography>{registrationMessage}</Typography>
            </Box>
        </Grid>
    );
}

export default SignupForm;
