// src\main\java\com\matrimony\controller\PlanController.java
package com.matrimony.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/plans")
@CrossOrigin(origins = "http://localhost:5173")
public class PlanController {
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getPlans() {
        List<Map<String, Object>> plans = List.of(
            Map.of("id", 1, "name", "Basic", "price", "₹499 / month", "features", List.of("View Profiles", "Send Interests", "Limited Chats")),
            Map.of("id", 2, "name", "Premium", "price", "₹999 / month", "features", List.of("View Profiles", "Unlimited Chats", "Priority Support")),
            Map.of("id", 3, "name", "Elite", "price", "₹1999 / month", "features", List.of("View Profiles", "Unlimited Chats", "Priority Support", "Highlighted Profile"))
        );
        return ResponseEntity.ok(plans);
    }
}