package com.matrimony.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class ProfileDto {
    private Long id;
    
    @NotBlank(message = "Full name is required")
    private String fullName;
    
    @NotBlank(message = "Gender is required")
    private String gender;
    
    @NotNull(message = "Age is required")
    @Positive(message = "Age must be positive")
    private Integer age;
    
    private String location;
    private String religion;
    private String caste;
    
    @NotNull(message = "User ID is required")
    private Long userId;

    // Additional fields for enhanced filtering
    private String maritalStatus;
    private Double height;
    private String education;
    private String occupation;
    private String familyStatus;
    private String familyType;
    private String about;
    
    private String profileImage;
    private String image1;
    private String image2;
    private String image3; 


    public ProfileDto() {}

    public ProfileDto(Long id, String fullName, String gender, Integer age, String location, 
                     String religion, String caste, Long userId) {
        this.id = id;
        this.fullName = fullName;
        this.gender = gender;
        this.age = age;
        this.location = location;
        this.religion = religion;
        this.caste = caste;
        this.userId = userId;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
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
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getMaritalStatus() { return maritalStatus; }
    public void setMaritalStatus(String maritalStatus) { this.maritalStatus = maritalStatus; }
    public Double getHeight() { return height; }
    public void setHeight(Double height) { this.height = height; }
    public String getEducation() { return education; }
    public void setEducation(String education) { this.education = education; }
    public String getOccupation() { return occupation; }
    public void setOccupation(String occupation) { this.occupation = occupation; }
    public String getFamilyStatus() { return familyStatus; }
    public void setFamilyStatus(String familyStatus) { this.familyStatus = familyStatus; }
    public String getFamilyType() { return familyType; }
    public void setFamilyType(String familyType) { this.familyType = familyType; }
    public String getAbout() { return about; }
    public void setAbout(String about) { this.about = about; }
    public String getProfileImage() { return profileImage; }
    public void setProfileImage(String profileImage) { this.profileImage = profileImage; }
    public String getImage1() { return image1; }
    public void setImage1(String image1) { this.image1 = image1; }
    public String getImage2() { return image2; }
    public void setImage2(String image2) { this.image2 = image2; }
    public String getImage3() { return image3; }
    public void setImage3(String image3) { this.image3 = image3; }
}