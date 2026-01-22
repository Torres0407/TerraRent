package com.terrarent.backend.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class LandlordDashboardResponse {
    private BigDecimal totalRevenue;
    private BigDecimal occupancyRate;
    private Integer totalProperties;
    private Integer activeListings;
}