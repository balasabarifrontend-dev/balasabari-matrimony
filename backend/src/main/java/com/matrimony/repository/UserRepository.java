package com.matrimony.repository;

import com.matrimony.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByMobile(String mobile);
    boolean existsByEmail(String email);
    boolean existsByMobile(String mobile);
    
    // Additional methods for admin functionality
    List<User> findByStatus(User.Status status);
    List<User> findByRole(User.Role role);
    
    @Query("SELECT u FROM User u WHERE " +
           "(:email IS NULL OR LOWER(u.email) LIKE LOWER(CONCAT('%', :email, '%'))) AND " +
           "(:mobile IS NULL OR u.mobile LIKE CONCAT('%', :mobile, '%')) AND " +
           "(:status IS NULL OR u.status = :status) AND " +
           "(:role IS NULL OR u.role = :role)")
    List<User> findByFilters(@Param("email") String email,
                            @Param("mobile") String mobile,
                            @Param("status") User.Status status,
                            @Param("role") User.Role role);
    
    long countByStatus(User.Status status);
    long countByRole(User.Role role);
    List<User> findByRoleAndStatus(String role, String status);
}