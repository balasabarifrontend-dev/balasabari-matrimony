package com.matrimony.controller;

import com.matrimony.dto.PlanDto;
import com.matrimony.service.PlanService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/plans")
@CrossOrigin(origins = "http://localhost:5173")
public class PlanController {

    private static final Logger logger = LoggerFactory.getLogger(PlanController.class);
    
    private final PlanService planService;

    public PlanController(PlanService planService) {
        this.planService = planService;
    }

    // Get all active plans for public viewing
    @GetMapping
    public ResponseEntity<?> getActivePlans() {
        logger.info("Fetching all active plans");
        try {
            List<PlanDto> plans = planService.getAllActivePlans();
            return ResponseEntity.ok(plans);
        } catch (Exception e) {
            logger.error("Error fetching plans", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to fetch plans"));
        }
    }

    // Get plan by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getPlanById(@PathVariable Long id) {
        logger.info("Fetching plan with ID: {}", id);
        try {
            PlanDto plan = planService.getPlanById(id);
            return ResponseEntity.ok(plan);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.error("Error fetching plan: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to fetch plan"));
        }
    }

    // Admin endpoints
    @PostMapping("/admin")
    public ResponseEntity<?> createPlan(@Valid @RequestBody PlanDto planDto) {
        logger.info("Creating new plan: {}", planDto.getName());
        try {
            PlanDto createdPlan = planService.createPlan(planDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPlan);
        } catch (Exception e) {
            logger.error("Error creating plan", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Failed to create plan: " + e.getMessage()));
        }
    }

    @PutMapping("/admin/{id}")
    public ResponseEntity<?> updatePlan(@PathVariable Long id, @Valid @RequestBody PlanDto planDto) {
        logger.info("Updating plan with ID: {}", id);
        try {
            PlanDto updatedPlan = planService.updatePlan(id, planDto);
            return ResponseEntity.ok(updatedPlan);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.error("Error updating plan: {}", id, e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Failed to update plan"));
        }
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<?> deletePlan(@PathVariable Long id) {
        logger.info("Deleting plan with ID: {}", id);
        try {
            planService.deletePlan(id);
            return ResponseEntity.ok(Map.of("message", "Plan deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.error("Error deleting plan: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to delete plan"));
        }
    }

    @PatchMapping("/admin/{id}/status")
    public ResponseEntity<?> updatePlanStatus(@PathVariable Long id, @RequestBody Map<String, Boolean> status) {
        logger.info("Updating plan status for ID: {}", id);
        try {
            Boolean isActive = status.get("active");
            PlanDto updatedPlan = planService.updatePlanStatus(id, isActive);
            return ResponseEntity.ok(updatedPlan);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.error("Error updating plan status: {}", id, e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Failed to update plan status"));
        }
    }

    // Get all plans (including inactive) for admin
    @GetMapping("/admin/all")
    public ResponseEntity<?> getAllPlans() {
        logger.info("Fetching all plans (admin)");
        try {
            List<PlanDto> plans = planService.getAllPlans();
            return ResponseEntity.ok(plans);
        } catch (Exception e) {
            logger.error("Error fetching all plans", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to fetch plans"));
        }
    }
}