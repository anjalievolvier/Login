import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Caption from '../Components/Caption';
import Logo from '../Components/Logo';
import AppBar from '@mui/material/AppBar';
import { Avatar, Box, Grid } from '@mui/material';
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
        <AppBar position="static" sx={{ backgroundColor: '#180E95', paddingLeft: '20px', paddingRight: '30px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Logo />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}>
              {/* <Link to='/home'>
              <AccountCircleIcon style={{ color: 'white' }} />
            </Link> */}
              {user && user.imagePath && user.imagePath.length && user.imagePath[0] && user.imagePath[0].url ? (

                // Display the uploaded avatar 
                <Link to="/home">
                  <Avatar
                    src={`${user.imagePath[0].url}?${new Date().getTime()}`}
                    sx={{
                      width: '47px',
                      height: '47px',
                      borderRadius: '50%',
                      background: '#180E95',
                      marginRight: '20px',
                      marginTop:'10px'
                    }} />
                </Link>

              ) : (
                <Link to='/home'>
                  <AccountCircleIcon style={{ color: 'white' }} />
                </Link>
              )}

            </Box>







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
          <Search user={user} fetchPosts={fetchPosts} />
          <Caption user={user} fetchPosts={fetchPosts} />
          <Post user={user} posts={posts} />
        </Grid>
      </form>

    </Box>


  );
}

export default Feed;