import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import "./AddMealPlanForm.css";

const AddMealPlanForm = ({ fetchMealPlans, handleCloseModal }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        ingredients: "",
        recipe: "",
        image: null, // Store selected image file
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "description" && value.length > 150) {
            // If description exceeds 150 characters, truncate it
            setFormData({ ...formData, [name]: value.slice(0, 150) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
        setErrors({ ...errors, [name]: "" }); // Clear error message when input changes
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });
    };

    const validateForm = () => {
        const { name, description, ingredients, recipe, image } = formData;
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

        if (!image) {
            errors.image = "Image is required.";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const formDataWithImage = new FormData();
                formDataWithImage.append("name", formData.name);
                formDataWithImage.append("description", formData.description);
                formDataWithImage.append("ingredients", formData.ingredients);
                formDataWithImage.append("recipe", formData.recipe);
                formDataWithImage.append("image", formData.image); // Append image file to form data

                try {
                    const response = await axios.post(
                        "http://localhost:8080/mealplan",
                        formDataWithImage,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data", // Set content type to multipart/form-data for file
                            },
                            withCredentials: true, // Include credentials
                        }
                    );
                } catch (error) {
                    console.error("Error uploading meal plan:", error);
                    // Handle error if needed
                }
                fetchMealPlans();
                handleCloseModal();
            } catch (error) {
                console.error("Error adding meal plan:", error);
            }
        }
    };

    return (
        <div className="add-meal-plan-form">
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
                    <Form.Label>Description (max 150 characters)</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        maxLength={150}
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
                <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*" // Accept only image files
                        onChange={handleImageChange}
                        isInvalid={!!errors.image}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.image}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add Meal Plan
                </Button>
            </Form>
        </div>
    );
};

export default AddMealPlanForm;
