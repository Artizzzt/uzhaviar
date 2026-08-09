package com.example.server.controller;

import com.example.server.model.Pesticide;
import com.example.server.service.PesticideService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pesticides")
public class PesticideController {

    private final PesticideService pesticideService;

    public PesticideController(PesticideService pesticideService) {
        this.pesticideService = pesticideService;
    }

    @GetMapping
    public ResponseEntity<List<Pesticide>> getAllPesticides() {
        return ResponseEntity.ok(pesticideService.getAllPesticides());
    }

    @GetMapping("/farmer/{farmerId}")
    public ResponseEntity<List<Pesticide>> getPesticidesByFarmerId(@PathVariable String farmerId) {
        return ResponseEntity.ok(pesticideService.getPesticidesByFarmerId(farmerId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pesticide> getPesticideById(@PathVariable String id) {
        return pesticideService.getPesticideById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Pesticide> createPesticide(@RequestBody Pesticide pesticide) {
        Pesticide saved = pesticideService.savePesticide(pesticide);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pesticide> updatePesticide(@PathVariable String id, @RequestBody Pesticide pesticide) {
        try {
            Pesticide updated = pesticideService.updatePesticide(id, pesticide);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePesticide(@PathVariable String id) {
        pesticideService.deletePesticide(id);
        return ResponseEntity.noContent().build();
    }
}
