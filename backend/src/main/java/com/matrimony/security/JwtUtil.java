package com.matrimony.security;
import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class JwtUtil {
  private final String SECRET_KEY = "change_this_secret";
  private final long EXPIRATION = 1000L * 60 * 60 * 24 * 7; // 7 days

  public String generateToken(String username){
    return Jwts.builder().setSubject(username).setIssuedAt(new Date())
      .setExpiration(new Date(System.currentTimeMillis()+EXPIRATION))
      .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
  }

  public String extractUsername(String token){
    return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody().getSubject();
  }

  public boolean validateToken(String token){
    try{ Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token); return true; } catch(Exception e){ return false; }
  }
}
