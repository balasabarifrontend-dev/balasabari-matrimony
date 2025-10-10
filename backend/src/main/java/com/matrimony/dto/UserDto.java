package com.matrimony.dto;

import com.matrimony.model.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class UserDto {
    private Long id;
    
    @NotBlank(message = "Name is required")
    private String name;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
    
    @NotBlank(message = "Mobile number is required")
    @Size(min = 10, max = 15, message = "Mobile number must be between 10 and 15 digits")
    private String mobile;
    
    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
    
    private User.Role role;
    private User.Status status;
    private LocalDateTime createdAt;

    private String gender;
    
    // FIX: Make dob optional in DTO
    private LocalDate dob;

    // Constructors
    public UserDto() {}

    public UserDto(Long id, String name, String email, String mobile, String password, 
                   User.Role role, User.Status status, LocalDate dob) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.password = password;
        this.role = role;
        this.status = status;
        this.dob = dob;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public User.Role getRole() { return role; }
    public void setRole(User.Role role) { this.role = role; }
    
    public User.Status getStatus() { return status; }
    public void setStatus(User.Status status) { this.status = status; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDate getDob() { return dob; }
    public void setDob(LocalDate dob) { this.dob = dob; }

    // ✅ ADD THIS toString METHOD FOR BETTER LOGGING
    @Override
    public String toString() {
        return "UserDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", mobile='" + mobile + '\'' +
                ", password='[PROTECTED]'" +
                ", role=" + role +
                ", status=" + status +
                ", createdAt=" + createdAt +
                ", dob=" + dob +
                '}';
    }
}