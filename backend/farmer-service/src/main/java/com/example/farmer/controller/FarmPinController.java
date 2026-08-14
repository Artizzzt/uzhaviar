package com.example.farmer.controller;

import com.example.farmer.model.FarmPin;
import com.example.farmer.repository.FarmPinRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/farmers/pins")
public class FarmPinController {

    private final FarmPinRepository pinRepository;

    public FarmPinController(FarmPinRepository pinRepository) {
        this.pinRepository = pinRepository;
    }

    @GetMapping("/{farmerId}")
    public ResponseEntity<List<FarmPin>> getPinsByFarmer(@PathVariable String farmerId) {
        return ResponseEntity.ok(pinRepository.findByFarmerId(farmerId));
    }

    @PostMapping
    public ResponseEntity<FarmPin> savePin(@RequestBody FarmPin pin) {
        return ResponseEntity.ok(pinRepository.save(pin));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePin(@PathVariable String id) {
        pinRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
