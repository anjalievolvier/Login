import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Typography,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Import icons
import { useNavigate, Link } from "react-router-dom";

function Signup() {
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
    <div className="signup">
      <h1>Signup</h1>
      <form method="POST">
        <TextField
          onChange={(e) => setFirstname(e.target.value)}
          label="firstname"
          placeholder="firstname"
          variant="outlined"
        />
        <br />
        <TextField
          onChange={(e) => setLastname(e.target.value)}
          label="lastname"
          placeholder="lastname"
          variant="outlined"
        />
        <br />
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          label="email"
          placeholder="email"
          variant="outlined"
          error={emailError}
          helperText={emailError ? "Invalid email address" : ""}
        />
        <br />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          label="password"
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
          label="ConfirmPassword"
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
        <RadioGroup
          row
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          aria-label="gender"
          name="gender"
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
        <br />
        <TextField
          onChange={(e) => setPhone(e.target.value)}
          label="phone"
          variant="outlined"
          placeholder="phone Number"
          error={phoneError}
          helperText={phoneError ? "Invalid phone number" : ""}
        />
        <br />
        <Button onClick={submit}>Submit</Button>
      </form>
      <Typography>{registrationMessage}</Typography>
      <br />
      <Typography>OR</Typography>
      <br />
      <Link to="/">Login Page</Link>
    </div>
  );
}

export default Signup;
