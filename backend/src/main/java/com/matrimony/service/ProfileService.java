package com.matrimony.service;

import com.matrimony.dto.ProfileDto;
import com.matrimony.dto.SearchRequestDto;
import com.matrimony.model.Profile;
import com.matrimony.model.User;
import com.matrimony.repository.ProfileRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProfileService {

    private static final Logger logger = LoggerFactory.getLogger(ProfileService.class);
    
    private final ProfileRepository profileRepository;

    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    public ProfileDto save(ProfileDto dto, User user) {
        logger.info("Saving profile for user: {}", user.getEmail());
        Profile profile = new Profile();
        profile.setUser(user);
        profile.setFullName(dto.getFullName());
        profile.setGender(dto.getGender());
        profile.setAge(dto.getAge());
        profile.setLocation(dto.getLocation());
        profile.setReligion(dto.getReligion());
        profile.setCaste(dto.getCaste());

        // Set additional fields if available
        if (dto.getMaritalStatus() != null) profile.setMaritalStatus(dto.getMaritalStatus());
        if (dto.getHeight() != null) profile.setHeight(dto.getHeight());
        if (dto.getEducation() != null) profile.setEducation(dto.getEducation());
        if (dto.getOccupation() != null) profile.setOccupation(dto.getOccupation());
        if (dto.getFamilyStatus() != null) profile.setFamilyStatus(dto.getFamilyStatus());
        if (dto.getFamilyType() != null) profile.setFamilyType(dto.getFamilyType());
        if (dto.getAbout() != null) profile.setAbout(dto.getAbout());

        Profile saved = profileRepository.save(profile);
        logger.info("Profile saved successfully with ID: {}", saved.getId());
        return mapToDto(saved);
    }

    public Optional<ProfileDto> update(Long id, ProfileDto dto, User user) {
        logger.info("Updating profile ID: {} for user: {}", id, user.getEmail());
        return profileRepository.findById(id).map(profile -> {
            if (!profile.getUser().getId().equals(user.getId())) return null;
            profile.setFullName(dto.getFullName());
            profile.setGender(dto.getGender());
            profile.setAge(dto.getAge());
            profile.setLocation(dto.getLocation());
            profile.setReligion(dto.getReligion());
            profile.setCaste(dto.getCaste());
            
            // Update additional fields if available
            if (dto.getMaritalStatus() != null) profile.setMaritalStatus(dto.getMaritalStatus());
            if (dto.getHeight() != null) profile.setHeight(dto.getHeight());
            if (dto.getEducation() != null) profile.setEducation(dto.getEducation());
            if (dto.getOccupation() != null) profile.setOccupation(dto.getOccupation());
            if (dto.getFamilyStatus() != null) profile.setFamilyStatus(dto.getFamilyStatus());
            if (dto.getFamilyType() != null) profile.setFamilyType(dto.getFamilyType());
            if (dto.getAbout() != null) profile.setAbout(dto.getAbout());
            
            Profile updated = profileRepository.save(profile);
            logger.info("Profile updated successfully: {}", id);
            return mapToDto(updated);
        });
    }

    public boolean delete(Long id) {
        logger.info("Deleting profile ID: {}", id);
        if (profileRepository.existsById(id)) {
            profileRepository.deleteById(id);
            logger.info("Profile deleted successfully: {}", id);
            return true;
        }
        logger.warn("Profile not found for deletion: {}", id);
        return false;
    }

    public Optional<ProfileDto> findById(Long id) {
        logger.debug("Finding profile by ID: {}", id);
        return profileRepository.findById(id).map(this::mapToDto);
    }

    public Optional<ProfileDto> findByUserId(Long userId) {
        logger.debug("Finding profile by user ID: {}", userId);
        return profileRepository.findByUserId(userId).map(this::mapToDto);
    }

    public boolean userHasProfile(Long userId) {
        return profileRepository.findByUserId(userId).isPresent();
    }

    public boolean isProfileOwner(Long profileId, Long userId) {
        return profileRepository.findById(profileId)
                .map(profile -> profile.getUser().getId().equals(userId))
                .orElse(false);
    }

    public List<ProfileDto> search(String gender, Integer minAge, Integer maxAge, String location) {
        logger.info("Searching profiles - Gender: {}, Age: {}-{}, Location: {}", gender, minAge, maxAge, location);
        return profileRepository.findAll().stream()
                .filter(p -> (gender == null || p.getGender().equalsIgnoreCase(gender)) &&
                             (minAge == null || p.getAge() >= minAge) &&
                             (maxAge == null || p.getAge() <= maxAge) &&
                             (location == null || (p.getLocation() != null && p.getLocation().toLowerCase().contains(location.toLowerCase()))))
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    // Advanced search with Map (existing method)
    public List<ProfileDto> advancedSearch(Map<String, Object> searchFilters) {
        logger.info("Advanced search with filters: {}", searchFilters);
        return profileRepository.findAll().stream()
                .filter(profile -> matchesAllFilters(profile, searchFilters))
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    // NEW: Advanced search with SearchRequestDto
    public List<ProfileDto> advancedSearch(SearchRequestDto searchRequest) {
        logger.info("Advanced search with DTO: {}", searchRequest);
        
        return profileRepository.findAll().stream()
                .filter(profile -> matchesSearchRequest(profile, searchRequest))
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    // NEW: Method to convert SearchRequestDto to Map for backward compatibility
    private Map<String, Object> convertSearchRequestToMap(SearchRequestDto searchRequest) {
        Map<String, Object> filters = new HashMap<>();
        
        if (searchRequest.getGender() != null) filters.put("gender", searchRequest.getGender());
        if (searchRequest.getAgeFrom() != null) filters.put("ageFrom", searchRequest.getAgeFrom());
        if (searchRequest.getAgeTo() != null) filters.put("ageTo", searchRequest.getAgeTo());
        if (searchRequest.getReligion() != null) filters.put("religion", searchRequest.getReligion());
        if (searchRequest.getCaste() != null) filters.put("caste", searchRequest.getCaste());
        if (searchRequest.getMaritalStatus() != null) filters.put("maritalStatus", searchRequest.getMaritalStatus());
        if (searchRequest.getLocation() != null) filters.put("location", searchRequest.getLocation());
        if (searchRequest.getEducation() != null) filters.put("education", searchRequest.getEducation());
        if (searchRequest.getOccupation() != null) filters.put("occupation", searchRequest.getOccupation());
        if (searchRequest.getFamilyStatus() != null) filters.put("familyStatus", searchRequest.getFamilyStatus());
        if (searchRequest.getFamilyType() != null) filters.put("familyType", searchRequest.getFamilyType());
        
        return filters;
    }

    // NEW: Method to match profile against SearchRequestDto
    private boolean matchesSearchRequest(Profile profile, SearchRequestDto searchRequest) {
        // Gender filter
        if (searchRequest.getGender() != null && !searchRequest.getGender().isEmpty()) {
            if (!profile.getGender().equalsIgnoreCase(searchRequest.getGender())) {
                return false;
            }
        }
        
        // Age range filter
        if (searchRequest.getAgeFrom() != null && profile.getAge() < searchRequest.getAgeFrom()) {
            return false;
        }
        if (searchRequest.getAgeTo() != null && profile.getAge() > searchRequest.getAgeTo()) {
            return false;
        }
        
        // Religion filter
        if (searchRequest.getReligion() != null && !searchRequest.getReligion().isEmpty()) {
            if (profile.getReligion() == null || !profile.getReligion().equalsIgnoreCase(searchRequest.getReligion())) {
                return false;
            }
        }
        
        // Caste filter
        if (searchRequest.getCaste() != null && !searchRequest.getCaste().isEmpty()) {
            if (profile.getCaste() == null || !profile.getCaste().equalsIgnoreCase(searchRequest.getCaste())) {
                return false;
            }
        }
        
        // Sub-caste filter (if profile has subCaste field)
        if (searchRequest.getSubCaste() != null && !searchRequest.getSubCaste().isEmpty()) {
            // Add subCaste field to Profile entity if needed
            // if (profile.getSubCaste() == null || !profile.getSubCaste().equalsIgnoreCase(searchRequest.getSubCaste())) {
            //     return false;
            // }
        }
        
        // Marital status filter
        if (searchRequest.getMaritalStatus() != null && !searchRequest.getMaritalStatus().isEmpty()) {
            if (profile.getMaritalStatus() == null || !profile.getMaritalStatus().equalsIgnoreCase(searchRequest.getMaritalStatus())) {
                return false;
            }
        }
        
        // Height filter (convert feet to cm in frontend)
        if (searchRequest.getHeightFrom() != null && profile.getHeight() != null) {
            if (profile.getHeight() < searchRequest.getHeightFrom()) {
                return false;
            }
        }
        if (searchRequest.getHeightTo() != null && profile.getHeight() != null) {
            if (profile.getHeight() > searchRequest.getHeightTo()) {
                return false;
            }
        }
        
        // Location filter (partial match)
        if (searchRequest.getLocation() != null && !searchRequest.getLocation().isEmpty()) {
            if (profile.getLocation() == null || 
                !profile.getLocation().toLowerCase().contains(searchRequest.getLocation().toLowerCase())) {
                return false;
            }
        }
        
        // Education filter
        if (searchRequest.getEducation() != null && !searchRequest.getEducation().isEmpty()) {
            if (profile.getEducation() == null || 
                !profile.getEducation().toLowerCase().contains(searchRequest.getEducation().toLowerCase())) {
                return false;
            }
        }
        
        // Occupation filter
        if (searchRequest.getOccupation() != null && !searchRequest.getOccupation().isEmpty()) {
            if (profile.getOccupation() == null || 
                !profile.getOccupation().toLowerCase().contains(searchRequest.getOccupation().toLowerCase())) {
                return false;
            }
        }
        
        // Family status filter
        if (searchRequest.getFamilyStatus() != null && !searchRequest.getFamilyStatus().isEmpty()) {
            if (profile.getFamilyStatus() == null || !profile.getFamilyStatus().equalsIgnoreCase(searchRequest.getFamilyStatus())) {
                return false;
            }
        }
        
        // Family type filter
        if (searchRequest.getFamilyType() != null && !searchRequest.getFamilyType().isEmpty()) {
            if (profile.getFamilyType() == null || !profile.getFamilyType().equalsIgnoreCase(searchRequest.getFamilyType())) {
                return false;
            }
        }
        
        return true;
    }

    public Map<String, Object> getAllProfiles(int page, int size, String sortBy, String sortDirection) {
        logger.info("Getting all profiles with pagination - page: {}, size: {}", page, size);
        Sort sort = sortDirection.equalsIgnoreCase("desc") 
            ? Sort.by(sortBy).descending() 
            : Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Profile> profilesPage = profileRepository.findAll(pageable);
        
        return Map.of(
            "profiles", profilesPage.getContent().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList()),
            "currentPage", profilesPage.getNumber(),
            "totalItems", profilesPage.getTotalElements(),
            "totalPages", profilesPage.getTotalPages(),
            "hasNext", profilesPage.hasNext(),
            "hasPrevious", profilesPage.hasPrevious()
        );
    }

    public List<String> getSearchSuggestions(String field, String query) {
        logger.debug("Getting search suggestions for field: {}, query: {}", field, query);
        List<Profile> profiles = profileRepository.findAll();
        
        return profiles.stream()
                .map(profile -> {
                    switch (field.toLowerCase()) {
                        case "location": return profile.getLocation();
                        case "religion": return profile.getReligion();
                        case "caste": return profile.getCaste();
                        case "education": return profile.getEducation();
                        case "occupation": return profile.getOccupation();
                        case "maritalstatus": return profile.getMaritalStatus();
                        default: return "";
                    }
                })
                .filter(value -> value != null && value.toLowerCase().contains(query.toLowerCase()))
                .distinct()
                .limit(10)
                .collect(Collectors.toList());
    }

    public Map<String, Object> getFilterOptions(String religion) {
        logger.debug("Getting filter options for religion: {}", religion);
        List<Profile> profiles = profileRepository.findAll();
        
        List<String> religions = profiles.stream()
                .map(Profile::getReligion)
                .filter(r -> r != null && !r.trim().isEmpty())
                .distinct()
                .collect(Collectors.toList());
                
        List<String> castes = profiles.stream()
                .filter(p -> religion == null || p.getReligion() == null || p.getReligion().equalsIgnoreCase(religion))
                .map(Profile::getCaste)
                .filter(c -> c != null && !c.trim().isEmpty())
                .distinct()
                .collect(Collectors.toList());
                
        // Additional filter options
        List<String> maritalStatuses = profiles.stream()
                .map(Profile::getMaritalStatus)
                .filter(ms -> ms != null && !ms.trim().isEmpty())
                .distinct()
                .collect(Collectors.toList());
                
        List<String> familyTypes = profiles.stream()
                .map(Profile::getFamilyType)
                .filter(ft -> ft != null && !ft.trim().isEmpty())
                .distinct()
                .collect(Collectors.toList());
                
        return Map.of(
            "religions", religions,
            "castes", castes,
            "maritalStatuses", maritalStatuses,
            "familyTypes", familyTypes
        );
    }

    private boolean matchesAllFilters(Profile profile, Map<String, Object> filters) {
        for (Map.Entry<String, Object> entry : filters.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();
            
            if (value == null || value.toString().trim().isEmpty()) continue;
            
            boolean matches = switch (key.toLowerCase()) {
                case "gender" -> profile.getGender().equalsIgnoreCase(value.toString());
                case "religion" -> profile.getReligion() != null && 
                                  profile.getReligion().equalsIgnoreCase(value.toString());
                case "caste" -> profile.getCaste() != null && 
                               profile.getCaste().equalsIgnoreCase(value.toString());
                case "location" -> profile.getLocation() != null && 
                                  profile.getLocation().toLowerCase().contains(value.toString().toLowerCase());
                case "education" -> profile.getEducation() != null && 
                                   profile.getEducation().toLowerCase().contains(value.toString().toLowerCase());
                case "occupation" -> profile.getOccupation() != null && 
                                    profile.getOccupation().toLowerCase().contains(value.toString().toLowerCase());
                case "maritalstatus" -> profile.getMaritalStatus() != null && 
                                       profile.getMaritalStatus().equalsIgnoreCase(value.toString());
                case "familystatus" -> profile.getFamilyStatus() != null && 
                                      profile.getFamilyStatus().equalsIgnoreCase(value.toString());
                case "familytype" -> profile.getFamilyType() != null && 
                                    profile.getFamilyType().equalsIgnoreCase(value.toString());
                case "agefrom" -> profile.getAge() >= Integer.parseInt(value.toString());
                case "ageto" -> profile.getAge() <= Integer.parseInt(value.toString());
                case "heightfrom" -> profile.getHeight() != null && profile.getHeight() >= Double.parseDouble(value.toString());
                case "heightto" -> profile.getHeight() != null && profile.getHeight() <= Double.parseDouble(value.toString());
                default -> true;
            };
            
            if (!matches) return false;
        }
        return true;
    }

    public void updateProfileImage(Long profileId, String imageUrl) {
    Profile profile = profileRepository.findById(profileId)
        .orElseThrow(() -> new RuntimeException("Profile not found with id: " + profileId));
    
    profile.setProfileImage(imageUrl);
    profileRepository.save(profile);
}

    public ProfileDto mapToDto(Profile profile) {
        ProfileDto dto = new ProfileDto(
                profile.getId(),
                profile.getFullName(),
                profile.getGender(),
                profile.getAge(),
                profile.getLocation(),
                profile.getReligion(),
                profile.getCaste(),
                profile.getUser().getId()
        );
        
        // Map additional fields
        dto.setMaritalStatus(profile.getMaritalStatus());
        dto.setHeight(profile.getHeight());
        dto.setEducation(profile.getEducation());
        dto.setOccupation(profile.getOccupation());
        dto.setFamilyStatus(profile.getFamilyStatus());
        dto.setFamilyType(profile.getFamilyType());
        dto.setAbout(profile.getAbout());
        
        return dto;
    }
}