package com.WorkoutWorld.backend.controllers;
import com.WorkoutWorld.backend.response.PostResponse;
import com.WorkoutWorld.backend.utils.EncryptionUtils;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import com.WorkoutWorld.backend.repositories.PostsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import com.WorkoutWorld.backend.models.Posts;
import org.springframework.web.multipart.MultipartFile;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Base64;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class PostsController {

    @Autowired
    private PostsRepository postsRepository;


    @PostMapping("/posts")
    public ResponseEntity<Posts> createPost(@RequestParam("image") MultipartFile image,
                                            @RequestParam("postCode") String postCode,
                                            @RequestParam("title") String title,
                                            @RequestParam("description") String description) {
        try {
            // Save the image locally
            String imagePath = saveImageLocally(image);

            // Create a new Posts object with the provided data
            Posts post = Posts.builder()
                    .postCode(postCode)
                    .title(title)
                    .description(description)
                    .fileName(imagePath) // Save the image path instead of byte array
                    .build();

            // Save the post to the database
            Posts savedPost = postsRepository.save(post);

            // Return the saved post in the response
            return new ResponseEntity<>(savedPost, HttpStatus.CREATED);
        } catch (IOException e) {
            // Handle IO Exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private String saveImageLocally(MultipartFile image) throws IOException {
        // Define the directory to save images
        String uploadDir = "C:/Users/Acer/Videos/New folder/paf-assignment-2024-jun_we_104/frontend/src/assets/image";

        // Generate a unique filename for the image
        String fileName = "img" + System.currentTimeMillis() + "-" + image.getOriginalFilename();

        // Create the directory if it doesn't exist
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // Save the image to the specified directory
        Path filePath = Paths.get(uploadDir, fileName);
        Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Return the file name
        return fileName;
    }

    // GET all posts
    @GetMapping("/posts")
    public ResponseEntity<List<Posts>> getAllPosts() {
        List<Posts> allPosts = postsRepository.findAll();
        return ResponseEntity.ok().body(allPosts);
    }


    // GET post by postCode
    @GetMapping("/posts/{postCode}")
    public ResponseEntity<Posts> getPostByPostCode(@PathVariable String postCode) {
        Optional<Posts> optionalPost = postsRepository.findByPostCode(postCode);
        if (optionalPost.isPresent()) {
            return new ResponseEntity<>(optionalPost.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    // Delete a post by ID
    @DeleteMapping("/posts/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        Optional<Posts> optionalPost = postsRepository.findById(id);
        if (optionalPost.isPresent()) {
            postsRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/posts/image/{id}")
    public ResponseEntity<Posts> updatePostImage(@PathVariable Long id, @RequestParam("image") MultipartFile image) {
        Optional<Posts> optionalPost = postsRepository.findById(id);
        if (optionalPost.isPresent()) {
            try {
                String imagePath = saveImageLocally(image);
                Posts post = optionalPost.get();
                post.setFileName(imagePath);
                Posts updatedPost = postsRepository.save(post);
                return new ResponseEntity<>(updatedPost, HttpStatus.OK);
            } catch (IOException e) {
                e.printStackTrace();
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/posts/description/{id}")
    public ResponseEntity<Posts> updatePostDescription(@PathVariable Long id, @RequestParam("description") String description) {
        Optional<Posts> optionalPost = postsRepository.findById(id);
        if (optionalPost.isPresent()) {
            Posts post = optionalPost.get();
            post.setDescription(description);
            Posts updatedPost = postsRepository.save(post);
            return new ResponseEntity<>(updatedPost, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
