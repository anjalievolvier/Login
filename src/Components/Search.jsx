import React, { useState,} from 'react'
import { TextField, Typography, Grid, Box, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';


const Search = ({ user, fetchPosts }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

   

  //////////////////////searching  for user

  const handleSearch = async () => {
    console.log('inside handle search');
    // Fetch user search results based on the searchQuery
    const response = await fetch(`http://localhost:8000/users/search?query=${searchQuery}`);////search?query=john,search query name of person i searched
    if (response.status === 200) {
      const searchData = await response.json();
      console.log('searchData', searchData);
      setSearchResults(searchData.users);
    } else {
      console.error('Error searching for users');
    }
  };
 


  ////////////////////////////handle follow
  // const authToken = localStorage.getItem('authToken'); // Get the authentication token from local storage
  const userId = localStorage.getItem('userId');
  const handleFollow = async (otherUserId) => {
    // You'll need to send a request to your server to update the user's follow list.
    // console.log('inside handleFollow client');
    const response = await fetch(`http://localhost:8000/users/follow/${userId}/${otherUserId}`, {
      method: 'POST',
    });//otherUserId represents the ID of the user that you want to follow.
    if (response.status === 200) {
      console.log('successfully followed user');
      fetchPosts()
      setSearchResults(null);
    } else {
      console.error('Error following users');
    }
    ;
  }
  ///////Unfollow
  const handleUnfollow = async (otherUserId) => {
    const response = await fetch(`http://localhost:8000/users/unfollow/${userId}/${otherUserId}`, {
      method: 'POST',
    });
  
    if (response.status === 200) {
      console.log('Successfully unfollowed user');
      alert('User Unfollowed');
      fetchPosts();
      setSearchResults(searchResults.filter(user => user._id !== otherUserId));
    } else {
      console.error('Error unfollowing user');
    }
  };
  
  
  return (
    <Grid container marginBottom={'20px'}>
      <TextField
        label={(<Typography sx={{
          color: '#C0C0C0',
          fontFamily: 'Aleo, sans-serif',
          fontSize: '18px',
          fontStyle: 'normal',
          fontWeight: '400',
          lineHeight: '21.78px',
          marginRight: '100px',
        }}>Search friends
        </Typography>)}

        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder='search' variant='outlined'
        sx={{
          width: '100%',
          flexShrink: 0,
          borderRadius: '10px',
          background: '#FFFFFF',
          border: '1px solid #DEDEDE',
          marginTop: '30px',
          outline: 'none'
        }}
        InputProps={{

          endAdornment: (

            <InputAdornment position="end">
              <SearchIcon 
              onClick={handleSearch}
               sx={{ color: '#180E95', cursor: 'pointer' }} />
            </InputAdornment>),

        }}>

      </TextField>
      {searchResults?.map((users) => (

        <Box key={users._id}
          sx={{
            width: '100%',
            borderRadius: '0px 0px 12px 12px',
            backgroundColor: '#FFFFFF',
            boxShadow: 4,
            display: 'flex',
            flexDirection: 'column',
            p: 3,
            marginTop: '10px'
          }}>

          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Avatar
              src={users.imagePath && users.imagePath[0] ? users.imagePath[0].url : ''}
              sx={{
                width: '47px',
                height: '47px',
                borderRadius: '160px',
                background: '#D9D9D9',

              }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', }}>
              <Typography
                sx={{
                  fontFamily: 'Aleo, sans-serif',
                  fontSize: '18px',
                  fontWeight: '700',
                  lineHeight: '23px',
                  letterSpacing: '0em',
                  textAlign: 'left',
                  textTransform: 'capitalize',
                  marginRight: '400px'

                }}
              >
                {users.firstname} {users.lastname}
              </Typography>

              <Typography sx={{
                fontFamily: 'Aleo, sans-serif',
                fontSize: '14px',
                fontWeight: '400',
                lineHeight: '23px',
                letterSpacing: '0em',
                textAlign: 'left',

              }}> {users.email}</Typography>
            </Box>
            {userId !== users._id ? (
              <React.Fragment>
                {/* {console.log('User ID::::::', users._id)}
                {console.log('Followlist::::::::', user.followlist)}
                {console.log('Is Friend:', user.followlist.includes(user._id))}
                {console.log(typeof user._id)}
                {console.log(typeof user.followlist[0])} */}

                {user.followlist.includes(users._id) ? (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row'
                    }}
                  >
                    <Box sx={{
                      color: '#202020',
                      fontFamily: 'Aleo, sans-serif',
                      fontSize: '15px',
                      fontStyle: 'normal',
                      fontWeight: '600',
                      lineHeight: 'normal',
                      textTransform: 'capitalize',
                      border: '1px solid black',
                      p: '10px',
                      marginRight:'10px'
                    }}>Friend</Box>
                    <Button variant="outlined" onClick={() => handleUnfollow(users._id)} sx={{
                    color: '#202020',
                    fontFamily: 'Aleo, sans-serif',
                    fontSize: '15px',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    lineHeight: 'normal',
                    textTransform: 'capitalize',
                    border: '1px solid black',
                  }}> Unfollow
                  </Button>
                  </Box>
                ) : (
                  <Button variant="outlined" onClick={() => handleFollow(users._id)} sx={{
                    color: '#202020',
                    fontFamily: 'Aleo, sans-serif',
                    fontSize: '15px',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    lineHeight: 'normal',
                    textTransform: 'capitalize',
                    border: '1px solid black',
                  }}>
                    {users._id === userId ? 'View Profile' : 'Follow'}
                  </Button>
                )}
              </React.Fragment>
            ) : (
              <Button variant="outlined"
                component={Link}
                to="/home"
                sx={{
                  color: '#202020',
                  fontFamily: 'Aleo, sans-serif',
                  fontSize: '15px',
                  fontStyle: 'normal',
                  fontWeight: '600',
                  lineHeight: 'normal',
                  textTransform: 'capitalize',
                  border: '1px solid black',
                }}>
                View Profile
              </Button>
            )}
          </Box>



        </Box>
        // </Box>


      ))}
    </Grid>
  )
}
export default Search