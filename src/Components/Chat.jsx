import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import io from 'socket.io-client';

const socket = io('http://localhost:8001'); 

const Chat = ({ user, recipient }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Subscribe to the chat room
    socket.emit('subscribe', { sender: user._id, recipient: recipient._id });

    // Listen for incoming messages
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      // Unsubscribe when component unmounts
      socket.emit('unsubscribe', { sender: user._id, recipient: recipient._id });
    };
  }, [user._id, recipient._id]);

  const sendMessage = () => {
    // Send the message to the server
    socket.emit('message', { sender: user._id, recipient: recipient._id, text: newMessage });
    setNewMessage('');
  };

  return (
    <Box>
      <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.sender === user._id ? 'You' : recipient.firstname}</strong>: {message.text}
          </div>
        ))}
      </div>
      <TextField
        label="Type your message"
        variant="outlined"
        fullWidth
        margin="normal"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={sendMessage}>
        Send
      </Button>
    </Box>
  );
};

export default Chat;
