package com.matrimony.controller;

import com.matrimony.dto.ContactDto;
import com.matrimony.service.ContactService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

    private static final Logger logger = LoggerFactory.getLogger(ContactController.class);
    
    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<?> submitContact(@Valid @RequestBody ContactDto dto) {
        logger.info("Contact form submission received from: {}", dto.getEmail());
        
        try {
            ContactDto savedContact = contactService.saveContact(dto);
            
            logger.info("Contact form submitted successfully for: {}", dto.getEmail());
            
            Map<String, Object> response = Map.of(
                "message", "Thank you for contacting us! We'll get back to you soon.",
                "contactId", savedContact.getId(),
                "timestamp", savedContact.getCreatedAt()
            );
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            
        } catch (Exception e) {
            logger.error("Error submitting contact form for: {}", dto.getEmail(), e);
            
            Map<String, String> errorResponse = Map.of(
                "error", "Failed to submit contact form",
                "message", "Please try again later or contact support directly."
            );
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    // Admin endpoints to manage contact submissions
    @GetMapping("/admin/submissions")
    public ResponseEntity<?> getAllContactSubmissions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDirection) {
        
        try {
            Map<String, Object> response = contactService.getAllContactSubmissions(page, size, sortBy, sortDirection);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error fetching contact submissions", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to fetch contact submissions"));
        }
    }

    @GetMapping("/admin/submissions/{id}")
    public ResponseEntity<?> getContactSubmission(@PathVariable Long id) {
        try {
            ContactDto contact = contactService.getContactById(id);
            return ResponseEntity.ok(contact);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Contact submission not found"));
        } catch (Exception e) {
            logger.error("Error fetching contact submission: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to fetch contact submission"));
        }
    }

    @PatchMapping("/admin/submissions/{id}/status")
    public ResponseEntity<?> updateContactStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> statusUpdate) {
        
        try {
            String status = statusUpdate.get("status");
            ContactDto updatedContact = contactService.updateContactStatus(id, status);
            return ResponseEntity.ok(updatedContact);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.error("Error updating contact status: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to update contact status"));
        }
    }

    @DeleteMapping("/admin/submissions/{id}")
    public ResponseEntity<?> deleteContactSubmission(@PathVariable Long id) {
        try {
            contactService.deleteContact(id);
            return ResponseEntity.ok(Map.of("message", "Contact submission deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.error("Error deleting contact submission: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to delete contact submission"));
        }
    }
}