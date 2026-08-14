package com.example.farmer.repository;

import com.example.farmer.model.FarmPin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FarmPinRepository extends JpaRepository<FarmPin, String> {
    List<FarmPin> findByFarmerId(String farmerId);
}
