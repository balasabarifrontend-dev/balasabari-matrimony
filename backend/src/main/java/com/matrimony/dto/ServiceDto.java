package com.matrimony.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ServiceDto {
    private Long id;
    
    @NotBlank(message = "Service name is required")
    private String name;
    
    @NotBlank(message = "Service description is required")
    private String description;
    
    private String category = "GENERAL"; // PREMIUM, BASIC, SUPPORT, etc.
    private BigDecimal price;
    private String duration; // ONE_TIME, MONTHLY, YEARLY
    private String currency = "INR";
    private String icon; // URL or icon class
    private Integer displayOrder = 0;
    private boolean active = true;
    private boolean featured = false;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Default constructor
    public ServiceDto() {}

    // Constructor for your existing code compatibility
    public ServiceDto(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = BigDecimal.ZERO;
    }

    // Constructor with all fields
    public ServiceDto(Long id, String name, String description, String category, 
                     BigDecimal price, String duration, boolean featured) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.price = price;
        this.duration = duration;
        this.featured = featured;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

    public boolean isFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}