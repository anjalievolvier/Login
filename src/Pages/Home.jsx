import React, { useState, useEffect } from 'react';
import { Link,useLocation } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const location = useLocation();
  const userId = location.state.userId;

  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    // Fetch the user details using the user ID
    if (userId) {
      axios.get(`http://localhost:8000/user/${userId}`)
        .then((response) => {
          setUser(response.data);
          // Initialize editedUser with the fetched user data
          setEditedUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  }, [userId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // Reset editedUser to the original user data
    setEditedUser(user);
  };

  const handleSaveClick = async () => {
    try {
      // Send a PUT request to update the user's profile
      const response = await axios.put(`http://localhost:8000/user/${userId}`, editedUser);

      // Update the user with the updated data
      setUser(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the editedUser object when input fields change
    setEditedUser({ ...editedUser, [name]: value });
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome,</h1>
          <p>Name:{isEditing ? <input type="text" name="firstname" value={editedUser.firstname} onChange={handleInputChange} /> : user.firstname}
          
          {isEditing ? <input type="text" name="lastname" value={editedUser.lastname} onChange={handleInputChange} /> : user.lastname}</p>
          <p>Email: {isEditing ? <input type="email" name="Email" value={editedUser.email} onChange={handleInputChange} />:user.email}</p>
          <p>Password: {isEditing ? <input type="password" name="Password" value={editedUser.password} onChange={handleInputChange} />:user.password}</p>
          <p>Gender: {isEditing ? <input type="text" name="Gender" value={editedUser.gender} onChange={handleInputChange} />:user.gender}</p>
          <p>Phone: {isEditing ? <input type="number" name="Phone" value={editedUser.phone} onChange={handleInputChange} />:user.phone}</p>
          {isEditing ? (
            <div>
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </div>
          ) : (
            <button onClick={handleEditClick}>Edit Profile</button>
          )}
          <br/>
          <Link to="/">Logout</Link>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default Home;

