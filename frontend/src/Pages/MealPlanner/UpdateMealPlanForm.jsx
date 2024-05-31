import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const UpdateMealPlanForm = ({
    fetchMealPlans,
    handleCloseModal,
    mealPlanDetails,
}) => {
    const [formData, setFormData] = useState({
        name: mealPlanDetails.name,
        description: mealPlanDetails.description,
        ingredients: mealPlanDetails.ingredients,
        recipe: mealPlanDetails.recipe,
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // Clear error message when input changes
    };

    const validateForm = () => {
        const { name, description, ingredients, recipe } = formData;
        const errors = {};

        if (!name || name.trim() === "") {
            errors.name = "Name is required.";
        } else if (!/^[a-zA-Z0-9\s]+$/.test(name)) {
            errors.name = "Name can only contain letters, numbers, and spaces.";
        }

        if (!description || description.trim() === "") {
            errors.description = "Description is required.";
        }

        if (!ingredients || ingredients.trim() === "") {
            errors.ingredients = "Ingredients are required.";
        }

        if (!recipe || recipe.trim() === "") {
            errors.recipe = "Recipe is required.";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                await axios.put(
                    `http://localhost:8080/mealplan/${mealPlanDetails.id}`,
                    formData,
                    {
                        withCredentials: true, // Include credentials
                    }
                );
                fetchMealPlans();
                handleCloseModal();
            } catch (error) {
                console.error("Error updating meal plan:", error);
                // Handle error if needed
            }
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    isInvalid={!!errors.description}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    {errors.description}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="ingredients">
                <Form.Label>Ingredients</Form.Label>
                <Form.Control
                    as="textarea"
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleChange}
                    isInvalid={!!errors.ingredients}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    {errors.ingredients}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="recipe">
                <Form.Label>Recipe</Form.Label>
                <Form.Control
                    as="textarea"
                    name="recipe"
                    value={formData.recipe}
                    onChange={handleChange}
                    isInvalid={!!errors.recipe}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    {errors.recipe}
                </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
                Update
            </Button>
        </Form>
    );
};

export default UpdateMealPlanForm;
