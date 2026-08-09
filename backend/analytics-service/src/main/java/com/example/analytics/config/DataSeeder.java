package com.example.analytics.config;

import com.example.analytics.model.*;
import com.example.analytics.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class DataSeeder implements CommandLineRunner {

    private final NotificationRepository notificationRepository;
    private final AnalyticsRepository analyticsRepository;

    public DataSeeder(NotificationRepository notificationRepository, AnalyticsRepository analyticsRepository) {
        this.notificationRepository = notificationRepository;
        this.analyticsRepository = analyticsRepository;
    }

    @Override
    public void run(String... args) {
        if (notificationRepository.count() == 0) {
            System.out.println("Seeding default Notifications data to MongoDB Atlas (Analytics Service)...");
            List<Notification> initialNotifications = Arrays.asList(
                new Notification(null, "FlaskConical", "Fertilizer Reminder", "Apply 88 kg NPK 20-10-10 — due July 5, 2026", "2 hours ago", false, "/smart-spray"),
                new Notification(null, "AlertTriangle", "Disease Alert", "Powdery Mildew detected — High severity", "5 hours ago", false, "/crop-health"),
                new Notification(null, "Calendar", "Manager Visit Scheduled", "Mr. Rajan Kumar will visit your farm on July 5", "Yesterday", true, "/contact-us"),
                new Notification(null, "CloudRain", "Weather Alert", "Rain expected this week — adjust spray schedule", "3 days ago", false, "/dashboard"),
                new Notification(null, "TrendingUp", "Weekly Report Ready", "Your farm performance summary is available", "5 days ago", true, "/analysis")
            );
            notificationRepository.saveAll(initialNotifications);
        }

        if (analyticsRepository.count() == 0) {
            System.out.println("Seeding default Analytics data to MongoDB Atlas (Analytics Service)...");
            AnalyticsData analyticsData = new AnalyticsData();
            analyticsData.setCropHealthTrend(Arrays.asList(
                Map.of("name", "W1", "value", 80),
                Map.of("name", "W2", "value", 83),
                Map.of("name", "W3", "value", 81),
                Map.of("name", "W4", "value", 86),
                Map.of("name", "W5", "value", 88),
                Map.of("name", "W6", "value", 90)
            ));
            analyticsData.setFertilizerTrend(Arrays.asList(
                Map.of("name", "Jan", "value", 95),
                Map.of("name", "Feb", "value", 120),
                Map.of("name", "Mar", "value", 105),
                Map.of("name", "Apr", "value", 130),
                Map.of("name", "May", "value", 110),
                Map.of("name", "Jun", "value", 125)
            ));
            analyticsData.setSoilMoistureTrend(Arrays.asList(
                Map.of("name", "Mon", "value", 55),
                Map.of("name", "Tue", "value", 62),
                Map.of("name", "Wed", "value", 59),
                Map.of("name", "Thu", "value", 68),
                Map.of("name", "Fri", "value", 64),
                Map.of("name", "Sat", "value", 72),
                Map.of("name", "Sun", "value", 66)
            ));
            analyticsData.setDiseaseHistory(Arrays.asList(
                Map.of("name", "Jan", "value", 1.2),
                Map.of("name", "Feb", "value", 2.1),
                Map.of("name", "Mar", "value", 0.8),
                Map.of("name", "Apr", "value", 1.5),
                Map.of("name", "May", "value", 0.5),
                Map.of("name", "Jun", "value", 2.3)
            ));
            analyticsData.setYieldEstimation(Arrays.asList(
                Map.of("name", "Jan", "actual", 65, "estimated", 62),
                Map.of("name", "Feb", "actual", 70, "estimated", 68),
                Map.of("name", "Mar", "actual", 75, "estimated", 74),
                Map.of("name", "Apr", "actual", 82, "estimated", 80),
                Map.of("name", "May", "actual", 86, "estimated", 85),
                Map.of("name", "Jun", "actual", 93, "estimated", 90)
            ));
            analyticsData.setSoilNutrients(Map.of("nitrogen", 72, "phosphorus", 58, "potassium", 84));
            analyticsRepository.save(analyticsData);
        }
    }
}
