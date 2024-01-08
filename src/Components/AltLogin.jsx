import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import { LoginSocialFacebook } from 'reactjs-social-login';
// import { FacebookLoginButton } from 'react-social-login-buttons';
const AltLogin = () => {
    const history = useNavigate();
    const GoogleLogin = useGoogleLogin({
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
    // Facebook login callback
    const handleFacebookLogin = async (response) => {
        try {
            const { data } = response;
            console.log(data)
            // Send the accessToken to the server for authentication
            const fbResponse = await fetch('http://localhost:8000/facebook-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    access_token: data.accessToken,
                }),
            });

            if (fbResponse.ok) {
                const user = await fbResponse.json();
                console.log('User details from Facebook:', user);
                const userId = user.user._id;
                const authToken = user.authToken;
                localStorage.setItem('authToken', authToken);
                localStorage.setItem('userId', userId);
                history('/', { state: { userId } });
            } else {
                console.log('Facebook login failed on the server side');
            }
        } catch (error) {
            console.error('Error during Facebook login:', error);
        }
    };
    return (
        <Box xs={12} sm={12} md={12}
            sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '10px', sm: '10px' } }}>
            <Grid item sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '5px',
                marginLeft: '15px',
            }}>
                <Typography
                    sx={{ color: '#000', fontFamily: 'Aleo, sans-serif', fontSize: '15px', fontStyle: 'normal', fontWeight: '700', lineHeight: 'normal', }}>
                    Login </Typography>
                <Typography
                    sx={{ color: '#000', fontFamily: 'Aleo, sans-serif', fontSize: '15px', fontStyle: 'normal', fontWeight: '700', lineHeight: 'normal', }}>
                    with</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12}
                sx={{ display: 'flex', flexDirection: 'row', gap: '20px', marginLeft: '-17px' }}>
                <Button
                    onClick={() => GoogleLogin()}
                // style={{ width: '100%', padding: 0 }}
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
                <LoginSocialFacebook
                    appId="6934105876709674"
                    onResolve={(response) => handleFacebookLogin(response)}
                    onReject={(error) => console.log(error)}
                >
                    <Button
                    // style={{
                    //     width: '100%',
                    //     padding: 0,
                    //     marginBottom: 10,
                    //     backgroundColor: 'transparent',
                    //     border: 'none',
                    // }}
                    >
                        <img
                            src="/facebook.png"
                            alt="Facebook"
                            style={{
                                maxWidth: '100%',
                                width: '100%',
                                height: 'auto',
                                display: 'flex',
                            }}
                        />
                    </Button>
                </LoginSocialFacebook>
            </Grid>
        </Box>
    );
};

export default AltLogin;

