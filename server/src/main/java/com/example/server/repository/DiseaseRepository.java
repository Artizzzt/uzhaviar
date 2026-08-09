package com.example.server.repository;

import com.example.server.model.Disease;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface DiseaseRepository extends MongoRepository<Disease, String> {
    List<Disease> findByFarmerId(String farmerId);
    List<Disease> findBySeverity(String severity);
    List<Disease> findByStatus(String status);
}
