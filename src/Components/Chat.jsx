import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, InputAdornment, IconButton,} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
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

  const scrollToBottom = () => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        marginRight:'100px',
        bottom: '10px',
        right: '10px',
        width: '300px',
        height: '400px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '10px',
        zIndex: 999,
        backgroundColor: '#ffffff',
        boxShadow:4,
      }}
    >
      <Box
        ref={chatBoxRef}
        style={{ height: '300px', overflowY: 'scroll', padding: '10px' }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              margin: '10px',
              width: '80%',
              border: '1px solid #ccc',
              background: '#F8F7F7',
              borderRadius: '10px',
              padding: '10px',
            }}
          >
            <strong>{message.senderId === user._id ? user.firstname : recipient.firstname}</strong>: {message.text}
          </Box>
        ))}
      </Box>
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
      />
      <IconButton onClick={onClose} sx={{ marginTop: '10px' }}>
        Close
      </IconButton>
    </Box>
  );
};

export default Chat;
