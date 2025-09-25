package com.matrimony.controller;
import com.matrimony.model.User;
import com.matrimony.security.JwtUtil;
import com.matrimony.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
  private final UserService userService;
  private final JwtUtil jwtUtil;
  private final BCryptPasswordEncoder encoder;

  public AuthController(UserService userService, JwtUtil jwtUtil, BCryptPasswordEncoder encoder){
    this.userService = userService; this.jwtUtil = jwtUtil; this.encoder = encoder;
  }

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody User user){
    if(userService.findByEmail(user.getEmail()).isPresent()) return ResponseEntity.badRequest().body("Email in use");
    return ResponseEntity.ok(userService.register(user));
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody Map<String,String> b){
    String email = b.get("email"); String password = b.get("password");
    return userService.findByEmail(email).map(user -> {
      if(encoder.matches(password,user.getPassword())){
        String token = jwtUtil.generateToken(user.getEmail());
        return ResponseEntity.ok(Map.of("token",token,"user",user));
      } else return ResponseEntity.status(401).body("Invalid credentials");
    }).orElse(ResponseEntity.status(404).body("User not found"));
  }
}
