package com.example.cropdisease.repository;

import com.example.cropdisease.model.Pesticide;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PesticideRepository extends JpaRepository<Pesticide, String> {
    List<Pesticide> findByFarmerId(String farmerId);
    List<Pesticide> findByStatus(String status);
}
