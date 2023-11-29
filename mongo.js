require('dotenv').config();
const mongoose = require('mongoose');
const mongoUrl = process.env.MONGO_URL;
mongoose
    .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });
const newSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },

    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
    },
    tokens: [
        {
            token: {
                type: String,
                // required: true,
            },
            expiration: {
                type: Date,
                // required: true,A
            },
        },
    ],
    imagePath: [
        {
            url: {
                type: String,
            }
        }],
    followlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'collection', // Reference to the 'collection' model (your User model)
        },
    ],
})
const collection = mongoose.model("collection", newSchema)
const postSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'collection', // Reference to the user who created the post
        required: true,
    },
    text: {
        type: String,
        //  required: true,
    },
    images: [
        {
            url: {
                type: String,
                required: true,
            },
            description: {
                type: String,
            },
        },
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment',
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    createdMonth: {
        type: String,
        default: new Date().toLocaleString('default', { month: 'long' }),
    },
});
const post = mongoose.model('post', postSchema);

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'collection',
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const comment = mongoose.model('comment', commentSchema);
module.exports.comment = comment;
module.exports.collection = collection;
module.exports.post = post;