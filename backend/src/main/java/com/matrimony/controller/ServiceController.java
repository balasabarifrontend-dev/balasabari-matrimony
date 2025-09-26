package com.matrimony.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:5173")
public class ServiceController {
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getServices() {
        List<Map<String, Object>> services = List.of(
            Map.of("id", 1, "title", "Profile Matching", "description", "Get the best matches based on your preferences."),
            Map.of("id", 2, "title", "Secure Messaging", "description", "Chat safely with verified members."),
            Map.of("id", 3, "title", "24/7 Support", "description", "Our support team is here to help anytime.")
        );
        return ResponseEntity.ok(services);
    }
}