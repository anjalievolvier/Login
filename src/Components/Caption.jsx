import { Box, Grid, TextField} from '@mui/material';
import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Post from './Post';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

function Caption() {
    const [image, setImage] = useState(null);
    const [text, setText] = useState('');
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [userId] = useState(localStorage.getItem('userId'));
    // const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
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
    useEffect(() => {
        const authToken = localStorage.getItem('authToken'); // Get the authentication token from local storage
        const userId = localStorage.getItem('userId');
        if (userId && authToken) {

            // Fetch posts from the server when the component mounts
            const fetchPosts = async () => {
                const response = await fetch(`http://localhost:8000/fetchposts/${userId}`); // Replace with your actual API endpoint
                if (response.status === 200) {
                    //const postData = await response.json();
                    //setPosts(postData.posts); // Assuming the server returns an array of posts
                    const responseData = await response.json();
                    setPosts(responseData.posts); // Assuming the server returns an array of posts
                    setUser(responseData.user);
                    // console.log('posts:',posts);
                } else {
                    console.error('Error fetching posts');
                }
            };
            fetchPosts();
        }
    }, []);
    const handleRemoveImage = async () =>
    { 
    
    const confirmRemove = window.confirm('Do you want to delete the image?');
  
    if (confirmRemove) {
      // Reset the state values related to the image
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
                    width:'100%',
                    margin: '0 auto',
                }}
            >
                <TextField
                    rows={5}
                    multiline
                    placeholder="Type something"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    // backgroundColor='#DEDEDE'
                    // borderRadius='3px'
                />
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>

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
              <Box sx={{ display: 'flex', alignItems: 'flex-end', position: 'relative',marginRight:'480px' }}>
                <RemoveCircleIcon  onClick = {handleRemoveImage}sx={{ fontSize: 20, color: 'red', position: 'absolute', top: '20px',left:'40px' }} />
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
                            marginBottom:'20px',
                            
                        }}>
                        Post
                    </Button>
                   
                </Box>
            </Box>


            <div><Post user={user} posts={posts} />
            </div>


        </Grid >
    )
}

export default Caption