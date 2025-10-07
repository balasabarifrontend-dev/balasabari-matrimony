package com.matrimony.service;

import com.matrimony.dto.ServiceDto;
import com.matrimony.model.MatrimonyService;  // Updated import
import com.matrimony.repository.ServiceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceService {

    private static final Logger logger = LoggerFactory.getLogger(ServiceService.class);
    
    private final ServiceRepository serviceRepository;

    public ServiceService(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public List<ServiceDto> getAllActiveServices() {
        logger.info("Fetching all active services");
        try {
            List<MatrimonyService> services = serviceRepository.findByActiveTrueOrderByDisplayOrderAsc();  // Updated type
            if (services.isEmpty()) {
                logger.info("No active services found, returning default services");
                return getDefaultServices();
            }
            return services.stream()
                    .map(this::mapToDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("Error fetching active services, returning default services", e);
            return getDefaultServices();
        }
    }

    public List<ServiceDto> getAllServices() {
        logger.info("Fetching all services");
        try {
            return serviceRepository.findAllByOrderByDisplayOrderAsc().stream()
                    .map(this::mapToDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("Error fetching all services", e);
            throw new RuntimeException("Failed to fetch services: " + e.getMessage());
        }
    }

    public ServiceDto getServiceById(Long id) {
        logger.info("Fetching service by ID: {}", id);
        try {
            MatrimonyService service = serviceRepository.findById(id)  // Updated type
                    .orElseThrow(() -> new RuntimeException("Service not found with id: " + id));
            return mapToDto(service);
        } catch (RuntimeException e) {
            logger.warn("Service not found with ID: {}", id);
            throw e;
        } catch (Exception e) {
            logger.error("Error fetching service by ID: {}", id, e);
            throw new RuntimeException("Failed to fetch service: " + e.getMessage());
        }
    }

    public List<ServiceDto> getServicesByCategory(String category) {
        logger.info("Fetching services by category: {}", category);
        try {
            return serviceRepository.findByCategoryAndActiveTrueOrderByDisplayOrderAsc(category).stream()
                    .map(this::mapToDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("Error fetching services for category: {}", category, e);
            throw new RuntimeException("Failed to fetch services for category: " + e.getMessage());
        }
    }

    public List<String> getAllCategories() {
        logger.info("Fetching all service categories");
        try {
            List<String> categories = serviceRepository.findDistinctCategories();
            if (categories.isEmpty()) {
                return Arrays.asList("BASIC", "PREMIUM", "SUPPORT", "GENERAL");
            }
            return categories;
        } catch (Exception e) {
            logger.error("Error fetching categories", e);
            return Arrays.asList("BASIC", "PREMIUM", "SUPPORT", "GENERAL");
        }
    }

    public ServiceDto createService(ServiceDto serviceDto) {
        logger.info("Creating new service: {}", serviceDto.getName());
        try {
            // Check if service with same name already exists
            if (serviceRepository.existsByName(serviceDto.getName())) {
                throw new RuntimeException("Service with name '" + serviceDto.getName() + "' already exists");
            }
            
            MatrimonyService service = mapToEntity(serviceDto);  // Updated type
            service.setCreatedAt(LocalDateTime.now());
            MatrimonyService saved = serviceRepository.save(service);  // Updated type
            logger.info("Service created successfully with ID: {}", saved.getId());
            return mapToDto(saved);
        } catch (Exception e) {
            logger.error("Error creating service: {}", serviceDto.getName(), e);
            throw new RuntimeException("Failed to create service: " + e.getMessage());
        }
    }

    public ServiceDto updateService(Long id, ServiceDto serviceDto) {
        logger.info("Updating service with ID: {}", id);
        try {
            MatrimonyService existingService = serviceRepository.findById(id)  // Updated type
                    .orElseThrow(() -> new RuntimeException("Service not found with id: " + id));
            
            // Check if another service with the same name exists (excluding current service)
            if (serviceRepository.existsByName(serviceDto.getName()) && 
                !existingService.getName().equals(serviceDto.getName())) {
                throw new RuntimeException("Service with name '" + serviceDto.getName() + "' already exists");
            }
            
            existingService.setName(serviceDto.getName());
            existingService.setDescription(serviceDto.getDescription());
            existingService.setCategory(serviceDto.getCategory());
            existingService.setPrice(serviceDto.getPrice());
            existingService.setDuration(serviceDto.getDuration());
            existingService.setIcon(serviceDto.getIcon());
            existingService.setDisplayOrder(serviceDto.getDisplayOrder());
            existingService.setFeatured(serviceDto.isFeatured());
            existingService.setUpdatedAt(LocalDateTime.now());
            
            MatrimonyService updated = serviceRepository.save(existingService);  // Updated type
            logger.info("Service updated successfully: {}", id);
            return mapToDto(updated);
        } catch (Exception e) {
            logger.error("Error updating service with ID: {}", id, e);
            throw new RuntimeException("Failed to update service: " + e.getMessage());
        }
    }

    public ServiceDto updateServiceStatus(Long id, Boolean active) {
        logger.info("Updating service status for ID: {} to {}", id, active);
        try {
            MatrimonyService service = serviceRepository.findById(id)  // Updated type
                    .orElseThrow(() -> new RuntimeException("Service not found with id: " + id));
            
            service.setActive(active);
            service.setUpdatedAt(LocalDateTime.now());
            
            MatrimonyService updated = serviceRepository.save(service);  // Updated type
            logger.info("Service status updated successfully: {}", id);
            return mapToDto(updated);
        } catch (Exception e) {
            logger.error("Error updating service status for ID: {}", id, e);
            throw new RuntimeException("Failed to update service status: " + e.getMessage());
        }
    }

    public void deleteService(Long id) {
        logger.info("Deleting service with ID: {}", id);
        try {
            if (!serviceRepository.existsById(id)) {
                throw new RuntimeException("Service not found with id: " + id);
            }
            serviceRepository.deleteById(id);
            logger.info("Service deleted successfully: {}", id);
        } catch (RuntimeException e) {
            logger.warn("Service not found for deletion: {}", id);
            throw e;
        } catch (Exception e) {
            logger.error("Error deleting service with ID: {}", id, e);
            throw new RuntimeException("Failed to delete service: " + e.getMessage());
        }
    }

    // Get featured services
    public List<ServiceDto> getFeaturedServices() {
        logger.info("Fetching featured services");
        try {
            return serviceRepository.findByFeaturedTrueAndActiveTrueOrderByDisplayOrderAsc().stream()
                    .map(this::mapToDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("Error fetching featured services", e);
            return List.of();
        }
    }

    // Default services in case database is empty
    private List<ServiceDto> getDefaultServices() {
        return Arrays.asList(
            new ServiceDto(1L, "Profile Matching", "Get the best matches based on your preferences."),
            new ServiceDto(2L, "Secure Messaging", "Chat safely with verified members."),
            new ServiceDto(3L, "24/7 Support", "Our support team is here to help anytime."),
            new ServiceDto(4L, "Verified Profiles", "All profiles are thoroughly verified for authenticity."),
            new ServiceDto(5L, "Horoscope Matching", "Traditional horoscope matching for compatibility."),
            new ServiceDto(6L, "Premium Search", "Advanced search filters to find your perfect match.")
        );
    }

    private ServiceDto mapToDto(MatrimonyService service) {  // Updated parameter type
        ServiceDto dto = new ServiceDto();
        dto.setId(service.getId());
        dto.setName(service.getName());
        dto.setDescription(service.getDescription());
        dto.setCategory(service.getCategory());
        dto.setPrice(service.getPrice());
        dto.setDuration(service.getDuration());
        dto.setCurrency(service.getCurrency());
        dto.setIcon(service.getIcon());
        dto.setDisplayOrder(service.getDisplayOrder());
        dto.setActive(service.isActive());
        dto.setFeatured(service.isFeatured());
        dto.setCreatedAt(service.getCreatedAt());
        dto.setUpdatedAt(service.getUpdatedAt());
        return dto;
    }

    private MatrimonyService mapToEntity(ServiceDto dto) {  // Updated return type
        MatrimonyService service = new MatrimonyService();  // Updated constructor
        service.setName(dto.getName());
        service.setDescription(dto.getDescription());
        service.setCategory(dto.getCategory());
        service.setPrice(dto.getPrice());
        service.setDuration(dto.getDuration());
        service.setCurrency(dto.getCurrency());
        service.setIcon(dto.getIcon());
        service.setDisplayOrder(dto.getDisplayOrder());
        service.setActive(dto.isActive());
        service.setFeatured(dto.isFeatured());
        return service;
    }
}