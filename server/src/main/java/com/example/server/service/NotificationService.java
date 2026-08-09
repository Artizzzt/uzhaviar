package com.example.server.service;

import com.example.server.model.Notification;
import com.example.server.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
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
