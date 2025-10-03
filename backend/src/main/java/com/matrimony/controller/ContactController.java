package com.matrimony.controller;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

    public static class ContactDto {
        @NotBlank private String name;
        @Email @NotBlank private String email;
        @NotBlank private String message;

        // getters/setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> submitContact(@RequestBody ContactDto dto) {
        // Save to DB or send email (stub)
        return ResponseEntity.ok(Map.of("message", "Contact form submitted successfully!"));
    }
}
