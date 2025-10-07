package com.matrimony.repository;

import com.matrimony.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
    
    // Find profile by user ID
    Optional<Profile> findByUserId(Long userId);
    
    // Find profiles by gender
    List<Profile> findByGender(String gender);
    
    // Find profiles by religion
    List<Profile> findByReligion(String religion);
    
    // Find profiles by caste
    List<Profile> findByCaste(String caste);
    
    // Find profiles by location (partial match)
    List<Profile> findByLocationContainingIgnoreCase(String location);
    
    // Find profiles by age range
    @Query("SELECT p FROM Profile p WHERE p.age BETWEEN :minAge AND :maxAge")
    List<Profile> findByAgeBetween(@Param("minAge") Integer minAge, @Param("maxAge") Integer maxAge);
    
    // Find profiles by multiple criteria
    @Query("SELECT p FROM Profile p WHERE " +
           "(:gender IS NULL OR p.gender = :gender) AND " +
           "(:minAge IS NULL OR p.age >= :minAge) AND " +
           "(:maxAge IS NULL OR p.age <= :maxAge) AND " +
           "(:religion IS NULL OR p.religion = :religion) AND " +
           "(:location IS NULL OR LOWER(p.location) LIKE LOWER(CONCAT('%', :location, '%')))")
    List<Profile> findByFilters(@Param("gender") String gender,
                               @Param("minAge") Integer minAge,
                               @Param("maxAge") Integer maxAge,
                               @Param("religion") String religion,
                               @Param("location") String location);
    
    // Check if user has a profile
    boolean existsByUserId(Long userId);
}