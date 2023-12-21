import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Caption from '../Components/Caption';
import Logo from '../Components/Logo';
// import Chat from '../Components/Chat';
import AppBar from '@mui/material/AppBar';
import { Avatar, Box, Grid } from '@mui/material';
import Post from '../Components/Post';
import Search from '../Components/Search';
import ChatList from '../Components/ChatList';
import axios from 'axios';
function Feed() {
  const [user, setUser] = useState(null);
  const [userId] = useState(localStorage.getItem('userId'));
  const [posts, setPosts] = useState([]);
  // const [followList, setFollowList] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`http://localhost:8000/fetchposts/${userId}`);
      if (response.status === 200) {
        const responseData = await response.json();
        setPosts(responseData);
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

console.log(user)

  return (

    <Box>
      <form encType="multipart/form-data" >
        <AppBar position="fixed" sx={{ backgroundColor: '#180E95', paddingLeft: '20px', paddingRight: '30px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Logo />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}>
              {/* <Chat user={user}/> */}
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
                      marginTop: '10px'
                    }} />
                </Link>
              ) : (
                <Link to='/home'>
                  <AccountCircleIcon style={{ color: 'white', marginTop: '20px' }} />
                </Link>
              )}
            </Box>
          </Box>
        </AppBar>
        <Grid container
          spacing={2}>
          <Grid item xs={6} sx={{ paddingLeft: '20px',
          width:'60%',
           marginLeft: { xs: '70px', sm: '100px', md: '200px', lg: '200px', xl: '270px' },
          }}>
            <Search user={user} fetchPosts={fetchPosts} />
            <Caption user={user} fetchPosts={fetchPosts} />
            <Grid container>
              {posts.map((posts, index) => (
                <Post key={index} posts={posts} fetchPosts={fetchPosts} />
              ))}
            </Grid>
          </Grid>

          <Grid item xs={2.5} sx={{ padding: '20px', marginTop:'70px'}}>
            <Box
            position="fixed"
            sx={{
              marginLeft:'155px',
              marginRight:'150px',
              width: '20%',
              height:'675px',
              // borderRadius: '20px',
              backgroundColor: '#FFFFFF',
              boxShadow: 4,
              marginTop: '5px',
              marginBottom: '10px',
               padding: '10px'
            }}>
        <ChatList followList={user && user.followlist} user={user}/>
        </Box>
      </Grid>
        </Grid>

      </form>

    </Box>

  );
}

export default Feed;