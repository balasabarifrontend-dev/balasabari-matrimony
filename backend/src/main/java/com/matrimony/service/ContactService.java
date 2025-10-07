package com.matrimony.service;

import com.matrimony.dto.ContactDto;
import com.matrimony.model.Contact;
import com.matrimony.repository.ContactRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public ContactDto saveContact(ContactDto dto) {
        Contact contact = new Contact();
        contact.setName(dto.getName());
        contact.setEmail(dto.getEmail());
        contact.setMessage(dto.getMessage());
        contact.setPhone(dto.getPhone());
        contact.setSubject(dto.getSubject());
        
        Contact saved = contactRepository.save(contact);
        return mapToDto(saved);
    }

    public Map<String, Object> getAllContactSubmissions(int page, int size, String sortBy, String sortDirection) {
        Sort sort = sortDirection.equalsIgnoreCase("desc") 
            ? Sort.by(sortBy).descending() 
            : Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Contact> contactsPage = contactRepository.findAll(pageable);
        
        return Map.of(
            "submissions", contactsPage.getContent().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList()),
            "currentPage", contactsPage.getNumber(),
            "totalItems", contactsPage.getTotalElements(),
            "totalPages", contactsPage.getTotalPages()
        );
    }

    public ContactDto getContactById(Long id) {
        Contact contact = contactRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Contact submission not found with id: " + id));
        return mapToDto(contact);
    }

    public ContactDto updateContactStatus(Long id, String status) {
        Contact contact = contactRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Contact submission not found"));
        
        contact.setStatus(Contact.ContactStatus.valueOf(status.toUpperCase()));
        
        if (status.equalsIgnoreCase("RESPONDED") && contact.getRespondedAt() == null) {
            contact.setRespondedAt(LocalDateTime.now());
        }
        
        Contact updated = contactRepository.save(contact);
        return mapToDto(updated);
    }

    public void deleteContact(Long id) {
        if (!contactRepository.existsById(id)) {
            throw new RuntimeException("Contact submission not found with id: " + id);
        }
        contactRepository.deleteById(id);
    }

    // Additional methods
    public List<ContactDto> getContactsByStatus(String status) {
        Contact.ContactStatus contactStatus = Contact.ContactStatus.valueOf(status.toUpperCase());
        return contactRepository.findByStatus(contactStatus, Pageable.unpaged())
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public Map<String, Long> getContactStatistics() {
        return Map.of(
            "total", contactRepository.count(),
            "pending", contactRepository.countByStatus(Contact.ContactStatus.PENDING),
            "responded", contactRepository.countByStatus(Contact.ContactStatus.RESPONDED),
            "resolved", contactRepository.countByStatus(Contact.ContactStatus.RESOLVED)
        );
    }

    private ContactDto mapToDto(Contact contact) {
        ContactDto dto = new ContactDto();
        dto.setId(contact.getId());
        dto.setName(contact.getName());
        dto.setEmail(contact.getEmail());
        dto.setMessage(contact.getMessage());
        dto.setPhone(contact.getPhone());
        dto.setSubject(contact.getSubject());
        dto.setStatus(contact.getStatus().name());
        dto.setCreatedAt(contact.getCreatedAt());
        dto.setRespondedAt(contact.getRespondedAt());
        dto.setAdminNotes(contact.getAdminNotes());
        return dto;
    }
}