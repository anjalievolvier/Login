import React, { useState } from 'react';
import { Box, Grid, Typography, Avatar, Button } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InputAdornment from '@mui/material/InputAdornment';
import Comments from './Comments';


const Post = ({ posts, fetchPosts }) => {
  console.log('comments;;;',posts)
  const [newComment, setNewComment] = useState('');
  const [userId] = useState(localStorage.getItem('userId'));
  const [deletePostDialogOpen, setDeletePostDialogOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  // const [likeCounts, setLikeCounts] = useState({});
  const [likedPosts, setLikedPosts] = useState([]);
  const handleLikeClick = async (postId) => {
    try {
      // Make the asynchronous call
      const response = await fetch('http://localhost:8000/posts/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, userId }),
      });

      // Check the response and update state accordingly
      if (response.status === 200) {
        console.log('returned');
        const data = await response.json();
        console.log('Number of likes for post with ID', postId, 'is', data.likes);
        // setLikeCounts((prevLikeCounts) => ({
        //   ...prevLikeCounts,
        //   [postId]: data.likes,
        // }));
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
  const handleAddComment = async (postId) => {
    setSelectedPostId(postId);
    // API call to add a new comment
    try {
      const response = await fetch('http://localhost:8000/add-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          userId: userId,
          text: newComment,
        }),
      });
      if (response.status === 201) {
        setNewComment('');
        // fetchComments(postId);
        console.log('PostId', postId)
        fetchPosts()
      } else {
        console.error('Error adding comment');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
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
        console.log('post deleted///////');
        fetchPosts();
      } else {
        console.error('Error in deleting post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  const isPostLiked = (postId) => likedPosts.includes(postId);
  return (
    <Grid item key={posts._id} xs={12}>
      <Box
        sx={{
          width: '100%',
          borderRadius: '20px',
          backgroundColor: '#FFFFFF',
          boxShadow: 4,
          marginTop: '10px',
          marginBottom: '10px',
          padding: '10px'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', p: 2 }}>
          {posts.userDetails && posts.userDetails.imagePath && posts.userDetails.imagePath[0] && posts.userDetails.imagePath[0].url ? (
            <Avatar
              src={`${posts.userDetails.imagePath[0].url}?${new Date().getTime()}`}
              sx={{ width: '47px', height: '47px', borderRadius: '50%', background: '#180E95', marginRight: '20px' }}
            />
          ) : (
            <Avatar sx={{ width: '47px', height: '47px', borderRadius: '50%', background: '#180E95', marginRight: '20px' }}>
              {posts.userDetails.firstname.charAt(0).toUpperCase() + posts.userDetails.lastname.charAt(0).toUpperCase()}
            </Avatar>
          )}
          {posts.user && (
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
                {posts.userDetails.firstname} {posts.userDetails.lastname}
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
                {new Date(posts.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}

              </Typography>
            </Box>
          )}
          {posts.user && posts.user.id === userId && (
            <MoreVertIcon
              sx={{ color: '#180E95', cursor: 'pointer', marginLeft: 'auto' }}
              onClick={() => {
                setDeletePostDialogOpen(true);
                setSelectedPostId(posts._id);
              }}
            />
          )}
          <Dialog open={deletePostDialogOpen} onClose={() => setDeletePostDialogOpen(false)}>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogActions>
              <Button onClick={() => setDeletePostDialogOpen(false)} color="primary">Cancel</Button>
              <Button onClick={() => handleDeletePost(selectedPostId)} color="primary">Delete</Button>
            </DialogActions>
          </Dialog>
        </Box>

        <Box sx={{ padding: '0px 10px 10px 10px' }}>
          <Box>
            {posts.text && (
              <Typography variant="body1" sx={{ fontFamily: 'Aleo, sans-serif', fontSize: '16px', fontWeight: '400', lineHeight: '20px', letterSpacing: '0em', textAlign: 'left' }}>
                {posts.text}
              </Typography>
            )}
          </Box>
          {posts.images && posts.images.length > 0 && (
            <Box sx={{ marginTop: '5px' }}>
              {posts.images.map((image, index) => (
                <img key={index} src={image.url} alt="postedImage" style={{ width: '100%', borderRadius: '10px', marginTop: '5px' }} />
              ))}
            </Box>
          )}
        </Box>

        {/* </Box> */}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          {isPostLiked(posts._id) ? (
            <ThumbUpOffAltIcon
              onClick={() => handleLikeClick(posts._id)}
              sx={{ color: '#180E95', paddingLeft: '15px' }}
            />
          ) : (
            <ThumbUpOffAltIcon
              onClick={() => handleLikeClick(posts._id)}
              sx={{ paddingLeft: '15px' }}
            />
          )}
          <Typography sx={{ fontFamily: 'Aleo, sans-serif', fontSize: '15px', fontWeight: '400', lineHeight: '23px', letterSpacing: '0em', textAlign: 'left', marginLeft: '10px' }}>
            {posts.likeCount || 0} Likes
          </Typography>
        </div>
        <Box sx={{ padding: '10px' }}>
          <TextField
            label={
              <Typography
                sx={{
                  color: '#C0C0C0',
                  fontFamily: 'Aleo, sans-serif',
                  fontSize: '15px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: '21.78px',
                  marginRight: '100px',
                }}
              >
                Comment here
              </Typography>
            }
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
            placeholder="Comment here"
            variant="outlined"
            sx={{
              width: '100%',
              flexShrink: 0,
              borderRadius: '10px',
              background: '#FFFFFF',
              border: '1px solid #DEDEDE',
              marginTop: '10px',
              outline: 'none',
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SendIcon onClick={() => handleAddComment(posts._id)} sx={{ color: '#180E95', cursor: 'pointer' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box
          sx={{ paddingLeft: '15px' }}>
            {/* <Comments comments={posts.comments} user={posts.commentUser} /> */}
            {
              posts?.comments?.map((comments,i)=>{
                console.log('')
                if(comments.text) {
                  return(
                    <Comments key={i} comments={comments} />
                  )
                }
                else
                {
                  return null;
                }
              })

            }
            {/* {posts?.map((comments) => (
              <Comments key={comments?.id} comments={comments?.comments} user={comments?.commentUser} />
            ))} */}
        </Box>
      </Box>
    </Grid >
  );
};

export default Post;
