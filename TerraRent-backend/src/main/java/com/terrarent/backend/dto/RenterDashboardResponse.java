package com.terrarent.backend.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class RenterDashboardResponse {
    private int savedPropertiesCount;
    private int activeApplicationsCount;
    private int upcomingBookingsCount;
    private BigDecimal totalSpent;
}