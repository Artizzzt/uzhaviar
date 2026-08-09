package com.example.cropdisease.repository;

import com.example.cropdisease.model.Pesticide;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface PesticideRepository extends MongoRepository<Pesticide, String> {
    List<Pesticide> findByFarmerId(String farmerId);
    List<Pesticide> findByStatus(String status);
}
