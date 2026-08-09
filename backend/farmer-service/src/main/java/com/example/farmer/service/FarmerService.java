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
        return farmerRepository.findByFarmerId(farmerId);
    }

    public Optional<Farmer> getFarmerByEmail(String email) {
        return farmerRepository.findByEmail(email);
    }

    public Farmer saveFarmer(Farmer farmer) {
        if (farmer.getFarmerId() == null || farmer.getFarmerId().isEmpty()) {
            long count = farmerRepository.count() + 1;
            farmer.setFarmerId(String.format("F%03d", count));
        }
        if (farmer.getStatus() == null || farmer.getStatus().isEmpty()) {
            farmer.setStatus("Active");
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
