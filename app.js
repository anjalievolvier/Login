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
        const check = await collection.findOne({ email: email, password: password });

        if (check) {

            res.json("exist");
        }

        else {

            res.json("notexist");
        }

    }

    catch (e) {

        res.json("fail");
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
            res.json("exist")
        }
        else {
            res.json("notexist")

            await collection.insertMany([data]);

        }

    }
    catch (e) {
        console.error(e);
        res.json("fail")
    }

})
// Endpoint to retrieve user details
app.get("/user/:id", async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await collection.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});
// Endpoint to update user details
app.put("/user/:id", async (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;
    try {
        const user = await collection.findByIdAndUpdate(userId, updatedData, {
            new: true,
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(8000, () => {
    console.log("port connected");
})
