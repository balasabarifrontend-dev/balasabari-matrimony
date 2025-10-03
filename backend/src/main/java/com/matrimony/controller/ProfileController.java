package com.matrimony.controller;

import com.matrimony.dto.ProfileDto;
import com.matrimony.model.User;
import com.matrimony.service.ProfileService;
import com.matrimony.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profiles")
@CrossOrigin(origins = "http://localhost:5173")
public class ProfileController {

    private final ProfileService profileService;
    private final UserService userService;

    public ProfileController(ProfileService profileService, UserService userService) {
        this.profileService = profileService;
        this.userService = userService;
    }

    // --- Create profile ---
    @PostMapping
    public ResponseEntity<ProfileDto> create(@RequestBody ProfileDto dto,
                                             @AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findByEmail(userDetails.getUsername()).orElseThrow();
        return ResponseEntity.ok(profileService.save(dto, user));
    }

    // --- Update profile ---
    @PutMapping("/{id}")
    public ResponseEntity<ProfileDto> update(@PathVariable Long id,
                                             @RequestBody ProfileDto dto,
                                             @AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findByEmail(userDetails.getUsername()).orElseThrow();
        return profileService.update(id, dto, user)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // --- Delete profile ---
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (profileService.delete(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // --- Get by ID ---
    @GetMapping("/{id}")
    public ResponseEntity<ProfileDto> getById(@PathVariable Long id) {
        return profileService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // --- Search profiles ---
    @GetMapping("/search")
    public ResponseEntity<List<ProfileDto>> search(
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) Integer minAge,
            @RequestParam(required = false) Integer maxAge,
            @RequestParam(required = false) String location
    ) {
        return ResponseEntity.ok(profileService.search(gender, minAge, maxAge, location));
    }
}
