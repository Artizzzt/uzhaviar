package com.example.server.controller;

import com.example.server.model.Farmer;
import com.example.server.service.FarmerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final FarmerService farmerService;
    private final PasswordEncoder passwordEncoder;

    public AuthController(FarmerService farmerService, PasswordEncoder passwordEncoder) {
        this.farmerService = farmerService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String rawPassword = credentials.get("password");

        Optional<Farmer> farmerOpt = farmerService.getFarmerByEmail(email);

        Farmer farmer;
        if (farmerOpt.isPresent()) {
            farmer = farmerOpt.get();
            // Verify password if set and rawPassword supplied
            if (farmer.getPassword() != null && rawPassword != null && !rawPassword.isEmpty()) {
                if (!passwordEncoder.matches(rawPassword, farmer.getPassword()) && !rawPassword.equals(farmer.getPassword())) {
                    Map<String, String> error = new HashMap<>();
                    error.put("message", "Invalid email or password");
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
                }
            }
        } else {
            // Create default farmer profile if not existing
            farmer = new Farmer();
            farmer.setName("Farmer Murugan");
            farmer.setEmail(email != null ? email : "swath@gmail.com");
            if (rawPassword != null) {
                farmer.setPassword(passwordEncoder.encode(rawPassword));
            }
            farmer.setMobile("+91 98321-48321");
            farmer.setFarmerId("FRM-2026-979");
            farmer.setCropType("Wheat");
            farmer.setLandArea("5 acres");
            farmer.setVillage("Coimbatore");
            farmer.setState("Tamil Nadu");
            farmer.setStatus("Active");
            farmer = farmerService.saveFarmer(farmer);
        }

        farmer.setLastLogin(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a")));
        farmerService.updateFarmer(farmer.getId(), farmer);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("user", farmer);
        response.put("token", "jwt-token-bcrypt-" + System.currentTimeMillis());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Farmer farmerData) {
        if (farmerData.getEmail() != null && farmerService.getFarmerByEmail(farmerData.getEmail()).isPresent()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Email is already registered");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }

        if (farmerData.getName() == null || farmerData.getName().isEmpty()) {
            farmerData.setName("New Farmer");
        }

        // Hash password before saving if provided
        if (farmerData.getPassword() != null && !farmerData.getPassword().isEmpty()) {
            farmerData.setPassword(passwordEncoder.encode(farmerData.getPassword()));
        }

        Farmer saved = farmerService.saveFarmer(farmerData);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("user", saved);
        response.put("token", "jwt-token-bcrypt-" + System.currentTimeMillis());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
