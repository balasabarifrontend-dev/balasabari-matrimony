package com.matrimony.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);
    
    // Use a proper secret key (in production, use environment variable)
    private final SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final long expiration = 1000 * 60 * 60 * 10; // 10 hours

    public String generateToken(String username) {
        logger.debug("Generating JWT token for user: {}", username);
        
        try {
            String token = Jwts.builder()
                    .setSubject(username)
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + expiration))
                    .signWith(secretKey, SignatureAlgorithm.HS256)
                    .compact();
            
            logger.debug("JWT token generated successfully for user: {}", username);
            return token;
        } catch (Exception e) {
            logger.error("Error generating JWT token for user: {}", username, e);
            throw new RuntimeException("Failed to generate JWT token", e);
        }
    }

    public String extractUsername(String token) {
        try {
            Claims claims = getClaims(token);
            String username = claims.getSubject();
            logger.debug("Extracted username from token: {}", username);
            return username;
        } catch (Exception e) {
            logger.warn("Failed to extract username from token: {}", e.getMessage());
            throw new RuntimeException("Invalid JWT token", e);
        }
    }

    public boolean validateToken(String token) {
        try {
            Claims claims = getClaims(token);
            boolean isValid = !claims.getExpiration().before(new Date());
            logger.debug("Token validation result: {}", isValid);
            return isValid;
        } catch (Exception e) {
            logger.warn("Token validation failed: {}", e.getMessage());
            return false;
        }
    }

    public Date getExpirationDate(String token) {
        try {
            Claims claims = getClaims(token);
            return claims.getExpiration();
        } catch (Exception e) {
            logger.warn("Failed to get expiration date from token: {}", e.getMessage());
            throw new RuntimeException("Invalid JWT token", e);
        }
    }

    private Claims getClaims(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            logger.warn("Failed to parse JWT claims: {}", e.getMessage());
            throw new RuntimeException("Invalid JWT token", e);
        }
    }

    // Helper method to check if token will expire soon
    public boolean isTokenExpiringSoon(String token, long minutes) {
        try {
            Date expiration = getExpirationDate(token);
            long timeUntilExpiration = expiration.getTime() - System.currentTimeMillis();
            return timeUntilExpiration < (minutes * 60 * 1000);
        } catch (Exception e) {
            return true;
        }
    }
}