package com.terrarent.backend.dto;

import lombok.Data;

@Data
public class ResendVerificationRequest {
    private String email;
}