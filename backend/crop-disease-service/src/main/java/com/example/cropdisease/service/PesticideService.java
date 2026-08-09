package com.example.cropdisease.service;

import com.example.cropdisease.model.Pesticide;
import com.example.cropdisease.repository.PesticideRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PesticideService {

    private final PesticideRepository pesticideRepository;

    public PesticideService(PesticideRepository pesticideRepository) {
        this.pesticideRepository = pesticideRepository;
    }

    public List<Pesticide> getAllPesticides() {
        return pesticideRepository.findAll();
    }

    public List<Pesticide> getPesticidesByFarmerId(String farmerId) {
        return pesticideRepository.findByFarmerId(farmerId);
    }

    public Optional<Pesticide> getPesticideById(String id) {
        return pesticideRepository.findById(id);
    }

    public Pesticide savePesticide(Pesticide pesticide) {
        return pesticideRepository.save(pesticide);
    }

    public Pesticide updatePesticide(String id, Pesticide updated) {
        return pesticideRepository.findById(id).map(existing -> {
            if (updated.getPesticide() != null) existing.setPesticide(updated.getPesticide());
            if (updated.getDosage() != null) existing.setDosage(updated.getDosage());
            if (updated.getSprayTime() != null) existing.setSprayTime(updated.getSprayTime());
            if (updated.getCost() != null) existing.setCost(updated.getCost());
            if (updated.getStatus() != null) existing.setStatus(updated.getStatus());
            if (updated.getTargetPests() != null) existing.setTargetPests(updated.getTargetPests());
            if (updated.getMethod() != null) existing.setMethod(updated.getMethod());
            if (updated.getPrecautions() != null) existing.setPrecautions(updated.getPrecautions());
            return pesticideRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Pesticide record not found with id " + id));
    }

    public void deletePesticide(String id) {
        pesticideRepository.deleteById(id);
    }
}
