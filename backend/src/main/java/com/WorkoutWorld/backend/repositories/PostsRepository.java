package com.WorkoutWorld.backend.repositories;

import com.WorkoutWorld.backend.models.Posts;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostsRepository extends JpaRepository<Posts, Long> {
    Optional<Posts> findByPostCode(String postCode);
}
