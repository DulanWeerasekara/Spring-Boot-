package com.WorkoutWorld.backend.controllers;

import com.WorkoutWorld.backend.models.Descriptions;
import com.WorkoutWorld.backend.services.DescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class DescriptionController {

    @Autowired
    private DescriptionService descriptionService;

    @GetMapping("/descriptions")
    public ResponseEntity<List<Descriptions>> getAllDescriptions() {
        List<Descriptions> descriptions = descriptionService.getAllDescriptions();
        return new ResponseEntity<>(descriptions, HttpStatus.OK);
    }

    @GetMapping("/descriptions/{id}")
    public ResponseEntity<Descriptions> getDescriptionById(@PathVariable Long id) {
        Optional<Descriptions> descriptionOptional = descriptionService.getDescriptionById(id);
        return descriptionOptional.map(description -> new ResponseEntity<>(description, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/descriptions")
    public ResponseEntity<Descriptions> saveDescription(@RequestBody Descriptions description) {
        Descriptions savedDescription = descriptionService.saveDescription(description);
        return new ResponseEntity<>(savedDescription, HttpStatus.CREATED);
    }

    @PutMapping("/descriptions/{id}")
    public ResponseEntity<Descriptions> editDescription(@PathVariable Long id, @RequestBody Descriptions description) {
        Descriptions editedDescription = descriptionService.editDescription(id, description);
        if (editedDescription == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(editedDescription, HttpStatus.OK);
    }

    @DeleteMapping("/descriptions/{id}")
    public ResponseEntity<Void> deleteDescription(@PathVariable Long id) {
        if (descriptionService.deleteDescription(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @GetMapping("/descriptions/postCode/{postCode}")
    public ResponseEntity<List<Descriptions>> getDescriptionsByPostCode(@PathVariable String postCode) {
        List<Descriptions> descriptions = descriptionService.getDescriptionsByPostCode(postCode);
        if (descriptions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(descriptions, HttpStatus.OK);
    }

}

