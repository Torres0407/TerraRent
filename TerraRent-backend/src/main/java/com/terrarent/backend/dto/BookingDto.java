package com.terrarent.backend.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class BookingDto {
    private Long id;
    private Long propertyId;
    private Long userId;
    private LocalDate bookingDate;
    private String status;
}