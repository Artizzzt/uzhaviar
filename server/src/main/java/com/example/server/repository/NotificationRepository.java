package com.example.server.repository;

import com.example.server.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification, String> {
    List<Notification> findByRead(boolean read);
}
