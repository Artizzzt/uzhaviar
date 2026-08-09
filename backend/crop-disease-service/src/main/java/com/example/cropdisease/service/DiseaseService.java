package com.example.cropdisease.service;

import com.example.cropdisease.model.Disease;
import com.example.cropdisease.repository.DiseaseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DiseaseService {

    private final DiseaseRepository diseaseRepository;

    public DiseaseService(DiseaseRepository diseaseRepository) {
        this.diseaseRepository = diseaseRepository;
    }

    public List<Disease> getAllDiseases() {
        return diseaseRepository.findAll();
    }

    public List<Disease> getDiseasesByFarmerId(String farmerId) {
        return diseaseRepository.findByFarmerId(farmerId);
    }

    public Optional<Disease> getDiseaseById(String id) {
        return diseaseRepository.findById(id);
    }

    public Disease saveDisease(Disease disease) {
        return diseaseRepository.save(disease);
    }

    public Disease updateDisease(String id, Disease updated) {
        return diseaseRepository.findById(id).map(existing -> {
            if (updated.getDisease() != null) existing.setDisease(updated.getDisease());
            if (updated.getSeverity() != null) existing.setSeverity(updated.getSeverity());
            if (updated.getStatus() != null) existing.setStatus(updated.getStatus());
            if (updated.getImage() != null) existing.setImage(updated.getImage());
            if (updated.getSymptoms() != null) existing.setSymptoms(updated.getSymptoms());
            if (updated.getPesticide() != null) existing.setPesticide(updated.getPesticide());
            if (updated.getFertilizer() != null) existing.setFertilizer(updated.getFertilizer());
            if (updated.getDate() != null) existing.setDate(updated.getDate());
            if (updated.getAction() != null) existing.setAction(updated.getAction());
            return diseaseRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Disease record not found with id " + id));
    }

    public void deleteDisease(String id) {
        diseaseRepository.deleteById(id);
    }
}
