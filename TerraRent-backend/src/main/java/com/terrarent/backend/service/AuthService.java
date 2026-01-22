package com.terrarent.backend.service;

import com.terrarent.backend.dto.AuthRequest;
import com.terrarent.backend.dto.AuthResponse;
import com.terrarent.backend.dto.RegisterRequest;
import com.terrarent.backend.dto.UserDto;
import com.terrarent.backend.entity.User;
import com.terrarent.backend.entity.UserRole;
import com.terrarent.backend.exception.ResourceNotFoundException;
import com.terrarent.backend.exception.ValidationException;
import com.terrarent.backend.repository.UserRepository;
import com.terrarent.backend.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    public AuthResponse authenticate(AuthRequest authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(
                    authRequest.getEmail(), authRequest.getPassword()));

            User user = (User) authentication.getPrincipal();
            String accessToken = jwtUtils.generateToken(user);
            String refreshToken = jwtUtils.generateRefreshToken(user);

            UserDto userDto = convertToDto(user);

            return new AuthResponse(accessToken, refreshToken, userDto);
        } catch (Exception e) {
            throw new ValidationException("Invalid email or password");
        }
    }

    public UserDto register(RegisterRequest registerRequest) {
        // Check if email already exists
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new ValidationException("Email already exists");
        }

        User user = new User();
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setPhoneNumber(registerRequest.getPhoneNumber());
        user.setRole(registerRequest.getRole());
        user.setVerified(false);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        User savedUser = userRepository.save(user);
        return convertToDto(savedUser);
    }

    public void verifyEmail(String email, String code) {
        // For now, just mark as verified since the entity doesn't have verification code
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setVerified(true);
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
    }

    public void resendVerification(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (user.isVerified()) {
            throw new ValidationException("Email already verified");
        }
        // In a real implementation, you'd send an email here
    }

    private UserDto convertToDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setRole(user.getRole());
        dto.setVerified(user.isVerified());
        return dto;
    }
}