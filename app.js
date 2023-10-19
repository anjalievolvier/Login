const express = require("express")
const collection = require("./mongo")
const cors = require("cors")
const app = express()
const bcrypt = require("bcrypt");

const crypto = require('crypto');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// const tokenLength = 25; // Customize this as needed


app.get("/", cors(), (req, res) => {

})



app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await collection.findOne({ email: email });


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
          user.authToken = authToken;
          user.authTokenExpiration = expirationDate;

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


app.post("/signup", async (req, res) => {
  const { email, password, firstname, lastname, gender, phone } = req.body;
  try {
    const check = await collection.findOne({ email: email });

    if (check) {
      console.log("User already exists");
      res.json({ message: "User already exists" });
    }
    else {

      // console.log("User registered:");
      // res.json( "not exist");
      // await collection.insertMany([data]);
      // Hash the password before saving it
      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) {
          console.error("Error hashing password:", err);
          res.status(500).json({ message: "Internal server error" });
        } else {
          const data = {
            email: email,
            password: hashedPassword, // Save the hashed password
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            phone: phone
          };

          console.log("User registered:");
          res.json("not exist");
          await collection.insertMany([data]);
        }
      });
    }

  }
  catch (e) {
    console.error("Error during signup:", e);
    res.status(500).json({ message: "Signup failed" });
  }

});
app.get("/user/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    // Use the userId to find the user in the MongoDB collection
    const user = await collection.findOne({ _id: userId });

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
    const user = await collection.findOne({ _id: userId });

    if (user) {
      // Remove the authentication string and expiration date from the user's record
      user.authToken = null;
      user.authTokenExpiration = null;
      await user.save();

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
    const updatedUserData = await collection.findOneAndUpdate(
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


app.listen(8000, () => {
  console.log("Server is running on port 8000");
})
