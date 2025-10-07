package com.matrimony.controller;

import com.matrimony.dto.ProfileDto;
import com.matrimony.dto.SearchRequestDto;
import com.matrimony.service.ProfileService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/search")
@CrossOrigin(origins = "http://localhost:5173")
public class SearchController {

    private static final Logger logger = LoggerFactory.getLogger(SearchController.class);
    
    private final ProfileService profileService;

    public SearchController(ProfileService profileService) {
        this.profileService = profileService;
    }

    /**
     * Advanced search with comprehensive filters
     * Supports all filter criteria from your frontend
     */
    @PostMapping("/profiles")
    public ResponseEntity<?> searchProfiles(@Valid @RequestBody SearchRequestDto searchRequest) {
        logger.info("=== ADVANCED SEARCH REQUEST ===");
        logger.info("Search filters: {}", searchRequest);
        
        try {
            List<ProfileDto> profiles = profileService.advancedSearch(searchRequest);
            
            logger.info("Search completed. Found {} profiles", profiles.size());
            
            Map<String, Object> response = Map.of(
                "profiles", profiles,
                "totalCount", profiles.size(),
                "filtersApplied", searchRequest
            );
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("=== SEARCH ERROR ===", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                        "error", "Search failed",
                        "message", e.getMessage()
                    ));
        }
    }

    /**
     * Quick search with basic parameters
     */
    @GetMapping("/quick")
    public ResponseEntity<?> quickSearch(
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) Integer minAge,
            @RequestParam(required = false) Integer maxAge,
            @RequestParam(required = false) String religion,
            @RequestParam(required = false) String location) {
        
        logger.info("Quick search - Gender: {}, Age: {}-{}, Religion: {}, Location: {}", 
                   gender, minAge, maxAge, religion, location);
        
        try {
            SearchRequestDto searchRequest = new SearchRequestDto();
            searchRequest.setGender(gender);
            searchRequest.setAgeFrom(minAge);
            searchRequest.setAgeTo(maxAge);
            searchRequest.setReligion(religion);
            searchRequest.setLocation(location);
            
            List<ProfileDto> profiles = profileService.advancedSearch(searchRequest);
            
            return ResponseEntity.ok(Map.of(
                "profiles", profiles,
                "totalCount", profiles.size()
            ));
            
        } catch (Exception e) {
            logger.error("Quick search error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Quick search failed"));
        }
    }

    /**
     * Get search suggestions for autocomplete
     */
    @GetMapping("/suggestions")
    public ResponseEntity<?> getSuggestions(
            @RequestParam String field,
            @RequestParam String query) {
        
        logger.info("Getting suggestions for field: {}, query: {}", field, query);
        
        try {
            List<String> suggestions = profileService.getSearchSuggestions(field, query);
            return ResponseEntity.ok(Map.of(
                "field", field,
                "query", query,
                "suggestions", suggestions
            ));
        } catch (Exception e) {
            logger.error("Error getting suggestions", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to get suggestions"));
        }
    }

    /**
     * Get filter options based on selected religion
     * Used to populate caste categories and castes dynamically
     */
    @GetMapping("/filter-options")
    public ResponseEntity<?> getFilterOptions(@RequestParam(required = false) String religion) {
        logger.info("Getting filter options for religion: {}", religion);
        
        try {
            Map<String, Object> filterOptions = profileService.getFilterOptions(religion);
            return ResponseEntity.ok(filterOptions);
        } catch (Exception e) {
            logger.error("Error getting filter options", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to get filter options"));
        }
    }
}