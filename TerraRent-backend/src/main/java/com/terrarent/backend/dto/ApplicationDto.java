package com.terrarent.backend.dto;

import lombok.Data;

@Data
public class ApplicationDto {
    private Long id;
    private Long userId;
    private Long propertyId;
    private String status;
}