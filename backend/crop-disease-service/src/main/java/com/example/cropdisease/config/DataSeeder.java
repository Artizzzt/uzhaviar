package com.example.cropdisease.config;

import com.example.cropdisease.model.*;
import com.example.cropdisease.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class DataSeeder implements CommandLineRunner {

    private final DiseaseRepository diseaseRepository;
    private final PesticideRepository pesticideRepository;

    public DataSeeder(DiseaseRepository diseaseRepository, PesticideRepository pesticideRepository) {
        this.diseaseRepository = diseaseRepository;
        this.pesticideRepository = pesticideRepository;
    }

    @Override
    public void run(String... args) {
        if (diseaseRepository.count() == 0) {
            System.out.println("Seeding default Diseases data to MongoDB Atlas (Crop Disease Service)...");
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
            System.out.println("Seeding default Pesticides data to MongoDB Atlas (Crop Disease Service)...");
            List<Pesticide> initialPesticides = Arrays.asList(
                new Pesticide(null, "F001", "Tricyclazole 75 WP", "120 g/acre", "Morning", "₹350/kg", "Recommended", "Fungal infections, leaf spot", "Foliar spray", "Wear gloves and protective mask."),
                new Pesticide(null, "F002", "Carbendazim 50 WP", "250 g/acre", "Evening", "₹420/L", "Recommended", "Aphids, thrips, stem borer", "Foliar spray", "Wear chemical goggles."),
                new Pesticide(null, "F003", "Copper Oxychloride", "300 g/acre", "Morning", "₹280/kg", "Applied", "Blast disease, powdery mildew", "Soil drenching", "Wash hands with soap."),
                new Pesticide(null, "F004", "Thiophanate Methyl", "250 g/acre", "Morning", "₹380/kg", "Recommended", "Panama disease, wilt", "Foliar spray", "Avoid spraying against wind."),
                new Pesticide(null, "F005", "Mancozeb 75 WP", "400 g/acre", "Evening", "₹350/kg", "Applied", "Leaf blight, rust", "Foliar spray", "Keep away from animals.")
            );
            pesticideRepository.saveAll(initialPesticides);
        }
    }
}
