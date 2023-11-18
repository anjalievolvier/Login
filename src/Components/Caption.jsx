import { Box, Grid, TextField } from '@mui/material';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

function Caption({ user, fetchPosts }) {
    const [image, setImage] = useState(null);
    const [text, setText] = useState('');

    const [userId] = useState(localStorage.getItem('userId'));
    const [selectImage, setSelectImage] = useState(null);
    const [isImageSelected, setIsImageSelected] = useState(false);


    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
        setSelectImage(URL.createObjectURL(selectedImage));
        setIsImageSelected(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('inside submit');
        if (!text && !image) {
            console.error('Either caption or image is required.');
            alert("Either caption or image is required.")
            return;
        }
        const formData = new FormData();
        formData.append('userId', userId);
        // Check if a caption is provided, and append it only if it's not empty
        if (text) {
            formData.append('text', text);
        }
        if (image) {

            formData.append('image', image);
        }

        const response = await fetch('http://localhost:8000/posts', {
            method: 'POST',
            body: formData,
        });

        if (response.status === 200) {
            const responseData = await response.json();
            console.log('successfully posted');
            fetchPosts();
            setImage(null);
            setSelectImage(null);
            setIsImageSelected(false);
            console.log('Saved Post:', responseData.savedPost);
            console.log('User Data:', responseData.user);
            //setUser(responseData.user);
            // Reset the state to clear the selected image
            setImage(null);
            // setPic(null);
            //setContent(''); // You can reset the content as well if needed
            setText('')

        } else {
            console.error('error in posting');
        }

    };

    const handleRemoveImage = async () => {

        const confirmRemove = window.confirm('Do you want to delete the image?');

        if (confirmRemove) {
            setImage(null);
            setSelectImage(null);
            setIsImageSelected(false);
        }
    }
    console.log('userdetails in caption', user);
    return (
        <Grid container>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 4,
                    p: 3,
                    borderRadius: '20px',
                    width: '100%',
                    margin: '0 auto',
                    marginBottom: '10px'
                }}
            >
                <TextField
                    rows={5}
                    multiline
                    placeholder="Type something"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                    <label htmlFor="imageInput">
                        <img
                            src='/imageicon.png'
                            alt='imageicon'
                            style={{
                                width: '50px',
                                height: '50px',
                                marginTop: '20px',
                                cursor: 'pointer',
                            }}
                        />
                    </label>
                    <input
                        id="imageInput"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />
                    {isImageSelected && (
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', position: 'relative', marginRight: '480px' }}>
                            <RemoveCircleIcon onClick={handleRemoveImage} sx={{ fontSize: 20, color: 'red', position: 'absolute', top: '20px', left: '40px' }} />
                            <Box sx={{
                                width: '50px',
                                height: '50px',
                                border: '1px solid #DEDEDE',
                                borderRadius: '10px',
                                overflow: 'hidden',
                            }}>

                                {selectImage && (
                                    <img
                                        src={selectImage}
                                        alt="selected"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}

                                    />)}

                            </Box>
                        </Box>
                    )}

                    <Button type="submit" onClick={handleSubmit}
                        sx={{
                            color: '#FFF',
                            background: '#180E95',
                            fontFamily: 'Aleo, sans-serif',
                            fontSize: '10px',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            lineHeight: 'normal',
                            marginTop: '20px',
                            marginBottom: '20px',

                        }}>
                        Post
                    </Button>

                </Box>
            </Box>
        </Grid >
    )
}

export default Caption