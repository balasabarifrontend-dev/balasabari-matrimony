package com.matrimony.repository;

import com.matrimony.model.MatrimonyService;  // Updated import
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<MatrimonyService, Long> {  // Updated to MatrimonyService
    
    // Find all active services ordered by display order
    List<MatrimonyService> findByActiveTrueOrderByDisplayOrderAsc();  // Updated return type
    
    // Find all services ordered by display order
    List<MatrimonyService> findAllByOrderByDisplayOrderAsc();  // Updated return type
    
    // Find services by category and active status
    List<MatrimonyService> findByCategoryAndActiveTrueOrderByDisplayOrderAsc(String category);  // Updated return type
    
    // Find distinct categories
    @Query("SELECT DISTINCT s.category FROM MatrimonyService s WHERE s.active = true")  // Updated entity name
    List<String> findDistinctCategories();
    
    // Find featured services
    List<MatrimonyService> findByFeaturedTrueAndActiveTrueOrderByDisplayOrderAsc();  // Updated return type
    
    // Check if service exists by name
    boolean existsByName(String name);
}