package com.example.analytics.repository;

import com.example.analytics.model.AnalyticsData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnalyticsRepository extends JpaRepository<AnalyticsData, String> {
}
