package com.example.server.controller;

import com.example.server.model.AnalyticsData;
import com.example.server.service.AnalyticsService;
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
