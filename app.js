const express = require("express")
// const collection = require("./mongo")
// const post = require('./mongo'); 
const mongo = require("./mongo")
const cors = require("cors")
const app = express()
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const { ObjectId } = require('mongodb');
// const multer = require("multer"); // Import multer for handling file uploads
const path = require("path");
const fileUpload = require('express-fileupload');

 const fs = require("fs");
// const { promisify } = require("util");
app.use(fileUpload());


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.get("/", cors(), (req, res) => {

})


//Login
app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await mongo.collection.findOne({ email: email });


    if (user) {

      // Compare the hashed password with the provided password
      bcrypt.compare(password, user.password, async (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          res.status(500).json({ message: "Login failed" });
        }

        else if (result) {
          // Generate a random authentication string
          const authToken = crypto.randomBytes(10).toString('hex');

          // Set the expiration date for the authentication string 
          const expirationDate = new Date();
          expirationDate.setHours(expirationDate.getHours() + 24);

          // Store the authentication string and expiration date in the user's record
          user.tokens.push({ token: authToken, expiration: expirationDate });
          await user.save();

          // Return the user details and the authentication string to the client
          res.json({
            message: "User authenticated",
            user: user,
            authToken: authToken,
            authTokenExpiration: expirationDate,
          });

          // console.log("User found", user);
          //   res.json({message: "User exists",user});
        }
        else {
          // Passwords don't match, invalid credentials
          console.log("Invalid credentials");
          res.json({ message: "Invalid credentials" });
        }
      });
    }
    else {
      console.log("user not found");
      res.json({ message: "user does not exist" });
    }

  }

  catch (e) {
    console.error("Error during login:", e);
    res.status(500).json({ message: "login failed" });
  }

});

//signup
app.post("/signup", async (req, res) => {
  const { email, password, firstname, lastname, gender, phone } = req.body;
  try {
    const check = await mongo.collection.findOne({ email: email });

    if (check) {
      console.log("User already exists");
      res.json({ message: "User already exists" });
    }
    else {

      // Hash the password before saving it
      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) {
          console.error("Error hashing password:", err);
          res.status(500).json({ message: "Internal server error" });
        } 
        else {
          const data = {
            email: email,
            password: hashedPassword, // Save the hashed password
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            phone: phone
          };

          // const newUser = new collection(data);
          // await newUser.save();

          console.log("User registered:");
          res.json("not exist");
          await mongo.collection.insertMany([data]);
        }
        
      });
    }

  }
  catch (e) {
    console.error("Error during signup:", e);
    res.status(500).json({ message: "Signup failed" });
  }

});
//userDetails fetching
app.get("/user/:id", async (req, res) => {

  const userId = req.params.id;
  try {

    // Use the userId to find the user in the MongoDB collection
    const user = await mongo.collection.findOne({ _id: userId });
    if (user) {

      // Send the user details as JSON response
      res.json(user);

    } else {

      // If user is not found, return a 404 status and an error message

      res.status(404).json({ message: "User not found" });
    }
  } catch (e) {

    console.error("Error fetching user details:", e);
    res.status(500).json({ message: "Internal server error" });

  }
});
// Logout route
app.post("/logout", async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await mongo.collection.findOne({ _id: userId });

    if (user) {
      // Remove the authentication string and expiration date from the user's record
      user.tokens = [];
      await user.save();
      // localStorage.removeItem('authToken');

      res.json({ message: "User logged out successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (e) {
    console.error("Error during logout:", e);
    res.status(500).json({ message: "Logout failed" });
  }
});

// Define a route for updating user profile
app.put("/user/:id", async (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body; // This should contain the updated user data

  try {
    // Use MongoDB update methods (e.g., findOneAndUpdate) to update the user
    const updatedUserData = await mongo.collection.findOneAndUpdate(
      { _id: userId },
      { $set: updatedUser },
      { new: true } // Return the updated user data
    );

    if (updatedUserData) {
      // If the user is updated successfully, send the updated data as JSON response
      res.json(updatedUserData);
    } else {
      // If the user is not found, return a 404 status and an error message
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Define the route for uploading user avatars

const permanentUploadsPath = path.join(__dirname, 'uploads');

app.post('/uploadimage', async (req, res) => {
  console.log('server');
  const { userId } = req.body;
  const user = await mongo.collection.findOne({ _id: userId });
  if (user) {
    // console.log('insideuser');

    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const uploadedImage = req.files.image;
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const imagePath = path.join(permanentUploadsPath, uniqueSuffix + uploadedImage.name);

    // Move the uploaded image to the permanent location
    uploadedImage.mv(imagePath, (err) => {

      if (err) {
        console.error('Error while saving the file:', err);
        return res.status(500).json({ error: 'Error while saving the file', details: err.message });
      }

      const imageUrl = `http://localhost:8000/uploads/${uniqueSuffix + uploadedImage.name}`;

      // Update the user's image path with the URL
      user.imagePath=[];
      user.imagePath.unshift({
        url: imageUrl,
      });

      // Save the user with the updated image path
      user.save();

      console.log('Image uploaded successfully');
      return res.status(200).json({ message: 'Image uploaded successfully', imageUrl });
    });
  }
  else {
    res.status(404).json({ message: "User not found" });
  }
}



);
// Serve uploaded images
app.use('/uploads', express.static(permanentUploadsPath));


// delete profile picture
app.delete('/deleteimage', async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await mongo.collection.findOne({ _id: userId });

    if (user) {
      if (user.imagePath && user.imagePath.length > 0) {
        const imagePath = user.imagePath[0].url.replace('http://localhost:8000/uploads/', '');
        const filePath = path.join(permanentUploadsPath, imagePath);

        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting the file:', err);
            return res.status(500).json({ error: 'Error deleting the file', details: err.message });
          }

          // Remove the image path from the user's record
          user.imagePath = [];
          user.save();

          console.log('Profile picture deleted successfully');
          return res.status(200).json({ message: 'Profile picture deleted successfully' });
        });
      } else {
        res.status(400).json({ message: "No profile picture found" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error('Error deleting profile picture:', error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//create post

// Define a route for creating a new post
app.post('/posts', async (req, res) => {
  // console.log('inside post server');
  const { userId, text } = req.body;
  const user = await mongo.collection.findOne({ _id: userId });

  if (user) {
    // console.log('inside user');
    if (!req.files || !req.files.image) {
      const newPost = new mongo.post({
        username: user.firstname,
        user: userId,
        text:text,
        images: [], // Empty array for images since there is no image
      });
      //console.log('Text:',newPost);
      // console.log('help');
      // return res.status(400).json({ message: 'Both content and image are required' });

      newPost.save()
        .then((savedPost) => {
          res.status(200).json({ message: 'New post created successfully', savedPost: savedPost,user:user });
        })
        .catch((err) => {
          console.error('Error creating a new post:', err);
          res.status(500).json({ message: 'Error creating a new post' });
        });
      
    }
    else{
   
    const uploadedImage = req.files.image;
    console.log('uploadimage:',uploadedImage);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const imagePath = path.join(__dirname, 'uploads', uniqueSuffix + uploadedImage.name);
    //console.log('imagepath');

    // Move the uploaded image to the permanent location
    uploadedImage.mv(imagePath, (err) => {
      if (err) {
        console.error('Error while saving the file:', err);
        return res.status(500).json({ error: 'Error while saving the file', details: err.message });
      }

      // Construct the URL of the uploaded image
      const imageUrl = `http://localhost:8000/uploads/${uniqueSuffix + uploadedImage.name}`;

      // Remove the existing imagePath (if any)
      user.imagePath = [];

      // Create a new post and save it to MongoDB
      const newPost = new mongo.post({
        username:user.firstname,
        user: userId,
        text:text,
        images: [
          {
            url: imageUrl,
            description: 'Description for the uploaded image',
          },
        ],
      });
      newPost.save()
  .then((savedPost) => {
    console.log('success');
    res.status(200).json({ message: 'New post created successfully', savedPost: savedPost,user:user });
  })
  .catch((err) => {
    console.error('Error creating a new post:', err);
    res.status(500).json({ message: 'Error creating a new post' });
  });
    });
  }
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

  //Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/////////////////Fetch posts
app.get('/fetchposts/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the logged-in user
    const user = await mongo.collection.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find posts for the logged-in user
    const userPosts = await mongo.post.find({ user: userId }).populate('user');

    // Find posts for users in the user's followlist
    const followedPosts = await mongo.post.find({ user: { $in: user.followlist } }).populate('user');

    // Combine and sort the posts by timestamp
    const allPosts = [...userPosts, ...followedPosts].sort((a, b) => b.timestamp - a.timestamp);

    // Return user details along with posts
    res.status(200).json({ posts: allPosts, user: { _id: user._id, firstname: user.firstname, lastname: user.lastname, imagePath: user.imagePath } });
  } catch (error) {
    console.error('Error fetching posts for the feed:', error);
    res.status(500).json({ message: 'Error fetching posts for the feed' });
  }
});


//////////////// user search
app.get('/users/search', async (req, res) => {
  const query = req.query.query;
  console.log('inside search server');

  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    const searchResults = await mongo.collection.find({
      $or: [
        {
          $or: [
            { firstname: { $regex: new RegExp(query, 'i') } },
            { lastname: { $regex: new RegExp(query, 'i') } },
          ],
        },
        {
          $and: [
            { firstname: { $regex: new RegExp(query.split(' ')[0], 'i') } },
            { lastname: { $regex: new RegExp(query.split(' ')[1], 'i') } },
          ],
        },
        {
          $and: [
            { firstname: { $regex: new RegExp(query.split(' ')[1], 'i') } },
            { lastname: { $regex: new RegExp(query.split(' ')[0], 'i') } },
          ],
        },
      ],
    });

    console.log('searchResults', searchResults);
    res.json({ users: searchResults });
  } catch (error) {
    console.error('Error fetching users from the database:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});



//////////// to follow user

app.post('/users/follow/:userId/:otherUserId', async (req, res) => {
  const userId = req.params.userId; // The ID of the user who wants to follow
  const otherUserId = req.params.otherUserId; // The ID of the user to be followed

  try {
    // Find the user who wants to follow
    const user = await mongo.collection.findOne({ _id: userId });

    // Find the user to be followed
    const otherUser = await mongo.collection.findOne({ _id: otherUserId });

    if (!user || !otherUser) {
      return res.status(404).json({ message: 'User(s) not found' });
    }

    // Check if the user is already following the other user
    const isFollowing = user.followlist.includes(otherUserId);

    if (isFollowing) {
      return res.status(400).json({ message: 'User is already following the other user' });
    }

    // Add the other user's ID to the user's followlist
    user.followlist.push(otherUserId);
    await user.save();

    res.status(200).json({ message: 'User is now following the other user' });
  } catch (error) {
    console.error('Error following user:', error);
    res.status(500).json({ message: 'Error following user' });
  }
});

///////////////// Unfollow User

app.post('/users/unfollow/:userId/:otherUserId', async (req, res) => {
  const userId = req.params.userId;
  const otherUserId = req.params.otherUserId;

  try {
    const user = await mongo.collection.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // console.log('Before unfollow:', user.followlist);

    // Convert otherUserId to ObjectId for comparison
    const otherUserIdObject = new ObjectId(otherUserId);

    // Check if the user is not following the other user
    const isNotFollowing = !user.followlist.map(id => id.toString()).includes(otherUserIdObject.toString());

    if (isNotFollowing) {
      return res.status(400).json({ message: 'User is not following the other user' });
    }

    // Remove the other user's ID from the user's followlist
    user.followlist = user.followlist.filter(id => id.toString() !== otherUserIdObject.toString());
    await user.save();

    // console.log('After unfollow:', user.followlist);

    res.status(200).json({ message: 'User has unfollowed the other user' });
  } catch (error) {
    console.error('Error unfollowing user:', error);
    res.status(500).json({ message: 'Error unfollowing user' });
  }
});
///////////////////////delete post
app.delete('/delete/posts/:postId', async (req, res) => {
  const postId = req.params.postId;


  try {
   
    await mongo.post.findByIdAndDelete(postId);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.listen(8000, () => {
  console.log("Server is running on port 8000");
})
