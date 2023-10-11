const express = require("express")
const collection = require("./mongo")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())




app.get("/", cors(), (req, res) => {

})

app.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await collection.findOne({ email: email, password: password });

        if (user) {
            console.log("User found", user);
            res.json({ message: "User exists",user:user});
        }

        else {
            console.log("User not found");
            res.json({ message: "User does not exist" });


        }

    }

    catch (e) {
        console.error("Error during login:", e);
        res.status(500).json({ message: "Login failed" });
    }

});


app.post("/signup", async (req, res) => {
    const { email, password,firstname, lastname, gender, phone } = req.body;

    const data = {
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        gender: gender,
        phone: phone
    };
    try {
        const check = await collection.findOne({ email: email });

        if (check) {
            console.log("User already exists");
            res.json({ message: "User already exists" });
        }
        else {
            
            console.log("User registered:");
            res.json( "not exist");
            await collection.insertMany([data]);
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
