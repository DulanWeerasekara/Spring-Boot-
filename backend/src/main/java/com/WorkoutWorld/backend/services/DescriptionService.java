package com.WorkoutWorld.backend.services;

import com.WorkoutWorld.backend.models.Descriptions;
import com.WorkoutWorld.backend.repositories.DescriptionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class DescriptionService {

    @Autowired
    private DescriptionsRepository descriptionsRepository;

    public List<Descriptions> getAllDescriptions() {
        return descriptionsRepository.findAll();
    }

    public Optional<Descriptions> getDescriptionById(Long id) {
        return descriptionsRepository.findById(id);
    }

    public Descriptions saveDescription(Descriptions description) {
        return descriptionsRepository.save(description);
    }

    public Descriptions editDescription(Long id, Descriptions description) {
        Optional<Descriptions> existingDescriptionOptional = descriptionsRepository.findById(id);
        if (existingDescriptionOptional.isPresent()) {
            Descriptions existingDescription = existingDescriptionOptional.get();
            existingDescription.setPostCode(description.getPostCode());
            existingDescription.setDescriptionNo(description.getDescriptionNo());
            existingDescription.setDescription(description.getDescription());
            return descriptionsRepository.save(existingDescription);
        } else {
            return null;
        }
    }

    public boolean deleteDescription(Long id) {
        if (descriptionsRepository.existsById(id)) {
            descriptionsRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
    public List<Descriptions> getDescriptionsByPostCode(String postCode) {
        return descriptionsRepository.findByPostCode(postCode);
    }
}
