package com.terrarent.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.terrarent.backend.dto.ApplicationDto;
import com.terrarent.backend.dto.BookingDto;
import com.terrarent.backend.dto.LandlordDashboardResponse;
import com.terrarent.backend.dto.PricingUpdateRequest;
import com.terrarent.backend.dto.PropertyDto;
import com.terrarent.backend.service.LandlordService;

@RestController
@RequestMapping("/api/landlord")
@PreAuthorize("hasRole('LANDLORD')")
public class LandlordController {

    @Autowired
    private LandlordService landlordService;

    @GetMapping("/dashboard/metrics")
    public ResponseEntity<LandlordDashboardResponse> getDashboardMetrics() {
        LandlordDashboardResponse metrics = landlordService.getDashboardMetrics();
        return ResponseEntity.ok(metrics);
    }

    @GetMapping("/properties")
    public ResponseEntity<List<PropertyDto>> getLandlordProperties() {
        List<PropertyDto> properties = landlordService.getLandlordProperties();
        return ResponseEntity.ok(properties);
    }

    @GetMapping("/properties/{id}")
    public ResponseEntity<PropertyDto> getPropertyById(@PathVariable Long id) {
        return landlordService.getPropertyById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/properties")
    public ResponseEntity<PropertyDto> createProperty(@RequestBody PropertyDto propertyDto) {
        PropertyDto createdProperty = landlordService.createProperty(propertyDto);
        return ResponseEntity.ok(createdProperty);
    }

    @PutMapping("/properties/{id}")
    public ResponseEntity<PropertyDto> updateProperty(@PathVariable Long id, @RequestBody PropertyDto propertyDto) {
        PropertyDto updatedProperty = landlordService.updateProperty(id, propertyDto);
        if (updatedProperty != null) {
            return ResponseEntity.ok(updatedProperty);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/properties/{id}/pricing")
    public ResponseEntity<PropertyDto> updatePricing(@PathVariable Long id, @RequestBody PricingUpdateRequest request) {
        PropertyDto updatedProperty = landlordService.updatePricing(id, request.getPrice());
        if (updatedProperty != null) {
            return ResponseEntity.ok(updatedProperty);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/properties/{id}/media")
    public ResponseEntity<Void> uploadMedia(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        landlordService.uploadMedia(id, file);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/properties/{id}/availability")
    public ResponseEntity<List<BookingDto>> getPropertyAvailability(@PathVariable Long id) {
        List<BookingDto> bookings = landlordService.getPropertyAvailability(id);
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/applications")
    public ResponseEntity<List<ApplicationDto>> getApplications() {
        List<ApplicationDto> applications = landlordService.getApplications();
        return ResponseEntity.ok(applications);
    }

    @GetMapping("/requests")
    public ResponseEntity<List<BookingDto>> getBookingRequests() {
        List<BookingDto> requests = landlordService.getBookingRequests();
        return ResponseEntity.ok(requests);
    }
}