package com.example.farmer.config;

import com.example.farmer.model.*;
import com.example.farmer.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class DataSeeder implements CommandLineRunner {

    private final FarmerRepository farmerRepository;
    private final FaqRepository faqRepository;
    private final TestimonialRepository testimonialRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(FarmerRepository farmerRepository, FaqRepository faqRepository,
                      TestimonialRepository testimonialRepository, PasswordEncoder passwordEncoder) {
        this.farmerRepository = farmerRepository;
        this.faqRepository = faqRepository;
        this.testimonialRepository = testimonialRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        seedUserIfMissing("farmer@uzhaviyar.com", "Farmer@123", "Murugan S.", "ROLE_FARMER", "F001", "Paddy", "5 acres");
        seedUserIfMissing("manager@uzhaviyar.com", "Manager@123", "Mr. Rajan Kumar", "ROLE_MANAGER", "M001", "Field Crops & Soil", "South Zone");
        seedUserIfMissing("admin@uzhaviyar.com", "Admin@123", "System Admin", "ROLE_ADMIN", "A001", "Platform Operations", "Head Office");

        if (farmerRepository.count() <= 3) {
            System.out.println("Seeding default Farmers data to MongoDB Atlas (Farmer Service)...");
            List<Farmer> initialFarmers = Arrays.asList(
                createFarmerObj("F002", "Arun Prakash", "arun@gmail.com", "9876543211", "Erode", "Erode", "Tamil Nadu", "Sugarcane", "8 acres", "Active", Arrays.asList(11.341, 77.7172), "ROLE_FARMER"),
                createFarmerObj("F003", "Karthik", "karthik@gmail.com", "9876543212", "Salem", "Salem", "Tamil Nadu", "Cotton", "4 acres", "Pending", Arrays.asList(11.6643, 78.146), "ROLE_FARMER"),
                createFarmerObj("F004", "Suresh", "suresh@gmail.com", "9876543213", "Madurai", "Madurai", "Tamil Nadu", "Banana", "6 acres", "Active", Arrays.asList(9.9252, 78.1198), "ROLE_FARMER"),
                createFarmerObj("F005", "Prakash", "prakash@gmail.com", "9876543214", "Trichy", "Trichy", "Tamil Nadu", "Maize", "7 acres", "Inactive", Arrays.asList(10.7905, 78.7047), "ROLE_FARMER")
            );
            farmerRepository.saveAll(initialFarmers);
        }

        if (faqRepository.count() == 0) {
            System.out.println("Seeding default FAQs to MongoDB Atlas (Farmer Service)...");
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
            System.out.println("Seeding default Testimonials to MongoDB Atlas (Farmer Service)...");
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
