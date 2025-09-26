package com.matrimony.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {
    @PostMapping
    public ResponseEntity<String> submitContact(@RequestBody Map<String, String> payload) {
        // Save to DB or send email (stub)
        return ResponseEntity.ok("Contact form submitted successfully!");
    }
}