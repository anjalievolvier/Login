import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link from react-router-dom


function Feed () {
  const location = useLocation();
  const userId = location.state.userId;
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [pic, setPic] = useState(null);
  const [posts, setPosts] = useState([]);



   const handleImageUpload = (file) => {
    console.log('File received:', file);
    setPic(URL.createObjectURL(file));
    setImage(file);
  };
 
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append('userId', userId);
  //   formData.append('image', image);
  //   if(caption){
  //   formData.append('caption', caption);
  //   }

  //   const response = await fetch('http://localhost:8000/posts', {
  //     method: 'POST',
  //     body: formData,
  //   });

  //   if (response.status === 200) {
  //     const responseData = await response.json();
  //     console.log('successfully posted');
  //     console.log('Saved Post:', responseData.savedPost);
  //      // Reset the state to clear the selected image
  //   setImage(null);
  //   setPic(null);
  //   //setContent(''); // You can reset the content as well if needed
  //   setCaption('')
  //   } else {
  //     console.error('error in posting');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('userId', userId);
  
    if (image) {
      formData.append('image', image);
    }
  
    if (caption) {
      formData.append('caption', caption);
    }
  
    const response = await fetch('http://localhost:8000/posts', {
      method: 'POST',
      body: formData,
    });
  
    if (response.status === 200) {
      const responseData = await response.json();
      console.log('Successfully posted');
      console.log('Saved Post:', responseData.savedPost);
      setImage(null);
      setPic(null);
      setCaption('');
    } else {
      console.error('Error in posting');
    }
  };
  


  useEffect(() => {
    // Fetch posts from the server when the component mounts
    const fetchPosts = async () => {
      const response = await fetch(`http://localhost:8000/fetchposts/${userId}`); // Replace with your actual API endpoint
      if (response.status === 200) {
        const postData = await response.json();
        setPosts(postData.posts); // Assuming the server returns an array of posts
      } else {
        console.error('Error fetching posts');
      }
    };
    fetchPosts();
  }, [userId]); // The empty dependency array ensures this effect runs only once


  return (
    <div>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
     
  <br/>
  <br/>
        <input
          type="text"
          placeholder="Enter your caption"
          //value={content}
          //onChange={(e) => setContent(e.target.value)}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e.target.files[0])}
        />
        <br />
        {image && <img src={pic} alt="Selected" style={{ maxWidth: '200px', maxHeight: '200px' }} />}
        <br />
        <button type="submit">Post</button>
        <Link to="/home">
          <button type="submit">Home</button>
        </Link>
      </form>
      <br />

      <div>
  {posts && posts.map((post) => (
    <div key={post._id}>
      {post.images && post.images[0] && post.images[0].url ? (
        <img src={post.images[0].url} alt="Posted" style={{ maxWidth: '200px', maxHeight: '200px' }} />
      ) : null}
      <p>{post.caption}</p>
    </div>
  ))}
</div>
</div>
  );
}


export default Feed;

