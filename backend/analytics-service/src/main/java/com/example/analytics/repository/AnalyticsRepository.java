package com.example.analytics.repository;

import com.example.analytics.model.AnalyticsData;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AnalyticsRepository extends MongoRepository<AnalyticsData, String> {
}
