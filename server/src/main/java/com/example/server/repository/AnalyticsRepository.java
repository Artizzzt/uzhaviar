package com.example.server.repository;

import com.example.server.model.AnalyticsData;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AnalyticsRepository extends MongoRepository<AnalyticsData, String> {
}
