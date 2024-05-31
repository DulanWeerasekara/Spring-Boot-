import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";

function Header() {
    const [authenticated, setAuthenticated] = useState(true);

    useEffect(() => {
        const fetchMealPlans = async () => {
            try {
                const response = await fetch("http://localhost:8080/mealplan", {
                    method: "GET",
                    redirect: "follow",
                    credentials: "include",
                });

                if (response.ok) {
                    console.log("t");
                    console.log(authenticated);
                } else {
                    console.error(
                        "Failed to fetch meal plans:",
                        response.statusText
                    );
                }
            } catch (error) {
                console.error("Error fetching meal plans:", error);
            }
        };
        fetchMealPlans();
        // Check authentication status when component mounts
        const jsessionId = getCookie("JSESSIONID");
        const isAuthenticated = localStorage.getItem("authenticated");

        if (jsessionId || isAuthenticated) {
            setAuthenticated(true);
            localStorage.setItem("authenticated", "true");
        } else {
            localStorage.removeItem("authenticated");
        }
    }, []);

    const handleMealPlanClick = () => {
        if (!authenticated) {
            // If user is not authenticated, redirect to the login page

            window.location.href = "/mealplanpage";
        } else {
            // Redirect to the Meal Plan page
            window.location.href = "/mealplanpage";
            console.log("q");
        }
    };

    const handleLogout = async () => {
        try {
            // Perform logout logic here
            const response = await fetch("http://localhost:8080/logout", {
                method: "GET",
                redirect: "follow",
                credentials: "include",
            });

            if (response.ok) {
                window.alert("Logout successful");
                // If logout is successful, redirect to the desired page
                window.location.href = "http://localhost:5173";
            } else {
                console.error("Failed to logout:", response.statusText);
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const getCookie = (name) => {
        const cookies = document.cookie.split("; ");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].split("=");
            if (cookie[0] === name) {
                return cookie[1];
            }
        }
        return null;
    };

    return (
        <>
            <Navbar expand="lg" style={{ backgroundColor: "#d3d3d3" }}>
                <Container>
                    <h3
                        style={{
                            fontSize: "35px",
                        }}
                    >
                        FitHub
                        <br />
                    </h3>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                            </Form>
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="#">About Us</Nav.Link>
                            <Nav.Link href="/post-list">Posts</Nav.Link>

                            <Nav.Link onClick={handleMealPlanClick}>
                                Meal Planning
                            </Nav.Link>
                            <Nav.Link href="#">Contact Us</Nav.Link>
                        </Nav>
                        {authenticated ? (
                            <button className="btn btn-danger">
                                <Nav.Link onClick={handleLogout}>
                                    Logout
                                </Nav.Link>
                            </button>
                        ) : (
                            <button className="btn btn-primary">
                                <Nav.Link href="/login">Login</Nav.Link>
                            </button>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;
