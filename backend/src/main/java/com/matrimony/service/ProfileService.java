package com.matrimony.service;
import com.matrimony.model.Profile;
import com.matrimony.repository.ProfileRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProfileService {
  private final ProfileRepository repo;
  public ProfileService(ProfileRepository repo){ this.repo = repo; }

  public Profile save(Profile p){ return repo.save(p); }
  public List<Profile> findAll(){ return repo.findAll(); }

  public Optional<Profile> findById(Long id) {
    return repo.findById(id);
  }

  public Optional<Profile> update(Long id, Profile updatedProfile) {
    return repo.findById(id).map(profile -> {
      profile.setFullName(updatedProfile.getFullName());
      profile.setGender(updatedProfile.getGender());
      profile.setAge(updatedProfile.getAge());
      profile.setLocation(updatedProfile.getLocation());
      profile.setReligion(updatedProfile.getReligion());
      profile.setCaste(updatedProfile.getCaste());
      // Add other fields as needed
      return repo.save(profile);
    });
  }

  public boolean delete(Long id) {
    if (repo.existsById(id)) {
      repo.deleteById(id);
      return true;
    }
    return false;
  }

  public List<Profile> search(String gender, Integer minAge, Integer maxAge, String location) {
    return repo.findAll().stream()
      .filter(p -> gender == null || p.getGender().equalsIgnoreCase(gender))
      .filter(p -> minAge == null || p.getAge() >= minAge)
      .filter(p -> maxAge == null || p.getAge() <= maxAge)
      .filter(p -> location == null || p.getLocation().equalsIgnoreCase(location))
      .collect(Collectors.toList());
  }
}