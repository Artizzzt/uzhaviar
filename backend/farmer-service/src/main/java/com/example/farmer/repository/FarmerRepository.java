package com.example.farmer.repository;

import com.example.farmer.model.Farmer;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;
import java.util.List;

public interface FarmerRepository extends MongoRepository<Farmer, String> {
    Optional<Farmer> findByEmail(String email);
    Optional<Farmer> findByFarmerId(String farmerId);
    List<Farmer> findByStatus(String status);
    List<Farmer> findByCrop(String crop);
    List<Farmer> findByVillage(String village);
}
