import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Box, List, ListItem, ListItemText } from '@mui/material';
import Chat from './Chat';
import io from 'socket.io-client';
const socket = io('http://localhost:8001'); 

const ChatList = ({ followList,user }) => {
  const [followingDetails, setFollowingDetails] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchFollowingDetails = async () => {
      try {
        const promises = followList.map(async (userId) => {
          try {
          
            const response = await axios.get(`http://localhost:8000/user/${userId}`);
            return response.data;
          } catch (error) {
            // Handle errors gracefully, e.g., log them and continue with the next user
            console.error(`Error fetching user details for userId ${userId}:`, error);
            return null;
          }
        });

        const details = await Promise.all(promises);

        // Filter out null values (users not found) before setting the state
        setFollowingDetails(details.filter((user) => user !== null));
      } catch (error) {
        console.error('Error fetching following details:', error);
      }
    };

    if (followList && followList.length > 0) {
      fetchFollowingDetails();
    }
  }, [followList]);

  const handleUserClick = async (recipient) => {
    try {
      // Send a request to the server to create/retrieve a chat room
      const response = await axios.post('http://localhost:8000/chat/create', {
        user1: user._id,
        user2: recipient._id,
      });

      const roomId = response.data.roomId;

      // Join the chat room
      socket.emit('subscribe', { sender: user._id, recipient: recipient._id });

      setSelectedUser({ ...recipient, roomId });
    } catch (error) {
      console.error('Error creating/retrieving chat room:', error);
    }
  };
  const handleCloseChat = () => {
    // Unsubscribe from the chat room when closing
    socket.emit('unsubscribe', { sender: user._id, recipient: selectedUser._id, roomId: selectedUser.roomId });
    setSelectedUser(null);
  };
// console.log('roomId',selectedUser.roomId)
  return (
    <div>
      <List>
      {followingDetails.map((user) => (
        <Box
          key={user._id}
          sx={{
            border: '1px solid #ccc', 
            borderRadius: '8px',
            marginBottom: '10px',
          }}
          onClick={() => handleUserClick(user)}
        >
          <ListItem alignItems="flex-start">
            <Avatar
              sx={{
                marginRight: '15px',
              }}
              src={user.imagePath && user.imagePath.length > 0 && user.imagePath[0].url}
            />
            <ListItemText
              primary={`${user.firstname} ${user.lastname}`}
              style={{
                color: '#000000',
                fontFamily: 'Aleo, sans-serif',
                fontSize: '20px',
                fontStyle: 'normal',
                fontWeight: '700',
                lineHeight: 'normal',
                textTransform: 'capitalize',
              }}
            />
          </ListItem>
        </Box>
      ))}
    </List>
    {selectedUser && <Chat user={user} recipient={selectedUser} roomId={selectedUser.roomId}  onClose={handleCloseChat}/>}
    </div>
  );
};

export default ChatList;
