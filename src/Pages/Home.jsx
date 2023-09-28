import React, { useEffect, useState } from "react"
import { useLocation, useNavigate, Link } from 'react-router-dom';

function Home({user}) {
    const [userData, setUser] = useState({});
    const location = useLocation;
    const userId = location.state;
    useEffect(() => {
        // Fetch user details when the component mounts
        // You may want to add error handling here
        fetch(`/user/${userId}`)
            .then((response) => response.json())
            .then((data) => setUser(data));
    }, [userId]);
    //check if data is available
    if(!user){
        return<div>Loading.....</div>
    }

    return (
        <div className="homepage">

            <h1>Hello {user.firstname} and welcome to the home</h1>
            <p>Email:{userData.email}</p>
            <p>Phone Number:{userData.phone}</p>
            <p>Gender:{userData.gender}</p>
            <Link to={`/edit/${user._id}`}>Edit Profile</Link>

        </div>
    );
}

export default Home;