import React  from 'react';
import { Box, Grid, Typography,Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState} from 'react';
import Dialog from '@mui/material/Dialog';
//import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

const Post = ({ user, posts, fetchPosts }) => {
  const [deletePostDialogOpen, setDeletePostDialogOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handleDeletePost = async () => {
    try {
      // Assuming you have an API endpoint for deleting a post
      const response = await fetch(`http://localhost:8000/delete/posts/${selectedPostId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('hello');
      setDeletePostDialogOpen(false);
     
      if (response.status === 200) {
        console.log('post deleted/////////////////////////////////');    
        fetchPosts();
        
      } else {
        console.error('Error in deleting post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      // Handle error appropriately
    }
  };
 

  console.log('userdetails', user);
  console.log('post;;;;;', posts);

  if (!posts || posts.length === 0) {
    console.log('not post yet');
    return null;
  }
  if (!posts || posts.length === 0) {
    console.log('not post yet');
    return null;
  }

  return (
    <Grid container spacing={2}
    >
      {posts.map((post) => {
        console.log(post)
        return (
          <Grid item key={post._id} xs={12}>
            <Box
              sx={{
                width: '100%',
                borderRadius: '20px',
                backgroundColor: '#FFFFFF',
                boxShadow: 4,
                marginTop: '10px',
                marginBottom: '10px',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'row', p: 2 }}>

                {post.user.imagePath && post.user.imagePath.length && post.user.imagePath[0] && post.user.imagePath[0].url ? (

                  // Display the uploaded avatar 
                  <Avatar src={`${post.user.imagePath[0].url}?${new Date().getTime()}`}
                    sx={{
                      width: '47px',
                      height: '47px',
                      borderRadius: '50%',
                      background: '#180E95',
                      marginRight: '20px',
                    }} />


                ) : (
                  // Display the user's avatar
                  <Avatar sx={{
                    width: '47px',
                    height: '47px',
                    borderRadius: '50%',
                    background: '#180E95',
                    marginRight: '20px',
                  }}>
                    {user.firstname.charAt(0).toUpperCase() + user.lastname.charAt(0).toUpperCase()}
                  </Avatar>)}
                {post.user && (
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: 'Aleo, sans-serif',
                        fontSize: '18px',
                        fontWeight: '700',
                        lineHeight: '23px',
                        letterSpacing: '0em',
                        textAlign: 'left',
                        textTransform: 'capitalize',
                      }}
                    >
                      {post.user.firstname} {post.user.lastname}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontFamily: 'Aleo, sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                        lineHeight: '23px',
                        letterSpacing: '0em',
                        textAlign: 'left',
                      }}
                    >
                      {new Date(post.createdAt).toLocaleDateString('en-US', { day: 'numeric' })}{' '}
                      {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long' })}
                    </Typography>

                  </Box>
                )}
                 {/* MoreVertIcon added here */}
                 <MoreVertIcon sx={{ color: '#180E95', cursor: 'pointer', marginLeft: 'auto' }} 
                 onClick={() => {
                  // Open the delete post dialog when MoreVertIcon is clicked
                  setDeletePostDialogOpen(true);
                  // Set the selected post ID for deletion
                  setSelectedPostId(post._id);
                }}/>
              </Box>


              <Dialog open={deletePostDialogOpen} onClose={() => setDeletePostDialogOpen(false)}>
                <DialogTitle>Delete Post</DialogTitle>
                {/* <DialogContent>
                  <Typography>
                    Are you sure you want to delete this post?
                  </Typography>
                </DialogContent> */}
                <DialogActions>
                  <Button onClick={() => setDeletePostDialogOpen(false)} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={() => handleDeletePost(selectedPostId)} color="primary">
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>

              <Box sx={{ marginTop: '10px', p: 2 }}>
                {post.text && (
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: 'Aleo, sans-serif',
                      fontSize: '16px',
                      fontWeight: '400',
                      lineHeight: '20px',
                      letterSpacing: '0em',
                      textAlign: 'left',
                      // marginTop: '10px',
                    }}
                  >
                    {post.text}
                  </Typography>
                )}

                {post.images && post.images.length > 0 && (
                  <Box sx={{ marginTop: '5px' }}>
                    {post.images.map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt='post'
                        // alt={`post-image-${index}`}
                        style={{ width: '100%', borderRadius: '10px' }}
                      />
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Post;
