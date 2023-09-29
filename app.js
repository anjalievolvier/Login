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
    const { email, password, ConfirmPassword, firstname, lastname, gender, phone } = req.body;

    const data = {
        email: email,
        password: password,
        ConfirmPassword: ConfirmPassword,
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
//   app.put("/user/:id", async (req, res) => {
//     const userId = req.params.id;
//     const updatedUserData = req.body; // The updated user information
  
//     try {
//       // Update the user's information in the MongoDB collection
//       const updatedUser = await collection.findOneAndUpdate(
//         { _id: userId },
//         { $set: updatedUserData },
//         { new: true } // Return the updated document
//       );
  
//       if (updatedUser) {
//         // Send the updated user details as JSON response
//         res.json(updatedUser);
//       } else {
//         // If user is not found, return a 404 status and an error message
//         res.status(404).json({ message: "User not found" });
//       }
//     } catch (e) {
//       console.error("Error updating user details:", e);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   });
  
app.listen(8000, () => {
    console.log("Server is running on port 8000");
})
