package com.matrimony.controller;

import com.matrimony.dto.UserDto;
import com.matrimony.model.User;
import com.matrimony.security.JwtUtil;
import com.matrimony.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    // --- Register ---
    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@Valid @RequestBody UserDto userDto) {
        UserDto saved = userService.register(userDto);
        return ResponseEntity.ok(saved);
    }

    // --- Login ---
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");

        Optional<User> userOpt = userService.findByEmail(email);
        if (userOpt.isPresent() && userService.checkPassword(userOpt.get(), password)) {
            String token = jwtUtil.generateToken(email);
            UserDto dto = userService.mapToDto(userOpt.get());
            return ResponseEntity.ok(Map.of("token", token, "user", dto));
        }
        return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
    }
}
