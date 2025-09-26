package com.matrimony.controller;
import com.matrimony.model.Profile;
import com.matrimony.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/profiles")
@CrossOrigin(origins = "http://localhost:5173")
public class ProfileController {
  private final ProfileService profileService;
  public ProfileController(ProfileService profileService){ this.profileService = profileService; }

  @PostMapping
  public ResponseEntity<Profile> create(@RequestBody Profile profile){ return ResponseEntity.ok(profileService.save(profile)); }

  // ...existing code...

  @GetMapping("/{id}")
  public ResponseEntity<Profile> getById(@PathVariable Long id) {
    return profileService.findById(id)
      .map(ResponseEntity::ok)
      .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping("/{id}")
  public ResponseEntity<Profile> update(@PathVariable Long id, @RequestBody Profile updatedProfile) {
    return profileService.update(id, updatedProfile)
      .map(ResponseEntity::ok)
      .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    if (profileService.delete(id)) {
      return ResponseEntity.noContent().build();
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @GetMapping("/search")
  public ResponseEntity<List<Profile>> search(
      @RequestParam(required = false) String gender,
      @RequestParam(required = false) Integer minAge,
      @RequestParam(required = false) Integer maxAge,
      @RequestParam(required = false) String location) {
    return ResponseEntity.ok(profileService.search(gender, minAge, maxAge, location));
  }
}
