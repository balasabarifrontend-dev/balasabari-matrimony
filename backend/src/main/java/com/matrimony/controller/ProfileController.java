package com.matrimony.controller;
import com.matrimony.model.Profile;
import com.matrimony.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/profiles")
@CrossOrigin(origins = "*")
public class ProfileController {
  private final ProfileService profileService;
  public ProfileController(ProfileService profileService){ this.profileService = profileService; }

  @PostMapping
  public ResponseEntity<Profile> create(@RequestBody Profile profile){ return ResponseEntity.ok(profileService.save(profile)); }

  @GetMapping
  public ResponseEntity<List<Profile>> all(){ return ResponseEntity.ok(profileService.findAll()); }
}
