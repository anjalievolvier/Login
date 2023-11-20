import React, { useEffect} from 'react'
import { Typography, Box, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { useState } from 'react';
import { useNavigate, } from "react-router-dom"
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SignupForm from './SignupForm';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';


function UserDetails({ user, authToken, setAuthToken, }) {

  const [isEditing, setIsEditing] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [imageUrl, setImageUrl] = useState(imagePath ? imagePath : (user.imagePath && user.imagePath[0] && user.imagePath[0].url) || '');

  useEffect(() => {
    let imageUrl = imagePath ? imagePath : (user.imagePath && user.imagePath[0] && user.imagePath[0].url) || '';
    setImageUrl(imageUrl);
  }, [imagePath, user.imagePath]);

  

  
  

  const handleEditClick = () => {
    setIsEditing(true);

  };

  const handleClose = () => {
    setIsEditing(false);
  };

  const history = useNavigate();


  const handleLogoutClick = async () => {
    try {

      const response = await fetch("http://localhost:8000/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id }),
      });


      if (response.status === 200) {
        // Clear the token from local storage
        localStorage.removeItem('authToken');

        // Update the authentication state to indicate the user is not authenticated
        setAuthToken(null);


        history('/login');
      } else {
        // Handle the case where the logout request on the server failed
        console.error("Logout failed on the server");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  //image upload

  const handleAvatarChangeAndUpload = async (event) => {
    // console.log('hlo');
    if (event.target.files && event.target.files.length > 0) {
      // console.log('inside');
      const file = event.target.files[0];
      setSelectedAvatar(file);
      console.log('avatar', selectedAvatar);
      const formData = new FormData();
      formData.append('image', file);
      formData.append('userId', user._id);
      try {
        // console.log('inside try');
        const response = await axios.post('http://localhost:8000/uploadimage', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authToken}`,
          },
          // body: JSON.stringify({ userId: user._id }),
        });

        console.log("response ::: ", response)


        if (response.status === 200) {
          setImagePath(response.data.imageUrl);
          console.log('path', imagePath);
          // console.log('path',response.data.imagePath);
          console.log('Image uploaded successfully');
        } else {
          // Handle errors
          console.error('Image upload failed on the server');
        }
      } catch (error) {
        console.error('Error during image upload:', error);
      }
    } else {
      console.log('No file selected');
    }
  };

  console.log(user);
  console.log('imagepath', user.imagePath);

  console.log("imageUrl :::: ", imageUrl, imagePath)

  const handleDeleteProfilePicture = async () => {
    alert("Do you want to remove Profile picture ?")
    try {
      const response = await axios.delete('http://localhost:8000/deleteimage', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: { userId: user._id },
      });

      if (response.status === 200) {
        // Picture deleted successfully
        setImageUrl(null); // Set the image URL to null
      } else {
        // Handle errors
        console.error('Profile picture deletion failed on the server');
      }
    } catch (error) {
      console.error('Error during profile picture deletion:', error);
    }
  };


  return (
    <Box
      sx={{
        borderRadius: '20px',
        border: '5px solid #180E95',
        background: '#FFF',
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'center', sm: 'center' },
        padding: '20px',
      }}>
      <Box display={'flex'} flexDirection={{ xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' }} gap={'20px'}>
        <Box sx={{position:'relative'}}>
          {imageUrl ? (

            // Display the uploaded avatar 
            <Avatar src={`${imageUrl}?${new Date().getTime()}`} sx={{ width: '150px', height: '150px', fontSize: '50px' }} />


          ) : (
            // Display the user's avatar
            <Avatar sx={{ width: '150px', height: '150px', fontSize: '50px', background: '#180E95' }}>
              {user.firstname.charAt(0).toUpperCase() + user.lastname.charAt(0).toUpperCase()}
            </Avatar>)}

          <input
            type="file"
            accept="image/*"
            //onChange={handleAvatarChange}
            onChange={handleAvatarChangeAndUpload}
            style={{ display: 'none' }} // Hide the input
            id="avatar-upload-input"

          />
          <label htmlFor="avatar-upload-input" sx={{ cursor: 'pointer' }}>
            <div
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30px',
                height: '30px',
                backgroundColor: '#0E9B9',
                borderRadius: '50%',
                cursor: 'pointer',
               
              }}
            >
              <span
                sx={{
                  color: 'white',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  

                }}>
                <AddAPhotoIcon sx={{position:'absolute',top:'125px',left:'100px'}}/>
              </span>
            </div>
          </label>
          <Button
            variant="outlined"
            onClick={handleDeleteProfilePicture}
            sx={{
              color: 'black',
              // lineHeight: 'normal',
              border: 'none',
            }}
          >
            <DeleteIcon />
          </Button>
        </Box>


        <Box>
          <Typography
            sx={{
              color: '#000',
              fontFamily: 'Aleo, sans-serif',
              fontSize: '35px',
              fontStyle: 'normal',
              fontWeight: '700',
              lineHeight: 'normal',
              textTransform: 'capitalize',
            }}>
            {user.firstname} {user.lastname}
          </Typography>

          <Typography sx={{
            color: '#000',
            fontFamily: 'Aleo, sans-serif',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'normal',
          }}>
            {user.email}
          </Typography>

          <Typography sx={{
            color: '#000',
            fontFamily: 'Aleo, sans-serif',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'normal',
          }}>
            +91{' '}
            {user.phone}
          </Typography>

          <Typography sx={{
            color: '#000',
            fontFamily: 'Aleo, sans-serif',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'normal',
          }}>
            {user.gender === 'female' ? (
              <FemaleIcon fontSize="inherit" color="#0E9B9" />
            ) : (
              <MaleIcon fontSize="inherit" color="#0E9B9" />
            )}  {user.gender}
          </Typography>
        </Box>
      </Box>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} gap={'10px'}
        sx={{ marginTop: { xs: '20px', sm: '20px' } }}>
        <Button onClick={handleEditClick}
          sx={{
            color: '#202020',
            fontFamily: 'Aleo, sans-serif',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: 'normal',
            textTransform: 'capitalize',
            border: '2px solid #000',
            marginBottom: '10px'
          }}>Edit Details</Button>

        <Dialog open={isEditing} onClose={handleClose}
        // maxWidth={'sm'} 
        // fullWidth
        >
          <DialogTitle
            sx={{
              color: '#202020',
              fontFamily: 'Aleo, sans-serif',
              fontSize: '20px',
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: 'normal',
              textTransform: 'capitalize',
            }}>
            Edit Profile</DialogTitle>
          <DialogContent>
            <SignupForm userData={user} onClose={handleClose} />
          </DialogContent>
        </Dialog>
        <Button
          onClick={handleLogoutClick}
          sx={{
            paddingLeft: '25px',
            paddingRight: '25px',
            color: '#202020',
            fontFamily: 'Aleo, sans-serif',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: 'normal',
            textTransform: 'capitalize',
            border: '2px solid #000'
          }}
        > LogOut</Button>
      </Box>
    </Box>
  )
}

export default UserDetails