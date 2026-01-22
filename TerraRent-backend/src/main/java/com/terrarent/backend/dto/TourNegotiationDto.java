package com.terrarent.backend.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class TourDto {
    private Long id;
    private Long propertyId;
    private Long renterId;
    private LocalDateTime scheduledDate;
    private String status;
    private String contactPhone;
    private String notes;
}

@Data
public class NegotiationDto {
    private Long id;
    private Long propertyId;
    private Long renterId;
    private Long landlordId;
    private String status;
    private Double proposedPrice;
    private String message;
    private LocalDateTime createdAt;
}