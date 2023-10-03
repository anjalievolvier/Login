import React, { useState } from 'react'
import axios from "axios";
import {
    TextField,
    Typography,
    Button,
    InputAdornment,
    IconButton,
    Grid,
    Box,
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
    const [gender, setGender] = useState("");
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
        >
            <Grid item xs={10} sm={10} md={8} lg={10} >
                <Box>
                    <form method="POST">
                        <TextField
                            onChange={(e) => setFirstname(e.target.value)}
                            label={
                                <Typography sx={{
                                    color: '#B4B4B4',
                                    fontFamily: 'Aleo, sans-serif',
                                    fontSize: '20px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal',
                                }}>First name</Typography>

                            }
                            sx={{
                                borderRadius: 0,
                                border: '1px solid #EEE1C3',
                                background: '#FFFCF3',
                                marginTop: '10px',
                                padding: '0',
                            }}
                            placeholder="firstname"
                            variant="outlined"
                        />
                        <TextField
                            onChange={(e) => setLastname(e.target.value)}
                            label={
                                <Typography sx={{
                                    color: '#B4B4B4',
                                    fontFamily: 'Aleo, sans-serif',
                                    fontSize: '20px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal',
                                }}>Last name</Typography>

                            }
                            sx={{
                                borderRadius: 0,
                                border: '1px solid #EEE1C3',
                                background: '#FFFCF3',
                                marginTop: '10px',
                                marginLeft: '20px',
                                padding: '0',
                            }}
                            placeholder="lastname"
                            variant="outlined"
                        />
                        <br />
                        <TextField
                            onChange={(e) => setEmail(e.target.value)}
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
                            sx={{
                                width: '100%',
                                height: '55px',
                                borderRadius: 0,
                                border: '1px solid #EEE1C3',
                                background: '#FFFCF3',
                                marginTop: '16px',
                                padding: '0',
                            }}
                            placeholder="email"
                            variant="outlined"
                            error={emailError}
                            helperText={emailError ? "Invalid email address" : ""}
                        />
                        <br />
                        <TextField
                            onChange={(e) => setPassword(e.target.value)}
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
                            sx={{
                                width: '100%',
                                height: '55px',
                                borderRadius: 0,
                                border: '1px solid #EEE1C3',
                                background: '#FFFCF3',
                                marginTop: '16px',
                                padding: '0',
                            }}
                            placeholder="password"
                            variant="outlined"
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
                        <br />
                        <TextField
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            label={
                                <Typography sx={{
                                    color: '#B4B4B4',
                                    fontFamily: 'Aleo, sans-serif',
                                    fontSize: '20px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal',
                                }}>ConfirmPassword</Typography>
                            }
                            sx={{
                                width: '100%',
                                height: '55px',
                                borderRadius: 0,
                                border: '1px solid #EEE1C3',
                                background: '#FFFCF3',
                                marginTop: '16px',
                                padding: '0',
                            }}
                            placeholder="ConfirmPassword"
                            variant="outlined"
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
                        <br />
                        <TextField
                            onChange={(e) => setGender(e.target.value)}
                            label={
                                <Typography sx={{
                                    color: '#B4B4B4',
                                    fontFamily: 'Aleo, sans-serif',
                                    fontSize: '20px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal',
                                }}>Gender</Typography>
                            }
                            sx={{
                                width: '100%',
                                height: '55px',
                                borderRadius: 0,
                                border: '1px solid #EEE1C3',
                                background: '#FFFCF3',
                                marginTop: '16px',
                                padding: '0',
                            }}
                            variant="outlined"
                            placeholder="Gender"
                        />
                        <br />
                        <TextField
                            onChange={(e) => setPhone(e.target.value)}
                            label={
                                <Typography sx={{
                                    color: '#B4B4B4',
                                    fontFamily: 'Aleo, sans-serif',
                                    fontSize: '20px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal',
                                }}>Mobile Number</Typography>
                            }
                            sx={{
                                width: '100%',
                                height: '55px',
                                borderRadius: 0,
                                border: '1px solid #EEE1C3',
                                background: '#FFFCF3',
                                marginTop: '16px',
                                padding: '0',
                            }}
                            variant="outlined"
                            placeholder="Mobile Number"
                            error={phoneError}
                            helperText={phoneError ? "Invalid phone number" : ""}
                        />
                        <br />
                        <Button onClick={submit}
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{
                                fontFamily: 'Aleo, sans-serif',
                                fontSize: '14px',
                                fontStyle: 'normal',
                                fontWeight: '400',
                                lineHeight: 'normal',
                                backgroundColor: '#1B1B1B',
                                textTransform: 'capitalize',
                                marginTop: '10px',
                                height: '60px',
                                borderRadius: '0',
                                width: '100%',
                            }}>Sign up</Button>
                    </form>
                    <Typography>{registrationMessage}</Typography>
                </Box>
            </Grid>
        </Grid>
    )
}

export default SignupForm