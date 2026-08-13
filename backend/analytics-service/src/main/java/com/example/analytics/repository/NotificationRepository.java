package com.example.analytics.repository;

import com.example.analytics.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, String> {
    List<Notification> findByRead(boolean read);
}
