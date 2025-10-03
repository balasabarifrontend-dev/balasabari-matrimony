package com.matrimony.controller;

import com.matrimony.dto.ServiceDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:5173")
public class ServiceController {

    @GetMapping
    public ResponseEntity<List<ServiceDto>> getServices() {
        List<ServiceDto> services = List.of(
                new ServiceDto(1L, "Profile Matching", "Get the best matches based on your preferences."),
                new ServiceDto(2L, "Secure Messaging", "Chat safely with verified members."),
                new ServiceDto(3L, "24/7 Support", "Our support team is here to help anytime.")
        );
        return ResponseEntity.ok(services);
    }
}
