package com.example.server.controller;

import com.example.server.model.Disease;
import com.example.server.service.DiseaseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diseases")
public class DiseaseController {

    private final DiseaseService diseaseService;

    public DiseaseController(DiseaseService diseaseService) {
        this.diseaseService = diseaseService;
    }

    @GetMapping
    public ResponseEntity<List<Disease>> getAllDiseases() {
        return ResponseEntity.ok(diseaseService.getAllDiseases());
    }

    @GetMapping("/farmer/{farmerId}")
    public ResponseEntity<List<Disease>> getDiseasesByFarmerId(@PathVariable String farmerId) {
        return ResponseEntity.ok(diseaseService.getDiseasesByFarmerId(farmerId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Disease> getDiseaseById(@PathVariable String id) {
        return diseaseService.getDiseaseById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Disease> createDisease(@RequestBody Disease disease) {
        Disease saved = diseaseService.saveDisease(disease);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Disease> updateDisease(@PathVariable String id, @RequestBody Disease disease) {
        try {
            Disease updated = diseaseService.updateDisease(id, disease);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDisease(@PathVariable String id) {
        diseaseService.deleteDisease(id);
        return ResponseEntity.noContent().build();
    }
}
