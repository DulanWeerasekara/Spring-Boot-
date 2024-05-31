package com.WorkoutWorld.backend.services;

import com.WorkoutWorld.backend.models.Posts;
import com.WorkoutWorld.backend.repositories.PostsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostsService {

    @Autowired
    private PostsRepository postsRepository;

    public List<Posts> getAllPosts() {
        return postsRepository.findAll();
    }

    public Optional<Posts> getPostByPostCode(String postCode) {
        return postsRepository.findByPostCode(postCode);
    }

    public Posts createPost(Posts post) {
        return postsRepository.save(post);
    }

    public Optional<Posts> updatePost(Long id, Posts post) {
        Optional<Posts> optionalPost = postsRepository.findById(id);
        if (optionalPost.isPresent()) {
            Posts existingPost = optionalPost.get();
            existingPost.setPostCode(post.getPostCode());
            existingPost.setTitle(post.getTitle());
            return Optional.of(postsRepository.save(existingPost));
        } else {
            return Optional.empty();
        }
    }

    public boolean deletePost(Long id) {
        if (postsRepository.existsById(id)) {
            postsRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
