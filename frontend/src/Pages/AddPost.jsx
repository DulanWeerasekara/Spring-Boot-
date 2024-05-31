import React, { useState } from "react";
import axios from "axios";
import "../assets/css/AddPostForm.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const AddPostForm = () => {
    const [image, setImage] = useState(null);
    const [postCode, setPostCode] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation: Check if all fields are filled
        if (!image || !postCode || !title || !description) {
            window.alert("Please fill in all fields.");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);
        formData.append("postCode", postCode);
        formData.append("title", title);
        formData.append("description", description);

        try {
            const response = await axios.post(
                "http://localhost:8080/api/posts",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("Post created:", response.data);
            window.alert("Post added successfully."); // Alert for successful submission
            // Clear form fields after successful submission
            setImage(null);
            setPostCode("");
            setTitle("");
            setDescription("");
        } catch (error) {
            console.error("Error creating post:", error);
            window.alert("Image size should be 1MB or lower."); // Alert for submission failure
        }
    };

    return (
        <>
            <Header />
            <div className="form-container">
                <form onSubmit={handleSubmit} className="post-form">
                    <div className="form-group">
                        <label htmlFor="image">Image:</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="postCode">Enter Code For Post:</label>
                        <input
                            type="text"
                            id="postCode"
                            value={postCode}
                            onChange={(e) => setPostCode(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default AddPostForm;
