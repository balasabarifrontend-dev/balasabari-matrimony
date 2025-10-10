package com.matrimony.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "profiles")
public class Profile {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String gender;

    @Column(nullable = false)
    private Integer age;

    private String location;
    private String religion;
    private String caste;

    private String profileImage;
    private String image1;
    private String image2;
    private String image3;
    
    // Additional fields for advanced search
    private String maritalStatus;
    private Double height; // in cm
    private String education;
    private String occupation;
    private Double annualIncome;
    private String familyStatus;
    private String familyType;
    
    @Column(columnDefinition = "TEXT")
    private String about;
    
    private String country;
    private String state;
    private String district;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructors
    public Profile() {}

    public Profile(User user, String fullName, String gender, Integer age, String location, 
                   String religion, String caste) {
        this.user = user;
        this.fullName = fullName;
        this.gender = gender;
        this.age = age;
        this.location = location;
        this.religion = religion;
        this.caste = caste;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getReligion() { return religion; }
    public void setReligion(String religion) { this.religion = religion; }
    public String getCaste() { return caste; }
    public void setCaste(String caste) { this.caste = caste; }
    public String getMaritalStatus() { return maritalStatus; }
    public void setMaritalStatus(String maritalStatus) { this.maritalStatus = maritalStatus; }
    public Double getHeight() { return height; }
    public void setHeight(Double height) { this.height = height; }
    public String getEducation() { return education; }
    public void setEducation(String education) { this.education = education; }
    public String getOccupation() { return occupation; }
    public void setOccupation(String occupation) { this.occupation = occupation; }
    public Double getAnnualIncome() { return annualIncome; }
    public void setAnnualIncome(Double annualIncome) { this.annualIncome = annualIncome; }
    public String getFamilyStatus() { return familyStatus; }
    public void setFamilyStatus(String familyStatus) { this.familyStatus = familyStatus; }
    public String getFamilyType() { return familyType; }
    public void setFamilyType(String familyType) { this.familyType = familyType; }
    public String getAbout() { return about; }
    public void setAbout(String about) { this.about = about; }
    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    public String getProfileImage() { return profileImage; }
    public void setProfileImage(String profileImage) { this.profileImage = profileImage; }
    public String getImage1() { return image1; }
    public void setImage1(String image1) { this.image1 = image1; }
    public String getImage2() { return image2; }
    public void setImage2(String image2) { this.image2 = image2; }
    public String getImage3() { return image3; }
    public void setImage3(String image3) { this.image3 = image3; }

    @Override
    public String toString() {
        return "Profile{" +
                "id=" + id +
                ", user=" + (user != null ? user.getId() : "null") +
                ", fullName='" + fullName + '\'' +
                ", gender='" + gender + '\'' +
                ", age=" + age +
                ", location='" + location + '\'' +
                ", religion='" + religion + '\'' +
                ", caste='" + caste + '\'' +
                '}';
    }
}