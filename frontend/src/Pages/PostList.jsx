import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    FavoriteBorderOutlined,
    ChatBubbleOutlineOutlined,
    AddCircleOutline,
    ViewList,
} from "@material-ui/icons"; // Import Material-UI icons
import "../assets/css/PostList.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8080/api/posts"
                );
                const postsWithLocalImagePath = await Promise.all(
                    response.data.map(async (post) => {
                        const { default: imagePath } = await import(
                            /* @vite-ignore */
                            `../assets/image/${post.fileName}`
                        );

                        return { ...post, imagePath };
                    })
                );
                setPosts(postsWithLocalImagePath);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

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
                {posts.map((post, index) => (
                    <div key={index} className="post-card">
                        <img
                            src={post.imagePath}
                            alt={post.title}
                            className="post-image"
                        />
                        <div className="post-details">
                            <h2>{post.title}</h2>
                            <p>{post.description}</p>
                            {/* Like and Comment Icons */}
                            <div className="icon-container">
                                <div className="like-icon">
                                    <FavoriteBorderOutlined />
                                    <span>{post.likeCount}</span>
                                </div>
                                <div className="comment-icon">
                                    <ChatBubbleOutlineOutlined />
                                    <span>{post.commentCount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {/* Icons for Add Post and View List */}
                <div className="icon-container2">
                    <Link to="/add-post" className="add-post-icon">
                        <AddCircleOutline />
                    </Link>
                    <Link to="/post-list-table" className="view-list-icon">
                        <ViewList />
                    </Link>
                </div>
            </div>
        </>
    );
};

export default PostList;
