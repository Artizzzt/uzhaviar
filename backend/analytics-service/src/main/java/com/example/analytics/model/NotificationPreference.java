package com.example.analytics.model;

import jakarta.persistence.*;

@Entity
@Table(name = "notification_preferences")
public class NotificationPreference {

    @Id
    private String farmerId;

    @Column(name = "fertilizer")
    private boolean fertilizer = true;

    @Column(name = "disease")
    private boolean disease = true;

    @Column(name = "weekly")
    private boolean weekly = true;

    public NotificationPreference() {}

    public NotificationPreference(String farmerId, boolean fertilizer, boolean disease, boolean weekly) {
        this.farmerId = farmerId;
        this.fertilizer = fertilizer;
        this.disease = disease;
        this.weekly = weekly;
    }

    public String getFarmerId() {
        return farmerId;
    }

    public void setFarmerId(String farmerId) {
        this.farmerId = farmerId;
    }

    public boolean isFertilizer() {
        return fertilizer;
    }

    public void setFertilizer(boolean fertilizer) {
        this.fertilizer = fertilizer;
    }

    public boolean isDisease() {
        return disease;
    }

    public void setDisease(boolean disease) {
        this.disease = disease;
    }

    public boolean isWeekly() {
        return weekly;
    }

    public void setWeekly(boolean weekly) {
        this.weekly = weekly;
    }
}
