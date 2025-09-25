package com.matrimony.service;
import com.matrimony.model.User;
import com.matrimony.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
  private final UserRepository userRepository;
  private final BCryptPasswordEncoder encoder;

  public UserService(UserRepository userRepository, BCryptPasswordEncoder encoder){
    this.userRepository = userRepository;
    this.encoder = encoder;
  }

  public User register(User user){
    user.setPassword(encoder.encode(user.getPassword()));
    return userRepository.save(user);
  }

  public Optional<User> findByEmail(String email){ return userRepository.findByEmail(email); }
}
