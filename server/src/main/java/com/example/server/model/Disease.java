package com.example.server.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "diseases")
public class Disease {

    @Id
    private String id;
    private String farmerId;
    private String disease;
    private String severity; // High, Medium, Low
    private String status;   // Detected, Under Treatment, Recovered
    private String image;
    private String symptoms;
    private String pesticide;
    private String fertilizer;
    private String date;
    private String action;

    public Disease() {}

    public Disease(String id, String farmerId, String disease, String severity, String status, 
                   String image, String symptoms, String pesticide, String fertilizer, String date, String action) {
        this.id = id;
        this.farmerId = farmerId;
        this.disease = disease;
        this.severity = severity;
        this.status = status;
        this.image = image;
        this.symptoms = symptoms;
        this.pesticide = pesticide;
        this.fertilizer = fertilizer;
        this.date = date;
        this.action = action;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getFarmerId() { return farmerId; }
    public void setFarmerId(String farmerId) { this.farmerId = farmerId; }

    public String getDisease() { return disease; }
    public void setDisease(String disease) { this.disease = disease; }

    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getSymptoms() { return symptoms; }
    public void setSymptoms(String symptoms) { this.symptoms = symptoms; }

    public String getPesticide() { return pesticide; }
    public void setPesticide(String pesticide) { this.pesticide = pesticide; }

    public String getFertilizer() { return fertilizer; }
    public void setFertilizer(String fertilizer) { this.fertilizer = fertilizer; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
}
