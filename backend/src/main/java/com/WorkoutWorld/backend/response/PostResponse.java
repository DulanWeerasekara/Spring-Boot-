package com.WorkoutWorld.backend.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Builder
public class PostResponse {
    private String title;
    private String description;
    private String imagePath;

    public PostResponse(String title, String description, String imagePath) {
        this.title = title;
        this.description = description;
        this.imagePath = imagePath;
    }

    // Getters and setters
}
