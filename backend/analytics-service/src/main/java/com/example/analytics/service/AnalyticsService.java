package com.example.analytics.service;

import com.example.analytics.model.AnalyticsData;
import com.example.analytics.repository.AnalyticsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnalyticsService {

    private final AnalyticsRepository analyticsRepository;

    public AnalyticsService(AnalyticsRepository analyticsRepository) {
        this.analyticsRepository = analyticsRepository;
    }

    public AnalyticsData getAnalyticsData() {
        List<AnalyticsData> all = analyticsRepository.findAll();
        if (!all.isEmpty()) {
            return all.get(0);
        }
        return new AnalyticsData();
    }

    public AnalyticsData saveAnalyticsData(AnalyticsData data) {
        return analyticsRepository.save(data);
    }
}
