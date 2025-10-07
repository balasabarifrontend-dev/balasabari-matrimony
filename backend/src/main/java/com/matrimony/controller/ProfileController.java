package com.matrimony.controller;

import com.matrimony.dto.ProfileDto;
import com.matrimony.model.User;
import com.matrimony.service.ProfileService;
import com.matrimony.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/profiles")
@CrossOrigin(origins = "http://localhost:5173")
public class ProfileController {

    private static final Logger logger = LoggerFactory.getLogger(ProfileController.class);
    
    private final ProfileService profileService;
    private final UserService userService;

    public ProfileController(ProfileService profileService, UserService userService) {
        this.profileService = profileService;
        this.userService = userService;
    }

    // --- Get all profiles (with pagination) ---
    @GetMapping
    public ResponseEntity<?> getAllProfiles(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDirection) {
        
        logger.info("Fetching all profiles - page: {}, size: {}", page, size);
        try {
            Map<String, Object> response = profileService.getAllProfiles(page, size, sortBy, sortDirection);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error fetching profiles", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to fetch profiles"));
        }
    }

    // --- Create profile ---
    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody ProfileDto dto,
                                    @AuthenticationPrincipal UserDetails userDetails) {
        logger.info("Creating profile for user: {}", userDetails.getUsername());
        try {
            User user = userService.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            // Check if user already has a profile
            if (profileService.userHasProfile(user.getId())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(Map.of("error", "User already has a profile"));
            }
            
            ProfileDto savedProfile = profileService.save(dto, user);
            logger.info("Profile created successfully with ID: {}", savedProfile.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(savedProfile);
            
        } catch (RuntimeException e) {
            logger.error("Error creating profile: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.error("Unexpected error creating profile", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to create profile"));
        }
    }

    // --- Update profile ---
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id,
                                    @Valid @RequestBody ProfileDto dto,
                                    @AuthenticationPrincipal UserDetails userDetails) {
        logger.info("Updating profile ID: {} for user: {}", id, userDetails.getUsername());
        try {
            User user = userService.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            // Verify the profile belongs to the user (unless admin)
            if (!profileService.isProfileOwner(id, user.getId()) && !isAdmin(user)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "Not authorized to update this profile"));
            }
            
            return profileService.update(id, dto, user)
                    .map(updatedProfile -> {
                        logger.info("Profile updated successfully: {}", id);
                        return ResponseEntity.ok(updatedProfile);
                    })
                    .orElse(ResponseEntity.notFound().build());
                    
        } catch (RuntimeException e) {
            logger.error("Error updating profile: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.error("Unexpected error updating profile", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to update profile"));
        }
    }

    // --- Delete profile ---
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id,
                                    @AuthenticationPrincipal UserDetails userDetails) {
        logger.info("Deleting profile ID: {} by user: {}", id, userDetails.getUsername());
        try {
            User user = userService.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            // Verify the profile belongs to the user (unless admin)
            if (!profileService.isProfileOwner(id, user.getId()) && !isAdmin(user)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "Not authorized to delete this profile"));
            }
            
            if (profileService.delete(id)) {
                logger.info("Profile deleted successfully: {}", id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            logger.error("Error deleting profile: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to delete profile"));
        }
    }

    // --- Get by ID ---
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        logger.info("Fetching profile by ID: {}", id);
        try {
            return profileService.findById(id)
                    .map(profile -> {
                        logger.info("Profile found: {}", id);
                        return ResponseEntity.ok(profile);
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            logger.error("Error fetching profile: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to fetch profile"));
        }
    }

    // --- Get current user's profile ---
    @GetMapping("/my-profile")
    public ResponseEntity<?> getMyProfile(@AuthenticationPrincipal UserDetails userDetails) {
        logger.info("Fetching profile for current user: {}", userDetails.getUsername());
        try {
            User user = userService.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            return profileService.findByUserId(user.getId())
                    .map(profile -> {
                        logger.info("User profile found");
                        return ResponseEntity.ok(profile);
                    })
                    .orElse(ResponseEntity.notFound().build());
                    
        } catch (Exception e) {
            logger.error("Error fetching user profile", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to fetch profile"));
        }
    }

    // --- Advanced Search profiles ---
    @PostMapping("/search")
    public ResponseEntity<?> search(@RequestBody Map<String, Object> searchFilters) {
        logger.info("Advanced profile search with filters: {}", searchFilters);
        try {
            List<ProfileDto> profiles = profileService.advancedSearch(searchFilters);
            Map<String, Object> response = Map.of(
                "profiles", profiles,
                "totalCount", profiles.size(),
                "filtersApplied", searchFilters
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error in profile search", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Invalid search criteria: " + e.getMessage()));
        }
    }

    // --- Get profiles by user ID (admin only) ---
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getByUserId(@PathVariable Long userId) {
        logger.info("Fetching profile by user ID: {}", userId);
        try {
            return profileService.findByUserId(userId)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            logger.error("Error fetching profile for user: {}", userId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to fetch profile"));
        }
    }

    // Helper method to check if user is admin
    private boolean isAdmin(User user) {
        return user.getRole() == User.Role.ADMIN;
    }
}