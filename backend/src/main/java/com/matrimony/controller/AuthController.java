package com.matrimony.controller;

import com.matrimony.dto.UserDto;
import com.matrimony.model.User;
import com.matrimony.security.JwtUtil;
import com.matrimony.service.UserService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    // --- Register ---
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserDto userDto) {
        logger.info("=== REGISTRATION REQUEST RECEIVED ===");
        logger.info("UserDto received - Email: {}, Mobile: {}, Name: {}", 
            userDto.getEmail(), userDto.getMobile(), userDto.getName());
        
        try {
            // Validate required fields explicitly
            if (userDto.getEmail() == null || userDto.getEmail().trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "Email is required"));
            }
            if (userDto.getMobile() == null || userDto.getMobile().trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "Mobile number is required"));
            }
            if (userDto.getPassword() == null || userDto.getPassword().trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "Password is required"));
            }

            UserDto savedUser = userService.register(userDto);
            logger.info("=== REGISTRATION SUCCESSFUL ===");
            logger.info("User registered successfully with ID: {}", savedUser.getId());
            
            // Generate token for auto-login after registration
            String token = jwtUtil.generateToken(savedUser.getEmail());
            
            Map<String, Object> response = new HashMap<>();
            response.put("user", savedUser);
            response.put("token", token);
            response.put("message", "Registration successful");
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            
        } catch (Exception e) {
            logger.error("=== REGISTRATION ERROR ===", e);
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Registration failed");
            errorResponse.put("message", e.getMessage());
            
            // Use more appropriate status codes based on error type
            HttpStatus status = determineHttpStatus(e);
            return ResponseEntity.status(status).body(errorResponse);
        }
    }

    // --- Login ---
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        logger.info("=== LOGIN ATTEMPT ===");
        logger.info("Login attempt for email: {}", loginRequest.getEmail());
        
        try {
            Optional<User> userOpt = userService.findByEmail(loginRequest.getEmail());
            
            if (userOpt.isPresent() && userService.checkPassword(userOpt.get(), loginRequest.getPassword())) {
                User user = userOpt.get();
                
                // Check if user is active
                if (user.getStatus() == User.Status.INACTIVE) {
                    logger.warn("Login attempt for inactive user: {}", loginRequest.getEmail());
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                            .body(Map.of(
                                "error", "Account deactivated", 
                                "message", "Your account is deactivated. Please contact support."
                            ));
                }
                
                String token = jwtUtil.generateToken(loginRequest.getEmail());
                UserDto userDto = userService.mapToDto(user);
                
                logger.info("=== LOGIN SUCCESSFUL ===");
                logger.info("User logged in successfully: {}", loginRequest.getEmail());
                
                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
                response.put("user", userDto);
                response.put("message", "Login successful");
                
                return ResponseEntity.ok(response);
            }
            
            logger.warn("=== LOGIN FAILED ===");
            logger.warn("Invalid credentials for email: {}", loginRequest.getEmail());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of(
                        "error", "Invalid credentials",
                        "message", "Invalid email or password"
                    ));
                    
        } catch (Exception e) {
            logger.error("=== LOGIN ERROR ===", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                        "error", "Login failed",
                        "message", "An error occurred during login. Please try again."
                    ));
        }
    }

    // --- Validate Token ---
    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        logger.info("=== TOKEN VALIDATION REQUEST ===");
        
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of(
                        "valid", false, 
                        "error", "Invalid authorization header",
                        "message", "Missing or invalid authorization token"
                    ));
        }
        
        String token = authHeader.substring(7);
        try {
            if (jwtUtil.validateToken(token)) {
                String email = jwtUtil.extractUsername(token);
                Optional<User> userOpt = userService.findByEmail(email);
                
                if (userOpt.isPresent()) {
                    User user = userOpt.get();
                    // Check if user is still active
                    if (user.getStatus() == User.Status.INACTIVE) {
                        return ResponseEntity.ok(Map.of(
                            "valid", false,
                            "error", "Account deactivated",
                            "message", "Your account has been deactivated"
                        ));
                    }
                    
                    UserDto userDto = userService.mapToDto(user);
                    return ResponseEntity.ok(Map.of(
                        "valid", true, 
                        "user", userDto,
                        "message", "Token is valid"
                    ));
                }
            }
            return ResponseEntity.ok(Map.of(
                "valid", false,
                "error", "Invalid token",
                "message", "Token validation failed"
            ));
        } catch (Exception e) {
            logger.error("Token validation error", e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of(
                        "valid", false, 
                        "error", "Token validation failed",
                        "message", "An error occurred during token validation"
                    ));
        }
    }

    // --- Logout (optional - client-side token removal) ---
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // Since JWT is stateless, logout is handled client-side by removing the token
        // You could implement a token blacklist here if needed
        return ResponseEntity.ok(Map.of("message", "Logout successful"));
    }

    // --- Forgot Password Endpoint (placeholder) ---
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        logger.info("Forgot password request for email: {}", email);
        
        // Implement password reset logic here
        return ResponseEntity.ok(Map.of(
            "message", "If an account with that email exists, a reset link has been sent"
        ));
    }

    // Helper method to determine appropriate HTTP status based on exception
    private HttpStatus determineHttpStatus(Exception e) {
        String message = e.getMessage().toLowerCase();
        
        if (message.contains("already exists") || message.contains("duplicate")) {
            return HttpStatus.CONFLICT; // 409 for duplicate resources
        } else if (message.contains("not found")) {
            return HttpStatus.NOT_FOUND; // 404
        } else if (message.contains("validation") || message.contains("invalid")) {
            return HttpStatus.BAD_REQUEST; // 400
        } else if (message.contains("unauthorized") || message.contains("forbidden")) {
            return HttpStatus.FORBIDDEN; // 403
        } else {
            return HttpStatus.INTERNAL_SERVER_ERROR; // 500 for other errors
        }
    }

    // Login Request DTO for better validation
    public static class LoginRequest {
        @jakarta.validation.constraints.NotBlank(message = "Email is required")
        @jakarta.validation.constraints.Email(message = "Invalid email format")
        private String email;

        @jakarta.validation.constraints.NotBlank(message = "Password is required")
        @jakarta.validation.constraints.Size(min = 6, message = "Password must be at least 6 characters")
        private String password;

        // Getters and Setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}