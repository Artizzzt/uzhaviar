package com.example.server.service;

import com.example.server.model.AnalyticsData;
import com.example.server.repository.AnalyticsRepository;
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
