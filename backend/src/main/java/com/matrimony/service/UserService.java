package com.matrimony.service;

import com.matrimony.dto.UserDto;
import com.matrimony.model.User;
import com.matrimony.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserDto register(UserDto userDto) {
    logger.info("=== USER SERVICE REGISTRATION ===");
    logger.info("Registering user: {}", userDto.getEmail());
    logger.info("DOB received in UserDto: {}", userDto.getDob());
    logger.info("Gender received in UserDto: {}", userDto.getGender());
    
    try {
        // Check if email already exists
        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new RuntimeException("Email already registered: " + userDto.getEmail());
        }

        // Check if mobile already exists
        if (userRepository.existsByMobile(userDto.getMobile())) {
            throw new RuntimeException("Mobile number already registered: " + userDto.getMobile());
        }

        // Create new user
        User user = new User();
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail().toLowerCase().trim());
        user.setMobile(userDto.getMobile().trim());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        
        // ✅ CRITICAL FIX: Set gender field (REQUIRED by database)
        if (userDto.getGender() != null && !userDto.getGender().trim().isEmpty()) {
            try {
                user.setGender(User.Gender.valueOf(userDto.getGender()));
                logger.info("Gender set successfully: {}", userDto.getGender());
            } catch (IllegalArgumentException e) {
                logger.warn("Invalid gender: {}, defaulting to Male", userDto.getGender());
                user.setGender(User.Gender.Male); // Default value
            }
        } else {
            logger.info("No gender provided, defaulting to Male");
            user.setGender(User.Gender.Male); // Default value
        }
        
        // Handle DOB
        if (userDto.getDob() != null) {
            user.setDob(userDto.getDob());
            logger.info("DOB set successfully: {}", userDto.getDob());
        } else {
            logger.info("No DOB provided, setting to null");
            user.setDob(null);
        }

        // Set default values
        user.setRole(User.Role.USER);
        user.setStatus(User.Status.ACTIVE);

        logger.info("Saving user with details - Name: {}, Email: {}, Gender: {}, DOB: {}", 
            user.getName(), user.getEmail(), user.getGender(), user.getDob());
        
        User savedUser = userRepository.save(user);
        logger.info("User saved successfully with ID: {}", savedUser.getId());

        return mapToDto(savedUser);
        
    } catch (Exception e) {
        logger.error("=== REGISTRATION FAILED ===", e);
        throw new RuntimeException("Registration failed: " + e.getMessage());
    }
}

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean checkPassword(User user, String rawPassword) {
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }

    // ADMIN METHODS

    public Page<UserDto> findAllUsers(Pageable pageable) {
        Page<User> users = userRepository.findAll(pageable);
        return users.map(this::mapToDto);
    }

    public UserDto findUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return mapToDto(user);
    }

    public UserDto updateUserStatus(Long id, User.Status status) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setStatus(status);
        return mapToDto(userRepository.save(user));
    }

    public UserDto updateUserRole(Long id, User.Role role) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setRole(role);
        return mapToDto(userRepository.save(user));
    }

    public List<UserDto> searchUsers(String email, String mobile, String status, String role) {
        List<User> users = userRepository.findAll();
        
        return users.stream()
                .filter(user -> 
                    (email == null || user.getEmail().toLowerCase().contains(email.toLowerCase())) &&
                    (mobile == null || user.getMobile().contains(mobile)) &&
                    (status == null || user.getStatus().name().equalsIgnoreCase(status)) &&
                    (role == null || user.getRole().name().equalsIgnoreCase(role))
                )
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public Map<String, Object> getUserStatistics() {
        long totalUsers = userRepository.count();
        long activeUsers = userRepository.findAll().stream()
                .filter(user -> user.getStatus() == User.Status.ACTIVE)
                .count();
        long inactiveUsers = totalUsers - activeUsers;
        long adminUsers = userRepository.findAll().stream()
                .filter(user -> user.getRole() == User.Role.ADMIN)
                .count();
        
        return Map.of(
            "totalUsers", totalUsers,
            "activeUsers", activeUsers,
            "inactiveUsers", inactiveUsers,
            "adminUsers", adminUsers,
            "regularUsers", totalUsers - adminUsers
        );
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setStatus(User.Status.INACTIVE); // Soft delete
        userRepository.save(user);
    }

    public UserDto restoreUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setStatus(User.Status.ACTIVE);
        return mapToDto(userRepository.save(user));
    }

    public UserDto mapToDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setMobile(user.getMobile());
        dto.setRole(user.getRole());
        dto.setStatus(user.getStatus());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setDob(user.getDob()); // ✅ FIX: Include DOB in DTO response
        return dto;
    }

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
        
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities("ROLE_" + user.getRole().name())
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(user.getStatus() != User.Status.ACTIVE)
                .build();
    }
}