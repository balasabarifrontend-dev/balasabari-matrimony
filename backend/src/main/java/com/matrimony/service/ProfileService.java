package com.matrimony.service;

import com.matrimony.dto.ProfileDto;
import com.matrimony.model.Profile;
import com.matrimony.model.User;
import com.matrimony.repository.ProfileRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;

    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    public ProfileDto save(ProfileDto dto, User user) {
        Profile profile = new Profile();
        profile.setUser(user);
        profile.setFullName(dto.getFullName());
        profile.setGender(dto.getGender());
        profile.setAge(dto.getAge());
        profile.setLocation(dto.getLocation());
        profile.setReligion(dto.getReligion());
        profile.setCaste(dto.getCaste());

        Profile saved = profileRepository.save(profile);
        return mapToDto(saved);
    }

    public Optional<ProfileDto> update(Long id, ProfileDto dto, User user) {
        return profileRepository.findById(id).map(profile -> {
            if (!profile.getUser().getId().equals(user.getId())) return null;
            profile.setFullName(dto.getFullName());
            profile.setGender(dto.getGender());
            profile.setAge(dto.getAge());
            profile.setLocation(dto.getLocation());
            profile.setReligion(dto.getReligion());
            profile.setCaste(dto.getCaste());
            return mapToDto(profileRepository.save(profile));
        });
    }

    public boolean delete(Long id) {
        if (profileRepository.existsById(id)) {
            profileRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<ProfileDto> findById(Long id) {
        return profileRepository.findById(id).map(this::mapToDto);
    }

    public List<ProfileDto> search(String gender, Integer minAge, Integer maxAge, String location) {
        return profileRepository.findAll().stream()
                .filter(p -> (gender == null || p.getGender().equalsIgnoreCase(gender)) &&
                             (minAge == null || p.getAge() >= minAge) &&
                             (maxAge == null || p.getAge() <= maxAge) &&
                             (location == null || (p.getLocation() != null && p.getLocation().equalsIgnoreCase(location))))
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public ProfileDto mapToDto(Profile profile) {
        return new ProfileDto(
                profile.getId(),
                profile.getFullName(),
                profile.getGender(),
                profile.getAge(),
                profile.getLocation(),
                profile.getReligion(),
                profile.getCaste(),
                profile.getUser().getId()
        );
    }
}
