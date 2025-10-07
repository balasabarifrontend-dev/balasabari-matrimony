package com.matrimony.controller;

import com.matrimony.dto.ServiceDto;
import com.matrimony.service.ServiceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:5173")
public class ServiceController {

    private static final Logger logger = LoggerFactory.getLogger(ServiceController.class);
    
    private final ServiceService serviceService;

    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }

    // Get all active services
    @GetMapping
    public ResponseEntity<?> getAllServices() {
        logger.info("Fetching all active services");
        try {
            List<ServiceDto> services = serviceService.getAllActiveServices();
            return ResponseEntity.ok(services);
        } catch (Exception e) {
            logger.error("Error fetching services", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to fetch services"));
        }
    }

    // Get service by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getServiceById(@PathVariable Long id) {
        logger.info("Fetching service with ID: {}", id);
        try {
            ServiceDto service = serviceService.getServiceById(id);
            return ResponseEntity.ok(service);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.error("Error fetching service: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to fetch service"));
        }
    }

    // Get services by category
    @GetMapping("/category/{category}")
    public ResponseEntity<?> getServicesByCategory(@PathVariable String category) {
        logger.info("Fetching services for category: {}", category);
        try {
            List<ServiceDto> services = serviceService.getServicesByCategory(category);
            return ResponseEntity.ok(services);
        } catch (Exception e) {
            logger.error("Error fetching services for category: {}", category, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to fetch services"));
        }
    }

    // Get all service categories
    @GetMapping("/categories")
    public ResponseEntity<?> getAllCategories() {
        logger.info("Fetching all service categories");
        try {
            List<String> categories = serviceService.getAllCategories();
            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            logger.error("Error fetching categories", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to fetch categories"));
        }
    }

    // Admin endpoints
    @PostMapping("/admin")
    public ResponseEntity<?> createService(@Valid @RequestBody ServiceDto serviceDto) {
        logger.info("Creating new service: {}", serviceDto.getName());
        try {
            ServiceDto createdService = serviceService.createService(serviceDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdService);
        } catch (Exception e) {
            logger.error("Error creating service", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Failed to create service: " + e.getMessage()));
        }
    }

    @PutMapping("/admin/{id}")
    public ResponseEntity<?> updateService(@PathVariable Long id, @Valid @RequestBody ServiceDto serviceDto) {
        logger.info("Updating service with ID: {}", id);
        try {
            ServiceDto updatedService = serviceService.updateService(id, serviceDto);
            return ResponseEntity.ok(updatedService);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.error("Error updating service: {}", id, e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Failed to update service"));
        }
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<?> deleteService(@PathVariable Long id) {
        logger.info("Deleting service with ID: {}", id);
        try {
            serviceService.deleteService(id);
            return ResponseEntity.ok(Map.of("message", "Service deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.error("Error deleting service: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to delete service"));
        }
    }

    @PatchMapping("/admin/{id}/status")
    public ResponseEntity<?> updateServiceStatus(@PathVariable Long id, @RequestBody Map<String, Boolean> status) {
        logger.info("Updating service status for ID: {}", id);
        try {
            Boolean isActive = status.get("active");
            ServiceDto updatedService = serviceService.updateServiceStatus(id, isActive);
            return ResponseEntity.ok(updatedService);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.error("Error updating service status: {}", id, e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Failed to update service status"));
        }
    }

    // Get all services (including inactive) for admin
    @GetMapping("/admin/all")
    public ResponseEntity<?> getAllServicesAdmin() {
        logger.info("Fetching all services (admin)");
        try {
            List<ServiceDto> services = serviceService.getAllServices();
            return ResponseEntity.ok(services);
        } catch (Exception e) {
            logger.error("Error fetching all services", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to fetch services"));
        }
    }

    @GetMapping("/featured")
public ResponseEntity<?> getFeaturedServices() {
    logger.info("Fetching featured services");
    try {
        List<ServiceDto> featuredServices = serviceService.getFeaturedServices();
        return ResponseEntity.ok(featuredServices);
    } catch (Exception e) {
        logger.error("Error fetching featured services", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Failed to fetch featured services"));
    }
}
}