package com.example.analytics.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
import java.util.Map;

@Document(collection = "analytics")
public class AnalyticsData {

    @Id
    private String id;
    private List<Map<String, Object>> cropHealthTrend;
    private List<Map<String, Object>> fertilizerTrend;
    private List<Map<String, Object>> soilMoistureTrend;
    private List<Map<String, Object>> diseaseHistory;
    private List<Map<String, Object>> yieldEstimation;
    private Map<String, Integer> soilNutrients;

    public AnalyticsData() {}

    public AnalyticsData(String id, List<Map<String, Object>> cropHealthTrend, List<Map<String, Object>> fertilizerTrend, 
                         List<Map<String, Object>> soilMoistureTrend, List<Map<String, Object>> diseaseHistory, 
                         List<Map<String, Object>> yieldEstimation, Map<String, Integer> soilNutrients) {
        this.id = id;
        this.cropHealthTrend = cropHealthTrend;
        this.fertilizerTrend = fertilizerTrend;
        this.soilMoistureTrend = soilMoistureTrend;
        this.diseaseHistory = diseaseHistory;
        this.yieldEstimation = yieldEstimation;
        this.soilNutrients = soilNutrients;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public List<Map<String, Object>> getCropHealthTrend() { return cropHealthTrend; }
    public void setCropHealthTrend(List<Map<String, Object>> cropHealthTrend) { this.cropHealthTrend = cropHealthTrend; }

    public List<Map<String, Object>> getFertilizerTrend() { return fertilizerTrend; }
    public void setFertilizerTrend(List<Map<String, Object>> fertilizerTrend) { this.fertilizerTrend = fertilizerTrend; }

    public List<Map<String, Object>> getSoilMoistureTrend() { return soilMoistureTrend; }
    public void setSoilMoistureTrend(List<Map<String, Object>> soilMoistureTrend) { this.soilMoistureTrend = soilMoistureTrend; }

    public List<Map<String, Object>> getDiseaseHistory() { return diseaseHistory; }
    public void setDiseaseHistory(List<Map<String, Object>> diseaseHistory) { this.diseaseHistory = diseaseHistory; }

    public List<Map<String, Object>> getYieldEstimation() { return yieldEstimation; }
    public void setYieldEstimation(List<Map<String, Object>> yieldEstimation) { this.yieldEstimation = yieldEstimation; }

    public Map<String, Integer> getSoilNutrients() { return soilNutrients; }
    public void setSoilNutrients(Map<String, Integer> soilNutrients) { this.soilNutrients = soilNutrients; }
}
