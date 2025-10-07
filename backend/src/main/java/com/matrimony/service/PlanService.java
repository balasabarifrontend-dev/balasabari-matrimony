package com.matrimony.service;

import com.matrimony.dto.PlanDto;
import com.matrimony.model.Plan;
import com.matrimony.repository.PlanRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlanService {

    private static final Logger logger = LoggerFactory.getLogger(PlanService.class);
    
    private final PlanRepository planRepository;

    public PlanService(PlanRepository planRepository) {
        this.planRepository = planRepository;
    }

    public List<PlanDto> getAllActivePlans() {
        logger.info("Fetching all active plans");
        try {
            List<Plan> plans = planRepository.findByActiveTrueOrderByDisplayOrderAsc();
            if (plans.isEmpty()) {
                logger.info("No active plans found, returning default plans");
                return getDefaultPlans();
            }
            return plans.stream()
                    .map(this::mapToDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("Error fetching active plans, returning default plans", e);
            return getDefaultPlans();
        }
    }

    public List<PlanDto> getAllPlans() {
        logger.info("Fetching all plans");
        try {
            return planRepository.findAllByOrderByDisplayOrderAsc().stream()
                    .map(this::mapToDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("Error fetching all plans", e);
            throw new RuntimeException("Failed to fetch plans: " + e.getMessage());
        }
    }

    public PlanDto getPlanById(Long id) {
        logger.info("Fetching plan by ID: {}", id);
        try {
            Plan plan = planRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Plan not found with id: " + id));
            return mapToDto(plan);
        } catch (RuntimeException e) {
            logger.warn("Plan not found with ID: {}, returning default plan", id);
            throw e;
        } catch (Exception e) {
            logger.error("Error fetching plan by ID: {}", id, e);
            throw new RuntimeException("Failed to fetch plan: " + e.getMessage());
        }
    }

    public PlanDto createPlan(PlanDto planDto) {
        logger.info("Creating new plan: {}", planDto.getName());
        try {
            Plan plan = mapToEntity(planDto);
            plan.setCreatedAt(LocalDateTime.now());
            Plan saved = planRepository.save(plan);
            logger.info("Plan created successfully with ID: {}", saved.getId());
            return mapToDto(saved);
        } catch (Exception e) {
            logger.error("Error creating plan: {}", planDto.getName(), e);
            throw new RuntimeException("Failed to create plan: " + e.getMessage());
        }
    }

    public PlanDto updatePlan(Long id, PlanDto planDto) {
        logger.info("Updating plan with ID: {}", id);
        try {
            Plan existingPlan = planRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Plan not found with id: " + id));
            
            existingPlan.setName(planDto.getName());
            existingPlan.setDescription(planDto.getDescription());
            existingPlan.setPrice(planDto.getPrice());
            existingPlan.setDuration(planDto.getDuration());
            existingPlan.setFeatures(planDto.getFeatures());
            existingPlan.setDisplayOrder(planDto.getDisplayOrder());
            existingPlan.setUpdatedAt(LocalDateTime.now());
            
            Plan updated = planRepository.save(existingPlan);
            logger.info("Plan updated successfully: {}", id);
            return mapToDto(updated);
        } catch (Exception e) {
            logger.error("Error updating plan with ID: {}", id, e);
            throw new RuntimeException("Failed to update plan: " + e.getMessage());
        }
    }

    public PlanDto updatePlanStatus(Long id, Boolean active) {
        logger.info("Updating plan status for ID: {} to {}", id, active);
        try {
            Plan plan = planRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Plan not found with id: " + id));
            
            plan.setActive(active);
            plan.setUpdatedAt(LocalDateTime.now());
            
            Plan updated = planRepository.save(plan);
            logger.info("Plan status updated successfully: {}", id);
            return mapToDto(updated);
        } catch (Exception e) {
            logger.error("Error updating plan status for ID: {}", id, e);
            throw new RuntimeException("Failed to update plan status: " + e.getMessage());
        }
    }

    public void deletePlan(Long id) {
        logger.info("Deleting plan with ID: {}", id);
        try {
            if (!planRepository.existsById(id)) {
                throw new RuntimeException("Plan not found with id: " + id);
            }
            planRepository.deleteById(id);
            logger.info("Plan deleted successfully: {}", id);
        } catch (RuntimeException e) {
            logger.warn("Plan not found for deletion: {}", id);
            throw e;
        } catch (Exception e) {
            logger.error("Error deleting plan with ID: {}", id, e);
            throw new RuntimeException("Failed to delete plan: " + e.getMessage());
        }
    }

    // Default plans in case database is empty
    private List<PlanDto> getDefaultPlans() {
        return Arrays.asList(
            new PlanDto(1L, "Basic", "₹499 / month", 
                Arrays.asList("View Profiles", "Send Interests", "Limited Chats")),
            new PlanDto(2L, "Premium", "₹999 / month", 
                Arrays.asList("View Profiles", "Unlimited Chats", "Priority Support")),
            new PlanDto(3L, "Elite", "₹1999 / month", 
                Arrays.asList("View Profiles", "Unlimited Chats", "Priority Support", "Highlighted Profile"))
        );
    }

    private PlanDto mapToDto(Plan plan) {
        PlanDto dto = new PlanDto();
        dto.setId(plan.getId());
        dto.setName(plan.getName());
        dto.setDescription(plan.getDescription());
        dto.setPrice(plan.getPrice());
        dto.setDuration(plan.getDuration());
        dto.setCurrency(plan.getCurrency());
        dto.setFeatures(plan.getFeatures());
        dto.setActive(plan.isActive());
        dto.setDisplayOrder(plan.getDisplayOrder());
        dto.setCreatedAt(plan.getCreatedAt());
        dto.setUpdatedAt(plan.getUpdatedAt());
        return dto;
    }

    private Plan mapToEntity(PlanDto dto) {
        Plan plan = new Plan();
        plan.setName(dto.getName());
        plan.setDescription(dto.getDescription());
        plan.setPrice(dto.getPrice());
        plan.setDuration(dto.getDuration());
        plan.setCurrency(dto.getCurrency());
        plan.setFeatures(dto.getFeatures());
        plan.setActive(dto.isActive());
        plan.setDisplayOrder(dto.getDisplayOrder());
        return plan;
    }
}