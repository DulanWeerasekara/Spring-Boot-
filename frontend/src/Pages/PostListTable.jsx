import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/PostListTable.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import {
    DeleteOutline,
    Edit,
    Description,
    Photo,
    Search,
} from "@material-ui/icons";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@material-ui/core";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [newFile, setNewFile] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingDescription, setEditingDescription] = useState({
        id: null,
        description: "",
    });

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8080/api/posts"
                );
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    const handleEditImage = async (id) => {
        setSelectedPost(id);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSaveImage = async () => {
        try {
            if (!newFile) {
                window.alert("Please select a file to upload");
                return;
            }
            const formData = new FormData();
            formData.append("image", newFile);
            await axios.put(
                `http://localhost:8080/api/posts/image/${selectedPost}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setOpenDialog(false);
            window.alert("Image updated successfully");
            fetchPosts();
        } catch (error) {
            console.error("Error updating image:", error);
        }
    };
    const handleEditDescription = (id, description) => {
        setEditingDescription({ id, description });
    };

    const handleSaveDescription = async () => {
        try {
            await axios.put(
                `http://localhost:8080/api/posts/description/${editingDescription.id}?description=${editingDescription.description}`
            );
            window.alert("Description updated successfully");
            setEditingDescription({ id: null, description: "" });
            fetchPosts();
        } catch (error) {
            console.error("Error updating description:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            // Show a confirmation dialog
            const confirmDelete = window.confirm(
                "Are you sure you want to delete this post?"
            );

            // If the user confirms the delete action
            if (confirmDelete) {
                // Send the delete request
                await axios.delete(`http://localhost:8080/api/posts/${id}`);

                // Update the posts state after successful deletion
                setPosts(posts.filter((post) => post.id !== id));

                // Show success message
                window.alert("Post deleted successfully");
            }
        } catch (error) {
            // If there's an error, log it to the console and show an error alert
            console.error("Error deleting post:", error);
            window.alert("Error deleting post");
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setNewFile(file);
    };

    return (
        <>
            <Header />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="post-list-container">
                <input
                    type="text"
                    placeholder="Search by title "
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{
                        padding: "8px 20px",
                        border: "1px solid #ccc",
                        borderRadius: "20px",
                        marginBottom: "16px",
                        width: "100%",
                        maxWidth: "300px", // Adjust as needed
                        boxSizing: "border-box",
                    }}
                />
                <br />
                <br />
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Post Code</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>File Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts
                            .filter((post) =>
                                post.title
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase())
                            )
                            .map((post, index) => (
                                <tr key={index}>
                                    <td>{post.id}</td>
                                    <td>{post.postCode}</td>
                                    <td>{post.title}</td>
                                    {/* <td>{post.description}</td>
        <td>{post.fileName}</td> */}
                                    <td>
                                        {editingDescription.id === post.id ? (
                                            <input
                                                type="text"
                                                value={
                                                    editingDescription.description
                                                }
                                                onChange={(e) =>
                                                    setEditingDescription({
                                                        ...editingDescription,
                                                        description:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        ) : (
                                            post.description
                                        )}
                                    </td>
                                    <td>{post.fileName}</td>
                                    <td>
                                        <Edit
                                            onClick={() =>
                                                handleEditImage(post.id)
                                            }
                                        />
                                        <Description
                                            onClick={() =>
                                                handleEditDescription(
                                                    post.id,
                                                    post.description
                                                )
                                            }
                                        />
                                        <DeleteOutline
                                            onClick={() =>
                                                handleDelete(post.id)
                                            }
                                        />
                                        {editingDescription.id === post.id && (
                                            <Button
                                                onClick={handleSaveDescription}
                                            >
                                                Save
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {/* Dialog box for editing image */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Change Image</DialogTitle>
                <DialogContent>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSaveImage}>Save</Button>
                </DialogActions>
            </Dialog>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Footer />
        </>
    );
};

export default PostList;
