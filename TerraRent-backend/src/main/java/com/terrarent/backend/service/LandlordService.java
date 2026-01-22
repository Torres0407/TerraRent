package com.terrarent.backend.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.terrarent.backend.dto.ApplicationDto;
import com.terrarent.backend.dto.BookingDto;
import com.terrarent.backend.dto.LandlordDashboardResponse;
import com.terrarent.backend.dto.PropertyDto;
import com.terrarent.backend.entity.Booking;
import com.terrarent.backend.entity.Property;
import com.terrarent.backend.entity.User;
import com.terrarent.backend.exception.ResourceNotFoundException;
import com.terrarent.backend.repository.BookingRepository;
import com.terrarent.backend.repository.PropertyRepository;

@Service
public class LandlordService {

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private PropertyService propertyService;

    public LandlordDashboardResponse getDashboardMetrics() {
        User currentUser = getCurrentUser();

        List<Property> properties = propertyRepository.findByLandlordId(currentUser.getId());
        List<Booking> bookings = bookingRepository.findByPropertyLandlordId(currentUser.getId());

        BigDecimal totalRevenue = bookings.stream()
                .filter(b -> "COMPLETED".equals(b.getStatus()))
                .map(b -> b.getProperty().getPrice())
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        long activeListings = properties.stream()
                .filter(p -> "LIVE".equals(p.getStatus()))
                .count();

        // Calculate occupancy rate (simplified)
        BigDecimal occupancyRate = properties.isEmpty() ? BigDecimal.ZERO :
                BigDecimal.valueOf(activeListings).divide(BigDecimal.valueOf(properties.size()), 2, BigDecimal.ROUND_HALF_UP)
                .multiply(BigDecimal.valueOf(100));

        LandlordDashboardResponse response = new LandlordDashboardResponse();
        response.setTotalRevenue(totalRevenue);
        response.setOccupancyRate(occupancyRate);
        response.setTotalProperties(properties.size());
        response.setActiveListings((int) activeListings);

        return response;
    }

    public List<PropertyDto> getLandlordProperties() {
        User currentUser = getCurrentUser();
        List<Property> properties = propertyRepository.findByLandlordId(currentUser.getId());
        return properties.stream()
                .map(propertyService::convertToDto)
                .collect(Collectors.toList());
    }

    public Optional<PropertyDto> getPropertyById(Long id) {
        User currentUser = getCurrentUser();
        return propertyRepository.findByIdAndLandlordId(id, currentUser.getId())
                .map(propertyService::convertToDto);
    }

    public PropertyDto createProperty(PropertyDto propertyDto) {
        User currentUser = getCurrentUser();
        propertyDto.setLandlordId(currentUser.getId());
        return propertyService.createProperty(propertyDto);
    }

    public PropertyDto updateProperty(Long id, PropertyDto propertyDto) {
        User currentUser = getCurrentUser();
        // Verify ownership
        Property existingProperty = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));

        if (!existingProperty.getLandlord().getId().equals(currentUser.getId())) {
            throw new SecurityException("Unauthorized to update this property");
        }

        propertyDto.setId(id);
        return propertyService.updateProperty(id, propertyDto);
    }

    public PropertyDto updatePricing(Long id, BigDecimal price) {
        User currentUser = getCurrentUser();
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));

        if (!property.getLandlord().getId().equals(currentUser.getId())) {
            throw new SecurityException("Unauthorized to update this property");
        }

        property.setPrice(price);
        Property savedProperty = propertyRepository.save(property);
        return propertyService.convertToDto(savedProperty);
    }

    public void uploadMedia(Long propertyId, MultipartFile file) {
        User currentUser = getCurrentUser();
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));

        if (!property.getLandlord().getId().equals(currentUser.getId())) {
            throw new SecurityException("Unauthorized to upload media for this property");
        }

        // TODO: Implement file upload logic
    }

    public List<BookingDto> getPropertyAvailability(Long propertyId) {
        User currentUser = getCurrentUser();
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));

        if (!property.getLandlord().getId().equals(currentUser.getId())) {
            throw new SecurityException("Unauthorized to view this property's availability");
        }

        List<Booking> bookings = bookingRepository.findByPropertyId(propertyId);
        return bookings.stream()
                .map(this::convertToBookingDto)
                .collect(Collectors.toList());
    }

    public List<ApplicationDto> getApplications() {
        // TODO: Implement applications logic
        return List.of();
    }

    public List<BookingDto> getBookingRequests() {
        User currentUser = getCurrentUser();
        List<Booking> bookings = bookingRepository.findByPropertyLandlordId(currentUser.getId());
        return bookings.stream()
                .filter(b -> "PENDING".equals(b.getStatus()))
                .map(this::convertToBookingDto)
                .collect(Collectors.toList());
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }

    private BookingDto convertToBookingDto(Booking booking) {
        BookingDto dto = new BookingDto();
        dto.setId(booking.getId());
        dto.setPropertyId(booking.getProperty().getId());
        dto.setUserId(booking.getRenter().getId());
        dto.setBookingDate(booking.getBookingDate());
        dto.setStatus(booking.getStatus());
        return dto;
    }
}