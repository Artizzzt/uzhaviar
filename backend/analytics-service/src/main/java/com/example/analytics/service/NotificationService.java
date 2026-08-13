package com.example.analytics.service;

import com.example.analytics.model.Notification;
import com.example.analytics.model.NotificationPreference;
import com.example.analytics.repository.NotificationRepository;
import com.example.analytics.repository.NotificationPreferenceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final NotificationPreferenceRepository preferenceRepository;

    public NotificationService(NotificationRepository notificationRepository, NotificationPreferenceRepository preferenceRepository) {
        this.notificationRepository = notificationRepository;
        this.preferenceRepository = preferenceRepository;
    }

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public List<Notification> getAllNotificationsFiltered(String farmerId) {
        NotificationPreference prefs = preferenceRepository.findById(farmerId)
                .orElseGet(() -> new NotificationPreference(farmerId, true, true, true));

        List<Notification> allNotifs = notificationRepository.findAll();

        return allNotifs.stream().filter(notif -> {
            String title = notif.getTitle() != null ? notif.getTitle().toLowerCase() : "";
            String message = notif.getMessage() != null ? notif.getMessage().toLowerCase() : "";

            boolean isFertilizer = title.contains("fertilizer") || message.contains("npk") || message.contains("urea") || message.contains("dap");
            boolean isDisease = title.contains("disease") || title.contains("mildew") || title.contains("blight") || title.contains("rot") || title.contains("blast");
            boolean isWeekly = title.contains("weekly") || title.contains("report") || title.contains("manager") || title.contains("visit") || title.contains("weather");

            if (isFertilizer && !prefs.isFertilizer()) return false;
            if (isDisease && !prefs.isDisease()) return false;
            if (isWeekly && !prefs.isWeekly()) return false;

            return true;
        }).toList();
    }

    public Notification saveNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    public Notification markAsRead(String id) {
        return notificationRepository.findById(id).map(notif -> {
            notif.setRead(true);
            return notificationRepository.save(notif);
        }).orElseThrow(() -> new RuntimeException("Notification not found with id " + id));
    }
}
