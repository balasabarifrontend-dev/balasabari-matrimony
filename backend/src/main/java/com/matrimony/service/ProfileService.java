package com.matrimony.service;
import com.matrimony.model.Profile;
import com.matrimony.repository.ProfileRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProfileService {
  private final ProfileRepository repo;
  public ProfileService(ProfileRepository repo){ this.repo = repo; }
  public Profile save(Profile p){ return repo.save(p); }
  public List<Profile> findAll(){ return repo.findAll(); }
}
