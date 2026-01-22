package com.terrarent.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Data;

@Data
public class AdminDashboardResponse {
    private int totalUsers;
    private int totalProperties;
    private int activeBookings;
    private BigDecimal totalRevenue;
    private int pendingVerifications;
}

@Data
public class UserStatusUpdateRequest {
    private String status;
}

@Data
public class PropertyStatusUpdateRequest {
    private String status;
}

@Data
public class AdminReportDto {
    private String type;
    private String title;
    private String description;
    private LocalDateTime generatedAt;
}

@Data
public class FeaturedPropertyRequest {
    private Long propertyId;
}

@Data
public class VerificationRequestDto {
    private Long id;
    private Long userId;
    private String userType;
    private String documentType;
    private String status;
    private LocalDateTime submittedAt;
}

@Data
public class VerificationDecisionRequest {
    private boolean approved;
    private String notes;
}