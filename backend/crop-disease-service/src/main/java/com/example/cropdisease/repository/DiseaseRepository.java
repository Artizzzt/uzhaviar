package com.example.cropdisease.repository;

import com.example.cropdisease.model.Disease;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DiseaseRepository extends JpaRepository<Disease, String> {
    List<Disease> findByFarmerId(String farmerId);
    List<Disease> findBySeverity(String severity);
    List<Disease> findByStatus(String status);
} 
