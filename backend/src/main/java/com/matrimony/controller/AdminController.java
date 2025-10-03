package com.matrimony.controller;

import com.matrimony.dto.UserDto;
import com.matrimony.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        // findAllUsers already returns List<UserDto>
        List<UserDto> users = userService.findAllUsers();
        return ResponseEntity.ok(users);
    }
}

