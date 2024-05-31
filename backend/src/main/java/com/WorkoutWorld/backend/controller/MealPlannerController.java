package com.WorkoutWorld.backend.controller;

import com.WorkoutWorld.backend.exception.MealPlannerNotFoundException;
import com.WorkoutWorld.backend.model.MealPlannerModel;
import com.WorkoutWorld.backend.repository.MealPlannerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class MealPlannerController implements WebMvcConfigurer {

    private static final String UPLOAD_DIR = "C:/Users/Acer/Desktop/New folder/paf-assignment-2024-jun_we_104/frontend/src/assets/";

    @Autowired
    private MealPlannerRepository mealPlannerRepository;

    @PostMapping("/mealplan")
    public ResponseEntity<MealPlannerModel> createMealPlan(
            @RequestParam("image") MultipartFile image,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("ingredients") String ingredients,
            @RequestParam("recipe") String recipe) {

        try {
            // Save the image locally
            String fileName = saveImageLocally(image);

            // Create a new MealPlannerModel object with the provided data
            MealPlannerModel mealPlan = new MealPlannerModel();
            mealPlan.setName(name);
            mealPlan.setDescription(description);
            mealPlan.setIngredients(ingredients);
            mealPlan.setRecipe(recipe);
            mealPlan.setImagePath(fileName); // Save the file name instead of the full path

            // Save the meal plan to the database
            MealPlannerModel savedMealPlan = mealPlannerRepository.save(mealPlan);

            // Return the saved meal plan in the response
            return new ResponseEntity<>(savedMealPlan, HttpStatus.CREATED);
        } catch (IOException e) {
            // Handle IO Exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private String saveImageLocally(MultipartFile image) throws IOException {
        // filename for the image
        String fileName = image.getOriginalFilename();

        // Save the image to the specified directory
        Path filePath = Paths.get(UPLOAD_DIR, fileName);
        Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Return the file name
        return fileName;
    }

    @GetMapping("/mealplan")
    List<MealPlannerModel> getAllMealPlans() {
        return mealPlannerRepository.findAll();
    }

    @GetMapping("/api/photos/{imageName}")
    public ResponseEntity<byte[]> serveImage(@PathVariable String imageName) {
        try {
            Path imagePath = Paths.get(UPLOAD_DIR, imageName);
            byte[] imageBytes = Files.readAllBytes(imagePath);
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/mealplan/{id}")
    MealPlannerModel getMealPlanById(@PathVariable Long id) {
        MealPlannerModel mealPlan = mealPlannerRepository.findById(id)
                .orElseThrow(() -> new MealPlannerNotFoundException(id));

        return mealPlan;
    }


    @PutMapping("/mealplan/{id}")
    MealPlannerModel updateMealPlan(@RequestBody MealPlannerModel updatedMealPlan, @PathVariable Long id) {
        return mealPlannerRepository.findById(id)
                .map(mealPlan -> {
                    mealPlan.setName(updatedMealPlan.getName());
                    mealPlan.setDescription(updatedMealPlan.getDescription());
                    mealPlan.setIngredients(updatedMealPlan.getIngredients());
                    mealPlan.setRecipe(updatedMealPlan.getRecipe());

                    return mealPlannerRepository.save(mealPlan);
                })
                .orElseThrow(() -> new MealPlannerNotFoundException(id));
    }

    @DeleteMapping("/mealplan/{id}")
    String deleteMealPlan(@PathVariable Long id) {
        if (!mealPlannerRepository.existsById(id)) {
            throw new MealPlannerNotFoundException(id);
        }
        mealPlannerRepository.deleteById(id);
        return "Meal plan with id " + id + " deleted";
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler("/api/photos/**")
                .addResourceLocations("file:" + UPLOAD_DIR);
    }
}
