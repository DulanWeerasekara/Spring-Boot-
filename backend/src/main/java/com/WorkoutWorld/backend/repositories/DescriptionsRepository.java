package com.WorkoutWorld.backend.repositories;

import com.WorkoutWorld.backend.models.Descriptions;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DescriptionsRepository extends JpaRepository<Descriptions, Long> {
    List<Descriptions> findByPostCode(String postCode);


}
