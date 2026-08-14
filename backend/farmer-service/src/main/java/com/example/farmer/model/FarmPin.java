package com.example.farmer.model;

import jakarta.persistence.*;

@Entity
@Table(name = "farm_pins")
public class FarmPin {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "farmer_id")
    private String farmerId;

    private double x;
    private double y;
    private String note;
    private String pinType;

    public FarmPin() {}

    public FarmPin(String farmerId, double x, double y, String note, String pinType) {
        this.farmerId = farmerId;
        this.x = x;
        this.y = y;
        this.note = note;
        this.pinType = pinType;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFarmerId() {
        return farmerId;
    }

    public void setFarmerId(String farmerId) {
        this.farmerId = farmerId;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getPinType() {
        return pinType;
    }

    public void setPinType(String pinType) {
        this.pinType = pinType;
    }
}
