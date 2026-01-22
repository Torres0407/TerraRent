package com.terrarent.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.terrarent.backend.dto.AdminDashboardResponse;
import com.terrarent.backend.dto.AdminReportDto;
import com.terrarent.backend.dto.FeaturedPropertyRequest;
import com.terrarent.backend.dto.PropertyDto;
import com.terrarent.backend.dto.PropertyStatusUpdateRequest;
import com.terrarent.backend.dto.UserDto;
import com.terrarent.backend.dto.UserStatusUpdateRequest;
import com.terrarent.backend.dto.VerificationDecisionRequest;
import com.terrarent.backend.dto.VerificationRequestDto;
import com.terrarent.backend.service.AdminService;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/dashboard")
    public ResponseEntity<AdminDashboardResponse> getDashboard() {
        AdminDashboardResponse response = adminService.getDashboardMetrics();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        List<UserDto> users = adminService.getUsers(page, size);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/properties")
    public ResponseEntity<List<PropertyDto>> getProperties(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        List<PropertyDto> properties = adminService.getProperties(page, size);
        return ResponseEntity.ok(properties);
    }

    @PutMapping("/users/{userId}/status")
    public ResponseEntity<Void> updateUserStatus(@PathVariable Long userId, @RequestBody UserStatusUpdateRequest request) {
        adminService.updateUserStatus(userId, request.getStatus());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/properties/{propertyId}/status")
    public ResponseEntity<Void> updatePropertyStatus(@PathVariable Long propertyId, @RequestBody PropertyStatusUpdateRequest request) {
        adminService.updatePropertyStatus(propertyId, request.getStatus());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/reports")
    public ResponseEntity<List<AdminReportDto>> getReports() {
        List<AdminReportDto> reports = adminService.getReports();
        return ResponseEntity.ok(reports);
    }

    @PostMapping("/featured-properties")
    public ResponseEntity<Void> addFeaturedProperty(@RequestBody FeaturedPropertyRequest request) {
        adminService.addFeaturedProperty(request.getPropertyId());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/featured-properties/{propertyId}")
    public ResponseEntity<Void> removeFeaturedProperty(@PathVariable Long propertyId) {
        adminService.removeFeaturedProperty(propertyId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/verification-requests")
    public ResponseEntity<List<VerificationRequestDto>> getVerificationRequests() {
        List<VerificationRequestDto> requests = adminService.getVerificationRequests();
        return ResponseEntity.ok(requests);
    }

    @PutMapping("/verification-requests/{requestId}")
    public ResponseEntity<Void> processVerificationRequest(@PathVariable Long requestId, @RequestBody VerificationDecisionRequest request) {
        adminService.processVerificationRequest(requestId, request.getApproved(), request.getNotes());
        return ResponseEntity.ok().build();
    }
}