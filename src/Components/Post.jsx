import React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState,useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import DialogActions from '@mui/material/DialogActions';
const Post = ({ user, posts, fetchPosts }) => {
  const [deletePostDialogOpen, setDeletePostDialogOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [likes, setLikes] = useState(0);
  const [likedPosts, setLikedPosts] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const [postId] = useState(localStorage.getItem('postId'));
 // const userId = user._id;
 const userId = user ? user._id : null;

  /////////////////////fetchlike


     useEffect(() => {
      const fetchLikeCounts = async () => {
        try {
          const response = await fetch('http://localhost:8000/posts/like-counts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ postIds: posts.map(post => post._id) }),
          });
    
          const data = await response.json();
          // const newLikeCounts = { ...likeCounts }; // Copy existing likeCounts to avoid mutating state directly

          // // Iterate over the keys (post IDs) in the response data
          // Object.keys(data).forEach(postId => {
          //   // Update the like count for the specific post
          //   newLikeCounts[postId] = data[postId];
          // });
    
          setLikeCounts(data);

         
    
        
        } catch (error) {
          console.error('Error fetching like counts:', error);
        }
      };
    
      fetchLikeCounts();
    }, [posts]);
    


////////////////////////handle like


  const handleLikeClick = async (postId) => {
    localStorage.setItem('postId',postId);

    try {
      // //Toggle like state for the post
      // setLikes((prevLikes) => ({
      //   ...prevLikes,
      //   [postId]: !prevLikes[postId],
      // }));
  
      // // Update the liked posts list
      // setLikedPosts((prevLikedPosts) => {
      //   if (prevLikedPosts.includes(postId)) {
      //     return prevLikedPosts.filter((id) => id !== postId);
      //   } else {
      //     return [...prevLikedPosts, postId];
      //   }
      // });
    
      // Make the asynchronous call
      const response = await fetch('http://localhost:8000/posts/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId,userId  }),
      });
  
      // Check the response and update state accordingly
      if (response.status === 200) {
        console.log('returned');
        const data = await response.json();
        console.log('Number of likes for post with ID', postId, 'is', data.likes);
        setLikeCounts((prevLikeCounts) => ({
          ...prevLikeCounts,
          [postId]: data.likes,
        }));
        setLikedPosts((prevLikedPosts) => {
            if (prevLikedPosts.includes(postId)) {
              return prevLikedPosts.filter((id) => id !== postId);
            } else {
              return [...prevLikedPosts, postId];
            }
          });
      fetchPosts();
  
      } else {
        console.error('Error handling like:', response.statusText);
      }
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };
  
  
  
 

  const handleDeletePost = async () => {
    try {
      const response = await fetch(`http://localhost:8000/delete/posts/${selectedPostId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
     // console.log('hello');
      setDeletePostDialogOpen(false);
      if (response.status === 200) {
        console.log('post deleted/////////////////////////////////');
        fetchPosts();
      } else {
        console.error('Error in deleting post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  //console.log('userdetails', user);
  //console.log('post;;;;;', posts);
  if (!posts || posts.length === 0) {
    console.log('not post yet');
    return null;
  }
  if (!posts || posts.length === 0) {
    console.log('not post yet');
    return null;
  }

 
  
  const isPostLiked = (postId) => likedPosts.includes(postId);//likedPosts is an array that look is postId present in the array
  const sortPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  console.log('count of likes',likeCounts);
  return (
    <Grid container spacing={2}>
      {sortPosts.map((post) => {
        console.log(post)
        return (
          <Grid item key={post._id} xs={12}>
            <Box
              sx={{ width: '100%', borderRadius: '20px', backgroundColor: '#FFFFFF', boxShadow: 4, marginTop: '10px', marginBottom: '10px', }}>
              <Box
                sx={{ display: 'flex', flexDirection: 'row', p: 2, }}>
                {post.user.imagePath && post.user.imagePath.length && post.user.imagePath[0] && post.user.imagePath[0].url ? (
                  <Avatar
                    src={`${post.user.imagePath[0].url}?${new Date().getTime()}`}
                    sx={{ width: '47px', height: '47px', borderRadius: '50%', background: '#180E95', marginRight: '20px', }} />
                ) : (
                  <Avatar
                    sx={{ width: '47px', height: '47px', borderRadius: '50%', background: '#180E95', marginRight: '20px', }}>
                    {user.firstname.charAt(0).toUpperCase() + user.lastname.charAt(0).toUpperCase()}
                  </Avatar>)}
                {post.user && (
                  <Box>
                    <Typography
                      sx={{ fontFamily: 'Aleo, sans-serif', fontSize: '18px', fontWeight: '700', lineHeight: '23px', letterSpacing: '0em', textAlign: 'left', textTransform: 'capitalize', }}>
                      {post.user.firstname} {post.user.lastname}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontFamily: 'Aleo, sans-serif', fontSize: '14px', fontWeight: '400', lineHeight: '23px', letterSpacing: '0em', textAlign: 'left', }}>
                      {new Date(post.createdAt).toLocaleDateString('en-US', { day: 'numeric' })}{' '}
                      {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long' })}
                    </Typography>
                  </Box>
                )}
                {post.user && post.user._id === user._id && (
                  <MoreVertIcon
                    sx={{ color: '#180E95', cursor: 'pointer', marginLeft: 'auto' }}
                    onClick={() => {
                      setDeletePostDialogOpen(true);
                      setSelectedPostId(post._id);
                    }} />
                )}
              </Box>
              <Dialog open={deletePostDialogOpen} onClose={() => setDeletePostDialogOpen(false)}>
                <DialogTitle>Delete Post</DialogTitle>
                <DialogActions>
                  <Button onClick={() => setDeletePostDialogOpen(false)} color="primary">Cancel</Button>
                  <Button onClick={() => handleDeletePost(selectedPostId)} color="primary">Delete</Button>
                </DialogActions>
              </Dialog>
              <Box sx={{ padding: '0px 10px 10px 10px' }}>
                <Box>
                  {post.text && (
                    <Typography variant="body1"
                      sx={{ fontFamily: 'Aleo, sans-serif', fontSize: '16px', fontWeight: '400', lineHeight: '20px', letterSpacing: '0em', textAlign: 'left', }}>
                      {post.text}
                    </Typography>
                  )}
                </Box>
                {post.images && post.images.length > 0 && (
                  <Box sx={{ marginTop: '5px' }}>
                    {post.images.map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt='post'
                        style={{ width: '100%', borderRadius: '10px' }}
                      />
                    ))}
                  </Box>
                )}
               
                <div style={{ display: 'flex', alignItems: 'center',marginTop: '10px' }}>
                  {isPostLiked(post._id) ? (
                    <ThumbUpOffAltIcon
                      onClick={() => handleLikeClick(post._id)}
                      sx={{ color: '#180E95'}}

                    />
                  ) : (
                    <ThumbUpOffAltIcon
                      onClick={() => handleLikeClick(post._id)}
                      //sx={{ marginLeft: '5px' }}
                    />
                  )}
                  <Typography sx={{ fontFamily: 'Aleo, sans-serif', fontSize: '15px', fontWeight: '400', lineHeight: '23px', letterSpacing: '0em', textAlign: 'left',marginLeft:'10px'}}>
                  {likeCounts[post._id] || 0} Likes
               
                    </Typography>
                </div>
               
              </Box>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};
export default Post;
