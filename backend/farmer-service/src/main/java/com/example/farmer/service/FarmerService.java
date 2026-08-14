package com.example.farmer.service;

import com.example.farmer.model.Farmer;
import com.example.farmer.repository.FarmerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FarmerService {

    private final FarmerRepository farmerRepository;

    public FarmerService(FarmerRepository farmerRepository) {
        this.farmerRepository = farmerRepository;
    }

    public List<Farmer> getAllFarmers() {
        return farmerRepository.findAll();
    }

    public Optional<Farmer> getFarmerById(String id) {
        return farmerRepository.findById(id);
    }

    public Optional<Farmer> getFarmerByFarmerId(String farmerId) {
        List<Farmer> list = farmerRepository.findByFarmerId(farmerId);
        return list.isEmpty() ? Optional.empty() : Optional.of(list.get(0));
    }

    public Optional<Farmer> getFarmerByEmail(String email) {
        return farmerRepository.findByEmail(email);
    }

    public Farmer saveFarmer(Farmer farmer) {
        if (farmer.getId() == null) {
            // New farmer defaults
            if (farmer.getFarmerId() == null || farmer.getFarmerId().isEmpty()) {
                long count = farmerRepository.count() + 1;
                farmer.setFarmerId(String.format("F%03d", count));
            }
            if (farmer.getStatus() == null || farmer.getStatus().isEmpty()) {
                farmer.setStatus("Active");
            }
            if (farmer.getCrop() == null || farmer.getCrop().isEmpty()) {
                farmer.setCrop(farmer.getCropType() != null ? farmer.getCropType() : "Paddy");
            }
            if (farmer.getFertilizerName() == null || farmer.getFertilizerName().isEmpty()) {
                farmer.setFertilizerName("Urea");
            }
            java.util.Random random = new java.util.Random();
            if (farmer.getCropHealth() == null) {
                farmer.setCropHealth(80 + random.nextInt(15));
            }
            if (farmer.getDiseaseControl() == null) {
                farmer.setDiseaseControl(75 + random.nextInt(20));
            }
            if (farmer.getFertilizer() == null) {
                farmer.setFertilizer(80 + random.nextInt(15));
            }
            if (farmer.getCropYield() == null) {
                farmer.setCropYield(80 + random.nextInt(15));
            }
            if (farmer.getSoilHealth() == null) {
                farmer.setSoilHealth(82 + random.nextInt(13));
            }
            if (farmer.getTemperature() == null) {
                farmer.setTemperature(74.0 + random.nextDouble() * 5.0);
            }
            if (farmer.getHumidity() == null) {
                farmer.setHumidity(68.0 + random.nextDouble() * 7.0);
            }
            if (farmer.getPosition() == null || farmer.getPosition().isEmpty()) {
                // Default coordinates around Coimbatore/Tamil Nadu region
                farmer.setPosition(java.util.Arrays.asList(
                    11.0 + random.nextDouble() * 0.4,
                    77.0 + random.nextDouble() * 0.4
                ));
            }
        }
        return farmerRepository.save(farmer);
    }

    public Farmer updateFarmer(String id, Farmer updatedFarmer) {
        return farmerRepository.findById(id).map(existing -> {
            if (updatedFarmer.getName() != null) existing.setName(updatedFarmer.getName());
            if (updatedFarmer.getEmail() != null) existing.setEmail(updatedFarmer.getEmail());
            if (updatedFarmer.getMobile() != null) existing.setMobile(updatedFarmer.getMobile());
            if (updatedFarmer.getVillage() != null) existing.setVillage(updatedFarmer.getVillage());
            if (updatedFarmer.getDistrict() != null) existing.setDistrict(updatedFarmer.getDistrict());
            if (updatedFarmer.getState() != null) existing.setState(updatedFarmer.getState());
            if (updatedFarmer.getCrop() != null) existing.setCrop(updatedFarmer.getCrop());
            if (updatedFarmer.getCropType() != null) existing.setCropType(updatedFarmer.getCropType());
            if (updatedFarmer.getLandArea() != null) existing.setLandArea(updatedFarmer.getLandArea());
            if (updatedFarmer.getStatus() != null) existing.setStatus(updatedFarmer.getStatus());
            if (updatedFarmer.getPosition() != null) existing.setPosition(updatedFarmer.getPosition());
            if (updatedFarmer.getFertilizerName() != null) existing.setFertilizerName(updatedFarmer.getFertilizerName());
            if (updatedFarmer.getCropHealth() != null) existing.setCropHealth(updatedFarmer.getCropHealth());
            if (updatedFarmer.getDiseaseControl() != null) existing.setDiseaseControl(updatedFarmer.getDiseaseControl());
            if (updatedFarmer.getFertilizer() != null) existing.setFertilizer(updatedFarmer.getFertilizer());
            if (updatedFarmer.getCropYield() != null) existing.setCropYield(updatedFarmer.getCropYield());
            if (updatedFarmer.getSoilHealth() != null) existing.setSoilHealth(updatedFarmer.getSoilHealth());
            if (updatedFarmer.getTemperature() != null) existing.setTemperature(updatedFarmer.getTemperature());
            if (updatedFarmer.getHumidity() != null) existing.setHumidity(updatedFarmer.getHumidity());
            return farmerRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Farmer not found with id " + id));
    }

    public void deleteFarmer(String id) {
        farmerRepository.deleteById(id);
    }
}
