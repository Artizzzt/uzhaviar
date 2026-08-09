package com.example.farmer.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "testimonials")
public class Testimonial {

    @Id
    private String id;
    private String name;
    private String cropType;
    private String landArea;
    private String location;
    private String text;
    private int rating;

    public Testimonial() {}

    public Testimonial(String id, String name, String cropType, String landArea, String location, String text, int rating) {
        this.id = id;
        this.name = name;
        this.cropType = cropType;
        this.landArea = landArea;
        this.location = location;
        this.text = text;
        this.rating = rating;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCropType() { return cropType; }
    public void setCropType(String cropType) { this.cropType = cropType; }

    public String getLandArea() { return landArea; }
    public void setLandArea(String landArea) { this.landArea = landArea; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }
}
