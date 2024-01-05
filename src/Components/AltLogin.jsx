import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const AltLogin = () => {
    const history = useNavigate();
    const login = useGoogleLogin({
        onSuccess: (response) => handleGoogleLogin(response),
    });

    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const { access_token } = credentialResponse;
            
            // Send the access_token to the server for authentication
            const response = await fetch('http://localhost:8000/google-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    access_token: access_token,
                }),
            });

            if (response.ok) {
                const user = await response.json();
                console.log('User details:', user);
                const userId = user.user._id;
                const authToken = user.authToken;
                localStorage.setItem('authToken', authToken);
                localStorage.setItem('userId', userId);
                history('/', { state: { userId } });
            } else {
                console.log('Login failed on the server side');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div>
            <Button
                onClick={() => login()}
                variant="outlined"
                style={{ width: '100%', padding: 0 }}
            >
                <img
                    src="/google.png" 
                    alt="Google"
                    style={{
                        maxWidth: '100%',
                        width: '100%',
                        height: 'auto',
                        display: 'flex',
                    }}
                />
            </Button>
        </div>
    );
};

export default AltLogin;

