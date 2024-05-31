package com.WorkoutWorld.backend.repository;

import com.WorkoutWorld.backend.model.MealPlannerModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealPlannerRepository extends JpaRepository<MealPlannerModel,Long> {
}
