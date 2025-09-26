package com.matrimony.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {
    @GetMapping("/users")
    public ResponseEntity<String> getAllUsers() {
        // Implement user listing for admin
        return ResponseEntity.ok("Admin user list (stub)");
    }
}