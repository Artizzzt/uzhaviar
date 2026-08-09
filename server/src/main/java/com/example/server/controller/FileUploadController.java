package com.example.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
public class FileUploadController {

    private static final String UPLOAD_DIR = "uploads/";

    @PostMapping
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Please select a file to upload");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }

        try {
            File dir = new File(UPLOAD_DIR);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }

            String newFilename = UUID.randomUUID().toString() + extension;
            Path filePath = Paths.get(UPLOAD_DIR + newFilename);
            Files.write(filePath, file.getBytes());

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("filename", newFilename);
            response.put("url", "/uploads/" + newFilename);

            return ResponseEntity.ok(response);
        } catch (IOException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Failed to store file: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}
