package com.matrimony.dto;

public class SearchRequestDto {
    // Basic filters
    private String gender;
    private Integer ageFrom;
    private Integer ageTo;
    private Integer partnerAgeFrom;
    private Integer partnerAgeTo;
    
    // Religion & Caste filters
    private String religion;
    private String casteCategory;
    private String caste;
    private String subCaste;
    
    // Personal details
    private String maritalStatus;
    private Double heightFrom; // in cm (converted from feet in frontend)
    private Double heightTo;   // in cm
    
    // Family details
    private String familyStatus;
    private String familyType;
    
    // Professional details
    private String education;
    private String occupation;
    private Double annualIncomeFrom;
    private Double annualIncomeTo;
    
    // Location
    private String location;
    private String country;
    private String state;
    private String district;

    // Getters and Setters
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public Integer getAgeFrom() { return ageFrom; }
    public void setAgeFrom(Integer ageFrom) { this.ageFrom = ageFrom; }

    public Integer getAgeTo() { return ageTo; }
    public void setAgeTo(Integer ageTo) { this.ageTo = ageTo; }

    public Integer getPartnerAgeFrom() { return partnerAgeFrom; }
    public void setPartnerAgeFrom(Integer partnerAgeFrom) { this.partnerAgeFrom = partnerAgeFrom; }

    public Integer getPartnerAgeTo() { return partnerAgeTo; }
    public void setPartnerAgeTo(Integer partnerAgeTo) { this.partnerAgeTo = partnerAgeTo; }

    public String getReligion() { return religion; }
    public void setReligion(String religion) { this.religion = religion; }

    public String getCasteCategory() { return casteCategory; }
    public void setCasteCategory(String casteCategory) { this.casteCategory = casteCategory; }

    public String getCaste() { return caste; }
    public void setCaste(String caste) { this.caste = caste; }

    public String getSubCaste() { return subCaste; }
    public void setSubCaste(String subCaste) { this.subCaste = subCaste; }

    public String getMaritalStatus() { return maritalStatus; }
    public void setMaritalStatus(String maritalStatus) { this.maritalStatus = maritalStatus; }

    public Double getHeightFrom() { return heightFrom; }
    public void setHeightFrom(Double heightFrom) { this.heightFrom = heightFrom; }

    public Double getHeightTo() { return heightTo; }
    public void setHeightTo(Double heightTo) { this.heightTo = heightTo; }

    public String getFamilyStatus() { return familyStatus; }
    public void setFamilyStatus(String familyStatus) { this.familyStatus = familyStatus; }

    public String getFamilyType() { return familyType; }
    public void setFamilyType(String familyType) { this.familyType = familyType; }

    public String getEducation() { return education; }
    public void setEducation(String education) { this.education = education; }

    public String getOccupation() { return occupation; }
    public void setOccupation(String occupation) { this.occupation = occupation; }

    public Double getAnnualIncomeFrom() { return annualIncomeFrom; }
    public void setAnnualIncomeFrom(Double annualIncomeFrom) { this.annualIncomeFrom = annualIncomeFrom; }

    public Double getAnnualIncomeTo() { return annualIncomeTo; }
    public void setAnnualIncomeTo(Double annualIncomeTo) { this.annualIncomeTo = annualIncomeTo; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    @Override
    public String toString() {
        return "SearchRequestDto{" +
                "gender='" + gender + '\'' +
                ", ageFrom=" + ageFrom +
                ", ageTo=" + ageTo +
                ", religion='" + religion + '\'' +
                ", casteCategory='" + casteCategory + '\'' +
                ", caste='" + caste + '\'' +
                ", maritalStatus='" + maritalStatus + '\'' +
                ", location='" + location + '\'' +
                '}';
    }
}