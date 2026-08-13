package com.example.farmer.model;

import jakarta.persistence.*;
import com.example.farmer.config.DoubleListConverter;
import java.util.List;

@Entity
@Table(name = "farmers")
public class Farmer {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String farmerId;
    private String name;
    private String email;
    private String password;
    private String mobile;
    private String village;
    private String district;
    private String state;
    private String crop;
    private String cropType;
    private String landArea;
    private String status;

    @Convert(converter = DoubleListConverter.class)
    @Column(name = "location_position", columnDefinition = "TEXT")
    private List<Double> position; // [latitude, longitude]
    private String fertilizerName;
    private Integer cropHealth;
    private Integer diseaseControl;
    private Integer fertilizer;
    private Integer cropYield;
    private Integer soilHealth;
    private Double temperature;
    private Double humidity;
    private String role;
    private String lastLogin;

    public Farmer() {}

    public Farmer(String id, String farmerId, String name, String email, String mobile, String village, 
                  String district, String state, String crop, String cropType, String landArea, String status, 
                  List<Double> position, String fertilizerName, Integer cropHealth, Integer diseaseControl, 
                  Integer fertilizer, Integer cropYield, Integer soilHealth, Double temperature, Double humidity, 
                  String role, String lastLogin) {
        this.id = id;
        this.farmerId = farmerId;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.village = village;
        this.district = district;
        this.state = state;
        this.crop = crop;
        this.cropType = cropType;
        this.landArea = landArea;
        this.status = status;
        this.position = position;
        this.fertilizerName = fertilizerName;
        this.cropHealth = cropHealth;
        this.diseaseControl = diseaseControl;
        this.fertilizer = fertilizer;
        this.cropYield = cropYield;
        this.soilHealth = soilHealth;
        this.temperature = temperature;
        this.humidity = humidity;
        this.role = role;
        this.lastLogin = lastLogin;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getFarmerId() { return farmerId; }
    public void setFarmerId(String farmerId) { this.farmerId = farmerId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }

    public String getVillage() { return village; }
    public void setVillage(String village) { this.village = village; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getCrop() { return crop; }
    public void setCrop(String crop) { this.crop = crop; }

    public String getCropType() { return cropType; }
    public void setCropType(String cropType) { this.cropType = cropType; }

    public String getLandArea() { return landArea; }
    public void setLandArea(String landArea) { this.landArea = landArea; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public List<Double> getPosition() { return position; }
    public void setPosition(List<Double> position) { this.position = position; }

    public String getFertilizerName() { return fertilizerName; }
    public void setFertilizerName(String fertilizerName) { this.fertilizerName = fertilizerName; }

    public Integer getCropHealth() { return cropHealth; }
    public void setCropHealth(Integer cropHealth) { this.cropHealth = cropHealth; }

    public Integer getDiseaseControl() { return diseaseControl; }
    public void setDiseaseControl(Integer diseaseControl) { this.diseaseControl = diseaseControl; }

    public Integer getFertilizer() { return fertilizer; }
    public void setFertilizer(Integer fertilizer) { this.fertilizer = fertilizer; }

    public Integer getCropYield() { return cropYield; }
    public void setCropYield(Integer cropYield) { this.cropYield = cropYield; }

    public Integer getSoilHealth() { return soilHealth; }
    public void setSoilHealth(Integer soilHealth) { this.soilHealth = soilHealth; }

    public Double getTemperature() { return temperature; }
    public void setTemperature(Double temperature) { this.temperature = temperature; }

    public Double getHumidity() { return humidity; }
    public void setHumidity(Double humidity) { this.humidity = humidity; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getLastLogin() { return lastLogin; }
    public void setLastLogin(String lastLogin) { this.lastLogin = lastLogin; }
}
