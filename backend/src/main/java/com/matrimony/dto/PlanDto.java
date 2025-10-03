package com.matrimony.dto;

import java.util.List;

public class PlanDto {
    private Long id;
    private String name;
    private String price;
    private List<String> features;

    public PlanDto() {}

    public PlanDto(Long id, String name, String price, List<String> features) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.features = features;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getPrice() { return price; }
    public void setPrice(String price) { this.price = price; }
    public List<String> getFeatures() { return features; }
    public void setFeatures(List<String> features) { this.features = features; }
}
