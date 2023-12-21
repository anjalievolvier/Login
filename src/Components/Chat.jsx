import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, InputAdornment, IconButton, Avatar, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import io from 'socket.io-client';

const socket = io('http://localhost:8001');

const Chat = ({ user, recipient, roomId, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatBoxRef = useRef(null);

  const fetchMessages = async () => {
    try {
      // Fetch messages from the server
      const response = await fetch(`http://localhost:8000/chat/messages/${roomId}`);
      const data = await response.json();
      setMessages(data);
      scrollToBottom();
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    // Fetch previous messages when the component mounts
    fetchMessages();

    // Subscribe to the chat room
    socket.emit('subscribe', { sender: user._id, recipient: recipient._id, roomId });

    // Listen for incoming messages
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom();
    });

    return () => {
      // Unsubscribe when the component unmounts
      socket.emit('unsubscribe', { sender: user._id, recipient: recipient._id, roomId });
      socket.off('message');
    };
  }, [user._id, recipient._id, roomId]);

  const sendMessage = () => {
    // Send the message to the server
    socket.emit('message', { sender: user._id, recipient: recipient._id, text: newMessage });
    // Save the message to the database
    saveMessage({ sender: user._id, roomId: roomId, recipient: recipient._id, text: newMessage });
    setNewMessage('');
    fetchMessages();
  };

  const saveMessage = async (message) => {
    try {
      await fetch('http://localhost:8000/chat/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
      fetchMessages();
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };
  console.log('hgdfhgafkj',messages)

  const scrollToBottom = () => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        marginRight: '100px',
        bottom: '10px',
        right: '10px',
        width: '300px',
        height: '400px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        boxShadow: 4,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header with recipient's profile picture, name, and close icon */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px',
          backgroundColor: '#180E95',
          padding: '10px',
          borderRadius: '10px 10px 0 0',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={`${recipient.imagePath[0].url}?${new Date().getTime()}`} />
          <Box sx={{ marginLeft: '10px' }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: '#FFF',
                fontFamily: 'Aleo, sans-serif',
                fontSize: '18px',
                fontWeight: '700',
                lineHeight: '23px',
                letterSpacing: '0em',
                textAlign: 'left',
                textTransform: 'capitalize',
              }}
            >
              {recipient.firstname} {recipient.lastname}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: '#FFF' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box
        ref={chatBoxRef}
        sx={{ flex: 1, overflowY: 'scroll', padding: '10px',display:'flex',flexDirection:'column' }}
      >
        {/* <Avatar
              src={`${recipient.imagePath[0].url}?${new Date().getTime()}`}
              sx={{
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                background: '#180E95',
                marginRight: '20px',
              }}
            /> */}
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              margin: '10px',
              borderRadius: '100px',
              padding: '7px 15px',
              alignSelf: message.senderId === user._id ? 'flex-end' : 'flex-start',
              backgroundColor: message.senderId === user._id ? '#D5FFD0' : '#CAEDFF',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'Aleo, sans-serif',
                fontSize: '15px',
                fontWeight: '700',
                lineHeight: '24px',
                letterSpacing: '0em',
                textTransform: 'capitalize',
                
              }}
            >
              {message.senderId === user._id ? user.firstname : recipient.firstname}:
            </Typography>
            <Typography
            sx={{
              fontFamily: 'Aleo, sans-serif',
              fontSize: '15px',
              fontWeight: '400',
              lineHeight: '24px',
              letterSpacing: '0em',
              textTransform: 'capitalize',
              marginLeft:'5px',
            }}
            >{message.text}</Typography>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          padding: '0 25px 0 10px',
        }}
      >
        <TextField
          placeholder="Type your message"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={sendMessage}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            width: '100%',
            borderRadius: '0 0 10px 10px',
            marginLeft: '10px',
            marginRight: '10px',
          }}
        />
      </Box>
    </Box>
  );
};

export default Chat;
