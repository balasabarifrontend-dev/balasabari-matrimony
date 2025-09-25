package com.matrimony.model;
import jakarta.persistence.*;

@Entity
@Table(name = "profiles")
public class Profile {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    private String fullName;
    private String gender;
    private Integer age;
    private String location;
    private String religion;
    private String caste;

    // Constructors
    public Profile() {}

    public Profile(User user, String fullName, String gender, Integer age, String location, String religion, String caste) {
        this.user = user;
        this.fullName = fullName;
        this.gender = gender;
        this.age = age;
        this.location = location;
        this.religion = religion;
        this.caste = caste;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getReligion() {
        return religion;
    }

    public void setReligion(String religion) {
        this.religion = religion;
    }

    public String getCaste() {
        return caste;
    }

    public void setCaste(String caste) {
        this.caste = caste;
    }

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