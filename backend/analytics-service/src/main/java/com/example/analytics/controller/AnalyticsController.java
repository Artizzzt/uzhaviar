package com.example.analytics.controller;

import com.example.analytics.model.AnalyticsData;
import com.example.analytics.service.AnalyticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping
    public ResponseEntity<AnalyticsData> getAnalytics() {
        return ResponseEntity.ok(analyticsService.getAnalyticsData());
    }

    @PostMapping
    public ResponseEntity<AnalyticsData> saveAnalytics(@RequestBody AnalyticsData data) {
        return ResponseEntity.ok(analyticsService.saveAnalyticsData(data));
    }
}
