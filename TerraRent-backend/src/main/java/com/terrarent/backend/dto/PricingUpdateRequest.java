package com.terrarent.backend.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class PricingUpdateRequest {
    private BigDecimal price;
}