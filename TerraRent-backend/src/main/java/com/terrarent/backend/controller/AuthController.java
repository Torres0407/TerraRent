package com.terrarent.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.terrarent.backend.dto.AuthRequest;
import com.terrarent.backend.dto.AuthResponse;
import com.terrarent.backend.dto.RegisterRequest;
import com.terrarent.backend.dto.UserDto;
import com.terrarent.backend.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest) {
        AuthResponse response = authService.authenticate(authRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody RegisterRequest registerRequest) {
        UserDto user = authService.register(registerRequest);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/verify")
    public ResponseEntity<Void> verifyEmail(@RequestBody VerifyEmailRequest request) {
        authService.verifyEmail(request.getEmail(), request.getCode());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/resend-verification")
    public ResponseEntity<Void> resendVerification(@RequestBody ResendVerificationRequest request) {
        authService.resendVerification(request.getEmail());
        return ResponseEntity.ok().build();
    }
}