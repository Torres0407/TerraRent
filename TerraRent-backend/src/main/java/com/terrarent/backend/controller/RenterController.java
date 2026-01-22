package com.terrarent.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.terrarent.backend.dto.ApplicationDto;
import com.terrarent.backend.dto.BookingDto;
import com.terrarent.backend.dto.PropertyDto;
import com.terrarent.backend.service.RenterService;

@RestController
@RequestMapping("/api/renter")
@PreAuthorize("hasRole('RENTER')")
public class RenterController {

    @Autowired
    private RenterService renterService;

    @GetMapping("/dashboard")
    public ResponseEntity<RenterDashboardResponse> getDashboard() {
        RenterDashboardResponse response = renterService.getDashboardMetrics();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/saved-properties")
    public ResponseEntity<List<PropertyDto>> getSavedProperties() {
        List<PropertyDto> properties = renterService.getSavedProperties();
        return ResponseEntity.ok(properties);
    }

    @PostMapping("/saved-properties/{propertyId}")
    public ResponseEntity<Void> saveProperty(@PathVariable Long propertyId) {
        renterService.saveProperty(propertyId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/saved-properties/{propertyId}")
    public ResponseEntity<Void> unsaveProperty(@PathVariable Long propertyId) {
        renterService.unsaveProperty(propertyId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/recently-viewed")
    public ResponseEntity<List<PropertyDto>> getRecentlyViewed() {
        List<PropertyDto> properties = renterService.getRecentlyViewed();
        return ResponseEntity.ok(properties);
    }

    @PostMapping("/applications")
    public ResponseEntity<ApplicationDto> submitApplication(@RequestBody ApplicationRequest request) {
        ApplicationDto application = renterService.submitApplication(request);
        return ResponseEntity.ok(application);
    }

    @GetMapping("/applications")
    public ResponseEntity<List<ApplicationDto>> getApplications() {
        List<ApplicationDto> applications = renterService.getApplications();
        return ResponseEntity.ok(applications);
    }

    @PostMapping("/bookings")
    public ResponseEntity<BookingDto> createBooking(@RequestBody BookingRequest request) {
        BookingDto booking = renterService.createBooking(request);
        return ResponseEntity.ok(booking);
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<BookingDto>> getBookings() {
        List<BookingDto> bookings = renterService.getBookings();
        return ResponseEntity.ok(bookings);
    }

    @PostMapping("/tours")
    public ResponseEntity<TourDto> scheduleTour(@RequestBody TourRequest request) {
        TourDto tour = renterService.scheduleTour(request);
        return ResponseEntity.ok(tour);
    }

    @GetMapping("/tours")
    public ResponseEntity<List<TourDto>> getTours() {
        List<TourDto> tours = renterService.getTours();
        return ResponseEntity.ok(tours);
    }

    @PostMapping("/negotiations")
    public ResponseEntity<NegotiationDto> startNegotiation(@RequestBody NegotiationRequest request) {
        NegotiationDto negotiation = renterService.startNegotiation(request);
        return ResponseEntity.ok(negotiation);
    }

    @GetMapping("/negotiations")
    public ResponseEntity<List<NegotiationDto>> getNegotiations() {
        List<NegotiationDto> negotiations = renterService.getNegotiations();
        return ResponseEntity.ok(negotiations);
    }

    @PostMapping("/reviews")
    public ResponseEntity<ReviewDto> submitReview(@RequestBody ReviewRequest request) {
        ReviewDto review = renterService.submitReview(request);
        return ResponseEntity.ok(review);
    }

    @GetMapping("/reviews")
    public ResponseEntity<List<ReviewDto>> getReviews() {
        List<ReviewDto> reviews = renterService.getReviews();
        return ResponseEntity.ok(reviews);
    }
}