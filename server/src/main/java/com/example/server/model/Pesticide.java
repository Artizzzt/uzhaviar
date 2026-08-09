package com.example.server.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "pesticides")
public class Pesticide {

    @Id
    private String id;
    private String farmerId;
    private String pesticide;
    private String dosage;
    private String sprayTime;
    private String cost;
    private String status; // Recommended, Applied
    private String targetPests;
    private String method;
    private String precautions;

    public Pesticide() {}

    public Pesticide(String id, String farmerId, String pesticide, String dosage, String sprayTime, 
                     String cost, String status, String targetPests, String method, String precautions) {
        this.id = id;
        this.farmerId = farmerId;
        this.pesticide = pesticide;
        this.dosage = dosage;
        this.sprayTime = sprayTime;
        this.cost = cost;
        this.status = status;
        this.targetPests = targetPests;
        this.method = method;
        this.precautions = precautions;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getFarmerId() { return farmerId; }
    public void setFarmerId(String farmerId) { this.farmerId = farmerId; }

    public String getPesticide() { return pesticide; }
    public void setPesticide(String pesticide) { this.pesticide = pesticide; }

    public String getDosage() { return dosage; }
    public void setDosage(String dosage) { this.dosage = dosage; }

    public String getSprayTime() { return sprayTime; }
    public void setSprayTime(String sprayTime) { this.sprayTime = sprayTime; }

    public String getCost() { return cost; }
    public void setCost(String cost) { this.cost = cost; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getTargetPests() { return targetPests; }
    public void setTargetPests(String targetPests) { this.targetPests = targetPests; }

    public String getMethod() { return method; }
    public void setMethod(String method) { this.method = method; }

    public String getPrecautions() { return precautions; }
    public void setPrecautions(String precautions) { this.precautions = precautions; }
}
