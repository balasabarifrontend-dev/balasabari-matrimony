package com.matrimony.dto;

public class ProfileDto {
    private Long id;
    private String fullName;
    private String gender;
    private Integer age;
    private String location;
    private String religion;
    private String caste;
    private Long userId;

    public ProfileDto() {}

    public ProfileDto(Long id, String fullName, String gender, Integer age, String location, String religion, String caste, Long userId) {
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
}
