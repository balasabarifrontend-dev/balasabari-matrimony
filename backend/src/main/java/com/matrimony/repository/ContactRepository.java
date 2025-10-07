package com.matrimony.repository;

import com.matrimony.model.Contact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    
    // Find by status with pagination
    Page<Contact> findByStatus(Contact.ContactStatus status, Pageable pageable);
    
    // Find by email
    List<Contact> findByEmail(String email);
    
    // Count by status
    long countByStatus(Contact.ContactStatus status);
    
    // Find recent submissions
    @Query("SELECT c FROM Contact c ORDER BY c.createdAt DESC")
    List<Contact> findRecentSubmissions(Pageable pageable);
}