package com.terrarent.backend.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.terrarent.backend.dto.AdminDashboardResponse;
import com.terrarent.backend.dto.AdminReportDto;
import com.terrarent.backend.dto.PropertyDto;
import com.terrarent.backend.dto.UserDto;
import com.terrarent.backend.dto.VerificationRequestDto;
import com.terrarent.backend.entity.Property;
import com.terrarent.backend.entity.User;
import com.terrarent.backend.entity.VerificationRequest;
import com.terrarent.backend.repository.BookingRepository;
import com.terrarent.backend.repository.PropertyRepository;
import com.terrarent.backend.repository.UserRepository;
import com.terrarent.backend.repository.VerificationRequestRepository;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private VerificationRequestRepository verificationRequestRepository;

    @Autowired
    private PropertyService propertyService;

    public AdminDashboardResponse getDashboardMetrics() {
        int totalUsers = (int) userRepository.count();
        int totalProperties = (int) propertyRepository.count();
        int activeBookings = bookingRepository.findAll().stream()
                .mapToInt(b -> "ACTIVE".equals(b.getStatus()) ? 1 : 0)
                .sum();

        BigDecimal totalRevenue = bookingRepository.findAll().stream()
                .filter(b -> "COMPLETED".equals(b.getStatus()))
                .map(b -> b.getProperty().getPrice())
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        int pendingVerifications = verificationRequestRepository.countByStatus("PENDING");

        AdminDashboardResponse response = new AdminDashboardResponse();
        response.setTotalUsers(totalUsers);
        response.setTotalProperties(totalProperties);
        response.setActiveBookings(activeBookings);
        response.setTotalRevenue(totalRevenue);
        response.setPendingVerifications(pendingVerifications);

        return response;
    }

    public List<UserDto> getUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> userPage = userRepository.findAll(pageable);
        return userPage.getContent().stream()
                .map(this::convertToUserDto)
                .collect(Collectors.toList());
    }

    public List<PropertyDto> getProperties(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Property> propertyPage = propertyRepository.findAll(pageable);
        return propertyPage.getContent().stream()
                .map(propertyService::convertToDto)
                .collect(Collectors.toList());
    }

    public void updateUserStatus(Long userId, String status) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setStatus(status);
        userRepository.save(user);
    }

    public void updatePropertyStatus(Long propertyId, String status) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));
        property.setStatus(status);
        propertyRepository.save(property);
    }

    public List<AdminReportDto> getReports() {
        // TODO: Implement report generation logic
        return List.of();
    }

    public void addFeaturedProperty(Long propertyId) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));
        property.setFeatured(true);
        propertyRepository.save(property);
    }

    public void removeFeaturedProperty(Long propertyId) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));
        property.setFeatured(false);
        propertyRepository.save(property);
    }

    public List<VerificationRequestDto> getVerificationRequests() {
        List<VerificationRequest> requests = verificationRequestRepository.findByStatus("PENDING");
        return requests.stream()
                .map(this::convertToVerificationRequestDto)
                .collect(Collectors.toList());
    }

    public void processVerificationRequest(Long requestId, boolean approved, String notes) {
        VerificationRequest request = verificationRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Verification request not found"));

        request.setStatus(approved ? "APPROVED" : "REJECTED");
        request.setProcessedAt(LocalDateTime.now());
        request.setAdminNotes(notes);

        verificationRequestRepository.save(request);

        if (approved) {
            User user = request.getUser();
            user.setVerified(true);
            userRepository.save(user);
        }
    }

    private UserDto convertToUserDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setRole(user.getRole());
        dto.setStatus(user.getStatus());
        dto.setVerified(user.isVerified());
        dto.setCreatedAt(user.getCreatedAt());
        return dto;
    }

    private VerificationRequestDto convertToVerificationRequestDto(VerificationRequest request) {
        VerificationRequestDto dto = new VerificationRequestDto();
        dto.setId(request.getId());
        dto.setUserId(request.getUser().getId());
        dto.setUserType(request.getUser().getRole());
        dto.setDocumentType(request.getDocumentType());
        dto.setStatus(request.getStatus());
        dto.setSubmittedAt(request.getSubmittedAt());
        return dto;
    }
}