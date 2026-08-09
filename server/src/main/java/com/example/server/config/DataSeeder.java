package com.example.server.config;

import com.example.server.model.*;
import com.example.server.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class DataSeeder implements CommandLineRunner {

    private final FarmerRepository farmerRepository;
    private final DiseaseRepository diseaseRepository;
    private final PesticideRepository pesticideRepository;
    private final NotificationRepository notificationRepository;
    private final AnalyticsRepository analyticsRepository;
    private final FaqRepository faqRepository;
    private final TestimonialRepository testimonialRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(FarmerRepository farmerRepository, DiseaseRepository diseaseRepository, 
                      PesticideRepository pesticideRepository, NotificationRepository notificationRepository,
                      AnalyticsRepository analyticsRepository, FaqRepository faqRepository,
                      TestimonialRepository testimonialRepository, PasswordEncoder passwordEncoder) {
        this.farmerRepository = farmerRepository;
        this.diseaseRepository = diseaseRepository;
        this.pesticideRepository = pesticideRepository;
        this.notificationRepository = notificationRepository;
        this.analyticsRepository = analyticsRepository;
        this.faqRepository = faqRepository;
        this.testimonialRepository = testimonialRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Ensure Demo Users for each role exist
        seedUserIfMissing("farmer@uzhaviyar.com", "Farmer@123", "Murugan S.", "ROLE_FARMER", "F001", "Paddy", "5 acres");
        seedUserIfMissing("manager@uzhaviyar.com", "Manager@123", "Mr. Rajan Kumar", "ROLE_MANAGER", "M001", "Field Crops & Soil", "South Zone");
        seedUserIfMissing("admin@uzhaviyar.com", "Admin@123", "System Admin", "ROLE_ADMIN", "A001", "Platform Operations", "Head Office");

        if (farmerRepository.count() <= 3) {
            System.out.println("Seeding default Farmers data to MongoDB Atlas...");
            List<Farmer> initialFarmers = Arrays.asList(
                createFarmerObj("F002", "Arun Prakash", "arun@gmail.com", "9876543211", "Erode", "Erode", "Tamil Nadu", "Sugarcane", "8 acres", "Active", Arrays.asList(11.341, 77.7172), "ROLE_FARMER"),
                createFarmerObj("F003", "Karthik", "karthik@gmail.com", "9876543212", "Salem", "Salem", "Tamil Nadu", "Cotton", "4 acres", "Pending", Arrays.asList(11.6643, 78.146), "ROLE_FARMER"),
                createFarmerObj("F004", "Suresh", "suresh@gmail.com", "9876543213", "Madurai", "Madurai", "Tamil Nadu", "Banana", "6 acres", "Active", Arrays.asList(9.9252, 78.1198), "ROLE_FARMER"),
                createFarmerObj("F005", "Prakash", "prakash@gmail.com", "9876543214", "Trichy", "Trichy", "Tamil Nadu", "Maize", "7 acres", "Inactive", Arrays.asList(10.7905, 78.7047), "ROLE_FARMER")
            );
            farmerRepository.saveAll(initialFarmers);
        }

        if (diseaseRepository.count() == 0) {
            System.out.println("Seeding default Diseases data to MongoDB Atlas...");
            List<Disease> initialDiseases = Arrays.asList(
                new Disease(null, "F001", "Leaf Blast", "High", "Detected", "/leaf-blast.jpeg", "Diamond-shaped lesions appear on leaves and gradually spread.", "Tricyclazole 75 WP", "Balanced NPK Fertilizer", "02-07-2026", "Apply suggested fungicide within 5-7 days."),
                new Disease(null, "F002", "Red Rot", "Medium", "Under Treatment", "/red-rot.jpeg", "Leaves become yellow and stem turns reddish inside.", "Carbendazim", "Organic Compost", "03-07-2026", "Apply suggested soil drenching solution immediately."),
                new Disease(null, "F003", "Wilt Disease", "Low", "Recovered", "/wilt-disease.jpeg", "Plants wilt suddenly due to fungal infection in roots.", "Copper Oxychloride", "Vermicompost", "04-07-2026", "Regulate irrigation and avoid waterlogging."),
                new Disease(null, "F004", "Panama Disease", "High", "Detected", "/panama-disease.jpeg", "Banana leaves turn yellow and collapse from outer edge.", "Thiophanate Methyl", "Potassium Rich Fertilizer", "04-07-2026", "Isolate infected crop plot and spray fungicide."),
                new Disease(null, "F005", "Leaf Blight", "Medium", "Under Treatment", "/leaf-blight.jpeg", "Brown lesions spread quickly over leaves reducing crop yield.", "Mancozeb", "Nitrogen Fertilizer", "05-07-2026", "Spray suggested fungicide under dry weather.")
            );
            diseaseRepository.saveAll(initialDiseases);
        }

        if (pesticideRepository.count() == 0) {
            System.out.println("Seeding default Pesticides data to MongoDB Atlas...");
            List<Pesticide> initialPesticides = Arrays.asList(
                new Pesticide(null, "F001", "Tricyclazole 75 WP", "120 g/acre", "Morning", "₹350/kg", "Recommended", "Fungal infections, leaf spot", "Foliar spray", "Wear gloves and protective mask."),
                new Pesticide(null, "F002", "Carbendazim 50 WP", "250 g/acre", "Evening", "₹420/L", "Recommended", "Aphids, thrips, stem borer", "Foliar spray", "Wear chemical goggles."),
                new Pesticide(null, "F003", "Copper Oxychloride", "300 g/acre", "Morning", "₹280/kg", "Applied", "Blast disease, powdery mildew", "Soil drenching", "Wash hands with soap."),
                new Pesticide(null, "F004", "Thiophanate Methyl", "250 g/acre", "Morning", "₹380/kg", "Recommended", "Panama disease, wilt", "Foliar spray", "Avoid spraying against wind."),
                new Pesticide(null, "F005", "Mancozeb 75 WP", "400 g/acre", "Evening", "₹350/kg", "Applied", "Leaf blight, rust", "Foliar spray", "Keep away from animals.")
            );
            pesticideRepository.saveAll(initialPesticides);
        }

        if (notificationRepository.count() == 0) {
            System.out.println("Seeding default Notifications data to MongoDB Atlas...");
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
            System.out.println("Seeding default Analytics data to MongoDB Atlas...");
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

        if (faqRepository.count() == 0) {
            System.out.println("Seeding default FAQs to MongoDB Atlas...");
            List<Faq> initialFaqs = Arrays.asList(
                new Faq(null, "How is the fertilizer quantity calculated?", "It is calculated using data-driven algorithms based on your soil type, crop variety, stage of crop growth, and total acreage."),
                new Faq(null, "Is the disease detection accurate?", "Yes, our computer vision models are trained on thousands of plant disease images with high precision over 95% accuracy."),
                new Faq(null, "How long does manager verification take?", "Typically, an agricultural expert or area manager will review your farm details within 24 to 48 hours."),
                new Faq(null, "Can I update my farm details after registration?", "Yes, you can edit your profile, crop type, land area, and soil specs directly from your settings dashboard anytime."),
                new Faq(null, "Is the platform available in regional languages?", "Yes, Uzhaviyar supports English, Tamil, and Hindi. You can switch your preferred language in dashboard settings.")
            );
            faqRepository.saveAll(initialFaqs);
        }

        if (testimonialRepository.count() == 0) {
            System.out.println("Seeding default Testimonials to MongoDB Atlas...");
            List<Testimonial> initialTestimonials = Arrays.asList(
                new Testimonial(null, "Murugan S.", "Wheat", "5 acres", "Coimbatore, Tamil Nadu", "Uzhaviyar helped me reduce fertilizer cost by 30% and improve my wheat yield significantly.", 5),
                new Testimonial(null, "Ramesh K.", "Rice", "8 acres", "Ludhiana, Punjab", "The disease detection feature saved my rice crop last season. Highly recommended!", 5),
                new Testimonial(null, "Kavitha P.", "Sugarcane", "12 acres", "Nashik, Maharashtra", "The fertilizer calculation is very accurate for my sugarcane farm. Great platform!", 4)
            );
            testimonialRepository.saveAll(initialTestimonials);
        }
    }

    private void seedUserIfMissing(String email, String rawPassword, String name, String role, String farmerId, String crop, String landArea) {
        if (farmerRepository.findByEmail(email).isEmpty()) {
            System.out.println("Seeding user for role " + role + ": " + email);
            Farmer user = new Farmer();
            user.setFarmerId(farmerId);
            user.setName(name);
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode(rawPassword));
            user.setRole(role);
            user.setCrop(crop);
            user.setCropType(crop);
            user.setLandArea(landArea);
            user.setMobile("+91 98765-43210");
            user.setVillage("Coimbatore");
            user.setDistrict("Coimbatore");
            user.setState("Tamil Nadu");
            user.setStatus("Active");
            user.setPosition(Arrays.asList(11.0168, 76.9558));
            farmerRepository.save(user);
        }
    }

    private Farmer createFarmerObj(String farmerId, String name, String email, String mobile, String village, 
                                   String district, String state, String crop, String landArea, String status, 
                                   List<Double> position, String role) {
        Farmer f = new Farmer();
        f.setFarmerId(farmerId);
        f.setName(name);
        f.setEmail(email);
        f.setPassword(passwordEncoder.encode("Farmer@123"));
        f.setMobile(mobile);
        f.setVillage(village);
        f.setDistrict(district);
        f.setState(state);
        f.setCrop(crop);
        f.setCropType(crop);
        f.setLandArea(landArea);
        f.setStatus(status);
        f.setPosition(position);
        f.setRole(role);
        f.setFertilizerName("Urea");
        f.setCropHealth(88);
        f.setDiseaseControl(80);
        f.setFertilizer(84);
        f.setCropYield(89);
        f.setSoilHealth(85);
        f.setTemperature(75.0);
        f.setHumidity(70.0);
        f.setLastLogin("Recently");
        return f;
    }
}
