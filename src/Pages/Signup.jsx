import React, { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { TextField, Typography, Button } from "@mui/material";


function Signup() {
    const history = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [passwordError, setPasswordError] = useState(false);



    async function submit(e) {
        e.preventDefault();
        // Check if password and confirm password match
        if (password !== ConfirmPassword) {
            setPasswordError(true); // Set password error to true
            return;
        }

        try {

            await axios.post("http://localhost:8000/signup", {
                email, password, ConfirmPassword, firstname, lastname, gender, phone
            })
                .then(res => {
                    console.log("response",res)
                    if (res.data === "exist") {
                        alert("User already exists")
                    }
                    else if (res.data === "not exist") {
                        history("/")
                    }
                })
                .catch(e => {
                    alert("wrong details")
                    console.log(e);
                });

        }
        catch (e) {
            console.log(e);

        }

    }

    return (
        <div className="signup">

            <h1>Signup</h1>
            <form method='POST'>
                <TextField onChange={(e) => setFirstname(e.target.value)} label="firstname" placeholder='firstname' variant='outlined'>Firstname</TextField>
                <br />
                <TextField onChange={(e) => setLastname(e.target.value)} label="lastname" placeholder='lastname' variant='outlined'>Lastname</TextField>
                <br />

                <TextField onChange={(e) => { setEmail(e.target.value) }}
                    label="email"
                    placeholder='email'
                    variant='outlined'>Email</TextField>

                <br />
                <TextField onChange={(e) => { setPassword(e.target.value) }}
                    label="password"
                    placeholder='password'
                    variant='outlined'>Password</TextField>
                <br />

                <TextField
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    label="ConfirmPassword"
                    placeholder="ConfirmPassword"
                    variant="outlined"
                    error={passwordError} // Set the error prop based on passwordError state
                    helperText={passwordError ? "Passwords do not match" : ""} // Display an error message when passwords don't match
                />
                <br />


                <TextField onChange={(e) => setGender(e.target.value)} label="gender" placeholder='gender' variant='outlined'>Gender</TextField>
                <br />
                <TextField
                    onChange={(e) => setPhone(e.target.value)}
                    label="phone"
                    variant="outlined" placeholder="phone Number" >phone</TextField>

                <br />
                <Button onClick={submit} >Submit</Button>

            </form>


            <br />

            <Typography>OR</Typography>
            <br />

            <Link to="/">Login Page</Link>

        </div>
    )
}

export default Signup
