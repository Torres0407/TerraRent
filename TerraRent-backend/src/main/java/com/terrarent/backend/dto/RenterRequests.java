package com.terrarent.backend.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ApplicationRequest {
    private Long propertyId;
    private String message;
    private LocalDateTime preferredMoveInDate;
}

@Data
public class BookingRequest {
    private Long propertyId;
    private LocalDateTime checkInDate;
    private LocalDateTime checkOutDate;
    private String specialRequests;
}

@Data
public class TourRequest {
    private Long propertyId;
    private LocalDateTime preferredDate;
    private String contactPhone;
    private String notes;
}

@Data
public class NegotiationRequest {
    private Long propertyId;
    private String message;
    private Double proposedPrice;
}

@Data
public class ReviewRequest {
    private Long propertyId;
    private Integer rating;
    private String comment;
}