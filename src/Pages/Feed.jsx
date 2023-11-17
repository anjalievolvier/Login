import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import Caption from '../Components/Caption';
import Logo from '../Components/Logo';
import AppBar from '@mui/material/AppBar';
import { Box, Grid } from '@mui/material';
import Post from '../Components/Post';
import Search from '../Components/Search';
import axios from 'axios';
function Feed() {
  const [user, setUser] = useState(null);
  const [userId] = useState(localStorage.getItem('userId'));
  const [posts, setPosts] = useState([]);
  // Fetch posts from the server when the component mounts
  const fetchPosts = async () => {
    try {
      const response = await fetch(`http://localhost:8000/fetchposts/${userId}`);
      if (response.status === 200) {
        const responseData = await response.json();
        setPosts(responseData.posts);
      } else {
        console.error('Error fetching posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    // Fetch the user details using the user ID and the authToken
    const authToken = localStorage.getItem('authToken'); // Get the authentication token from local storage
    const userId = localStorage.getItem('userId');


    if (userId && authToken) {
      axios
        .get(`http://localhost:8000/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include the authToken in the request headers
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });
    }

    fetchPosts()
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (

    <Box>
      <form encType="multipart/form-data" >
        <AppBar position="static" sx={{ backgroundColor: '#180E95', padding: '20px' }}>
          <Logo />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
            <Link to='/home'>
              <HomeIcon style={{ color: 'white' }} />
            </Link>
          </Box>
        </AppBar>
        <Grid container
          sx={{
            display: "flex",
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: { xs: '50px', sm: '100px', md: '200px', lg: '300px', xl: '400px' },
            paddingRight: { xs: '50px', sm: '100px', md: '200px', lg: '300px', xl: '400px' },
          }}
        >
          <Search user={user} />
          <Caption user={user} fetchPosts={fetchPosts} />
          <Post user={user} posts={posts} fetchPosts={fetchPosts} />
        </Grid>
      </form>

    </Box>


  );
}

export default Feed;