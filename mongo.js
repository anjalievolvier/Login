const mongoose = require("mongoose")
 mongoose.connect("mongodb://0.0.0.0:27017/react-login")
    .then(() => {
        console.log("mongodb connected");
    })
    .catch((error) => {
        console.error(error);
    })
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
            url:{
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
    username:{
        type:String,
        required:true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
       ref: 'collection', // Reference to the user who created the post
      required: true,
    },

    // content: {
    //   type: String,
    // //   required: true,
    // },
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
  
  module.exports.collection = collection;
  module.exports.post = post;

