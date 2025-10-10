package com.matrimony.controller;

import com.matrimony.service.ProfileService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Map;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "*")
public class FileUploadController {

    private final ProfileService profileService;
    
    @Value("${file.upload-dir:uploads/}")
    private String uploadDir;

    public FileUploadController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping("/profile-image/{profileId}")
    public ResponseEntity<?> uploadProfileImage(
            @PathVariable Long profileId,
            @RequestParam("file") MultipartFile file) {
        
        try {
            // Create upload directory if it doesn't exist
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Generate unique filename
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            String filePath = uploadDir + fileName;

            // Save file
            file.transferTo(new File(filePath));

            // Update profile with image path
            String imageUrl = "/uploads/" + fileName;
            profileService.updateProfileImage(profileId, imageUrl);

            return ResponseEntity.ok(Map.of(
                "message", "Image uploaded successfully",
                "imageUrl", imageUrl
            ));

        } catch (Exception e) {
            return ResponseEntity.status(500)
                .body(Map.of("error", "Failed to upload image: " + e.getMessage()));
        }
    }
    
}