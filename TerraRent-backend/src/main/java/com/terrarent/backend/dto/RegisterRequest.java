package com.terrarent.backend.dto;

import com.terrarent.backend.entity.UserRole;
import lombok.Data;

@Data
public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phoneNumber;
    private UserRole role;
}