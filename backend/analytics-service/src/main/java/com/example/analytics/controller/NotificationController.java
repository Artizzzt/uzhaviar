package com.example.analytics.controller;

import com.example.analytics.model.Notification;
import com.example.analytics.model.NotificationPreference;
import com.example.analytics.repository.NotificationPreferenceRepository;
import com.example.analytics.service.NotificationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;
    private final NotificationPreferenceRepository preferenceRepository;

    public NotificationController(NotificationService notificationService, NotificationPreferenceRepository preferenceRepository) {
        this.notificationService = notificationService;
        this.preferenceRepository = preferenceRepository;
    }

    @GetMapping
    public ResponseEntity<List<Notification>> getAllNotifications(@RequestParam(required = false) String farmerId) {
        if (farmerId != null && !farmerId.isEmpty()) {
            return ResponseEntity.ok(notificationService.getAllNotificationsFiltered(farmerId));
        }
        return ResponseEntity.ok(notificationService.getAllNotifications());
    }

    @PostMapping
    public ResponseEntity<Notification> createNotification(@RequestBody Notification notification) {
        Notification saved = notificationService.saveNotification(notification);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<Notification> markAsRead(@PathVariable String id) {
        try {
            Notification updated = notificationService.markAsRead(id);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/preferences/{farmerId}")
    public ResponseEntity<NotificationPreference> getPreferences(@PathVariable String farmerId) {
        NotificationPreference prefs = preferenceRepository.findById(farmerId)
                .orElseGet(() -> new NotificationPreference(farmerId, true, true, true));
        return ResponseEntity.ok(prefs);
    }

    @PostMapping("/preferences")
    public ResponseEntity<NotificationPreference> savePreferences(@RequestBody NotificationPreference prefs) {
        NotificationPreference saved = preferenceRepository.save(prefs);
        return ResponseEntity.ok(saved);
    }
}
