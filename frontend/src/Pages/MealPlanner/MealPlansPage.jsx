import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Modal } from "react-bootstrap";
import AddMealPlanForm from "./AddMealPlanForm";
import UpdateMealPlanForm from "./UpdateMealPlanForm";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import "./MealPlanPage.css";

const MealPlanPage = () => {
    const [mealPlans, setMealPlans] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedMealPlan, setSelectedMealPlan] = useState(null);
    const [showAddMealPlanForm, setShowAddMealPlanForm] = useState(false);
    const [updateMealPlanDetails, setUpdateMealPlanDetails] = useState(null);

    useEffect(() => {
        fetchMealPlans();
    }, []);

    const fetchMealPlans = async () => {
        try {
            const response = await fetch("http://localhost:8080/mealplan", {
                method: "GET",
                redirect: "follow",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setMealPlans(data);
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

    const handleCloseModal = () => {
        setShowModal(false);
        setUpdateMealPlanDetails(null);
    };

    const handleShowModal = (showAddForm) => {
        setShowModal(true);
        setShowAddMealPlanForm(showAddForm);
    };

    const handleCardClick = (mealPlan) => {
        setSelectedMealPlan(mealPlan);
        setShowAddMealPlanForm(false);
        setShowModal(true);
    };

    const handleUpdate = () => {
        setUpdateMealPlanDetails(selectedMealPlan);
        setShowAddMealPlanForm(false);
        setShowModal(true);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(
                `http://localhost:8080/mealplan/${selectedMealPlan.id}`,
                {
                    withCredentials: true, // Include credentials
                }
            );
            fetchMealPlans();
            handleCloseModal();
        } catch (error) {
            console.error("Error deleting meal plan:", error);
            // Handle error if needed
        }
    };

    return (
        <div
            className="meal-plan-page"
            style={{
                padding: "0px",
                backgroundImage: `url('https://i.imgur.com/Su63XvV.jpeg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <Header />
            <h1 className="header">Share your Meal Plans</h1>
            <Button
                className="add-meal-plan-button"
                onClick={() => handleShowModal(true)}
            >
                Add New Meal Plan
            </Button>
            <div className="meal-plan-container">
                {mealPlans.map((mealPlan) => (
                    <Card
                        className="meal-plan-card"
                        key={mealPlan.id}
                        onClick={() => handleCardClick(mealPlan)}
                    >
                        <Card.Img
                            className="meal-plan-card-image"
                            variant="top"
                            src={`http://localhost:8080/api/photos/${mealPlan.imagePath}`}
                            alt={mealPlan.name}
                        />
                        <Card.Body>
                            <Card.Title>{mealPlan.name}</Card.Title>
                            <Card.Text>{mealPlan.description}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body className="custom-modal-body">
                    {showAddMealPlanForm ? (
                        <AddMealPlanForm
                            fetchMealPlans={fetchMealPlans}
                            handleCloseModal={handleCloseModal}
                        />
                    ) : updateMealPlanDetails !== null ? (
                        <UpdateMealPlanForm
                            fetchMealPlans={fetchMealPlans}
                            handleCloseModal={handleCloseModal}
                            mealPlanDetails={updateMealPlanDetails}
                        />
                    ) : (
                        selectedMealPlan && (
                            <div>
                                <h2>{selectedMealPlan.name}</h2>
                                <p>
                                    <span className="bold-text">
                                        Description:
                                    </span>{" "}
                                    {selectedMealPlan.description}
                                </p>
                                <p>
                                    <span className="bold-text">
                                        Ingredients:
                                    </span>{" "}
                                    {selectedMealPlan.ingredients}
                                </p>
                                <p>
                                    <span className="bold-text">Recipe:</span>{" "}
                                    {selectedMealPlan.recipe}
                                </p>
                                <Button
                                    variant="primary"
                                    onClick={handleUpdate}
                                >
                                    Update
                                </Button>
                                <Button variant="danger" onClick={handleDelete}>
                                    Delete
                                </Button>
                            </div>
                        )
                    )}
                </Modal.Body>
            </Modal>
            <Footer />
        </div>
    );
};

export default MealPlanPage;
