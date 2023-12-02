import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';

const Comments = ({ comments }) => {
    // console.log("user",user);
    // console.log("skjhdfh",comments);
  return (  
    <>
     <Box
          
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
            borderRadius: '20px',
          }}
        >
          {comments.profile && comments.profile[0] && comments.profile[0].url && (
            <Avatar
              src={`${comments.profile[0].url}?${new Date().getTime()}`}
              sx={{
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                background: '#180E95',
                marginRight: '20px',
              }}
            />
          )}

          <Box
            sx={{
              width: '100%',
              background: '#F8F7F7',
              borderRadius: '10px',
              padding: '10px',
            }}
          >
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
              {comments?.firstname} {comments?.lastname}
            </Typography>
            <Typography >
              {comments?.text}
            </Typography>
          </Box>
        </Box>
    </>
  );
};
export default Comments;
