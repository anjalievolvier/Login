import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function EditProfile({ match }) {
    const userId = match.params.id;
    const history = useHistory();
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({});

    useEffect(() => {
        // Fetch user details when the component mounts
        // You may want to add error handling here
        fetch(`/user/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
                setFormData(data);
            });
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send a PUT request to update user details
        fetch(`/user/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
                history.push(`/home/${userId}`);
            });
    };

    return (
        <div>
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input
                        type="text"
                        name="firstname"
                        value={formData.firstname || ""}
                        onChange={handleInputChange}
                    />
                </label>
                {/* Add similar inputs for other fields */}
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default EditProfile;
