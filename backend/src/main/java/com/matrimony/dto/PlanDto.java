package com.matrimony.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class PlanDto {
    private Long id;
    
    @NotBlank(message = "Plan name is required")
    private String name;
    
    private String description;
    
    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private BigDecimal price;
    
    @NotBlank(message = "Duration is required")
    private String duration; // MONTHLY, QUARTERLY, YEARLY
    
    private String currency = "INR";
    
    @NotNull(message = "Features list is required")
    private List<String> features;
    
    private boolean active = true;
    private Integer displayOrder = 0;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructors
    public PlanDto() {}
    
    // Constructor for static data compatibility
    public PlanDto(Long id, String name, String priceDisplay, List<String> features) {
        this.id = id;
        this.name = name;
        // Parse price from display string like "₹499 / month"
        this.price = parsePriceFromDisplay(priceDisplay);
        this.features = features;
        this.duration = "MONTHLY";
        this.description = "Premium matrimony plan";
    }
    
    public PlanDto(Long id, String name, String description, BigDecimal price, 
                   String duration, List<String> features, boolean active) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.duration = duration;
        this.features = features;
        this.active = active;
    }

    // Helper method to parse price from display string
    private BigDecimal parsePriceFromDisplay(String priceDisplay) {
        try {
            // Extract numbers from string like "₹499 / month"
            String priceStr = priceDisplay.replaceAll("[^\\d.]", "");
            return new BigDecimal(priceStr);
        } catch (Exception e) {
            return BigDecimal.ZERO;
        }
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }
    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }
    public List<String> getFeatures() { return features; }
    public void setFeatures(List<String> features) { this.features = features; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}