package com.example.server.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "notifications")
public class Notification {

    @Id
    private String id;
    private String icon;
    private String title;
    private String message;
    private String timestamp;
    private boolean read;
    private String link;

    public Notification() {}

    public Notification(String id, String icon, String title, String message, String timestamp, boolean read, String link) {
        this.id = id;
        this.icon = icon;
        this.title = title;
        this.message = message;
        this.timestamp = timestamp;
        this.read = read;
        this.link = link;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }

    public boolean isRead() { return read; }
    public void setRead(boolean read) { this.read = read; }

    public String getLink() { return link; }
    public void setLink(String link) { this.link = link; }
}
