package com.matrimony.controller;

import com.matrimony.dto.PlanDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plans")
@CrossOrigin(origins = "http://localhost:5173")
public class PlanController {

    @GetMapping
    public ResponseEntity<List<PlanDto>> getPlans() {
        List<PlanDto> plans = List.of(
                new PlanDto(1L, "Basic", "₹499 / month", List.of("View Profiles", "Send Interests", "Limited Chats")),
                new PlanDto(2L, "Premium", "₹999 / month", List.of("View Profiles", "Unlimited Chats", "Priority Support")),
                new PlanDto(3L, "Elite", "₹1999 / month", List.of("View Profiles", "Unlimited Chats", "Priority Support", "Highlighted Profile"))
        );
        return ResponseEntity.ok(plans);
    }
}
