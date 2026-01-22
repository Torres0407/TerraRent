package com.terrarent.backend.service;

import com.terrarent.backend.dto.*;
import com.terrarent.backend.entity.*;
import com.terrarent.backend.exception.ResourceNotFoundException;
import com.terrarent.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RenterService {

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private TourRepository tourRepository;

    @Autowired
    private NegotiationRepository negotiationRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private SavedPropertyRepository savedPropertyRepository;

    @Autowired
    private PropertyService propertyService;

    public RenterDashboardResponse getDashboardMetrics() {
        User currentUser = getCurrentUser();

        int savedPropertiesCount = savedPropertyRepository.countByRenterId(currentUser.getId());
        int activeApplicationsCount = applicationRepository.countByRenterIdAndStatus(currentUser.getId(), "PENDING");
        int upcomingBookingsCount = bookingRepository.countByRenterIdAndBookingDateAfter(currentUser.getId(), LocalDateTime.now());

        BigDecimal totalSpent = bookingRepository.findByRenterId(currentUser.getId()).stream()
                .filter(b -> "COMPLETED".equals(b.getStatus()))
                .map(b -> b.getProperty().getPrice())
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        RenterDashboardResponse response = new RenterDashboardResponse();
        response.setSavedPropertiesCount(savedPropertiesCount);
        response.setActiveApplicationsCount(activeApplicationsCount);
        response.setUpcomingBookingsCount(upcomingBookingsCount);
        response.setTotalSpent(totalSpent);

        return response;
    }

    public List<PropertyDto> getSavedProperties() {
        User currentUser = getCurrentUser();
        List<SavedProperty> savedProperties = savedPropertyRepository.findByRenterId(currentUser.getId());
        return savedProperties.stream()
                .map(sp -> propertyService.convertToDto(sp.getProperty()))
                .collect(Collectors.toList());
    }

    public void saveProperty(Long propertyId) {
        User currentUser = getCurrentUser();
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));

        SavedProperty savedProperty = new SavedProperty();
        savedProperty.setRenter(currentUser);
        savedProperty.setProperty(property);
        savedProperty.setSavedAt(LocalDateTime.now());

        savedPropertyRepository.save(savedProperty);
    }

    public void unsaveProperty(Long propertyId) {
        User currentUser = getCurrentUser();
        savedPropertyRepository.deleteByRenterIdAndPropertyId(currentUser.getId(), propertyId);
    }

    public List<PropertyDto> getRecentlyViewed() {
        // TODO: Implement recently viewed logic with a separate table or cache
        return List.of();
    }

    public ApplicationDto submitApplication(ApplicationRequest request) {
        User currentUser = getCurrentUser();
        Property property = propertyRepository.findById(request.getPropertyId())
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));

        Application application = new Application();
        application.setRenter(currentUser);
        application.setProperty(property);
        application.setMessage(request.getMessage());
        application.setPreferredMoveInDate(request.getPreferredMoveInDate());
        application.setStatus("PENDING");
        application.setSubmittedAt(LocalDateTime.now());

        Application savedApplication = applicationRepository.save(application);
        return convertToApplicationDto(savedApplication);
    }

    public List<ApplicationDto> getApplications() {
        User currentUser = getCurrentUser();
        List<Application> applications = applicationRepository.findByRenterId(currentUser.getId());
        return applications.stream()
                .map(this::convertToApplicationDto)
                .collect(Collectors.toList());
    }

    public BookingDto createBooking(BookingRequest request) {
        User currentUser = getCurrentUser();
        Property property = propertyRepository.findById(request.getPropertyId())
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));

        Booking booking = new Booking();
        booking.setRenter(currentUser);
        booking.setProperty(property);
        booking.setBookingDate(request.getCheckInDate());
        booking.setCheckOutDate(request.getCheckOutDate());
        booking.setSpecialRequests(request.getSpecialRequests());
        booking.setStatus("PENDING");

        Booking savedBooking = bookingRepository.save(booking);
        return convertToBookingDto(savedBooking);
    }

    public List<BookingDto> getBookings() {
        User currentUser = getCurrentUser();
        List<Booking> bookings = bookingRepository.findByRenterId(currentUser.getId());
        return bookings.stream()
                .map(this::convertToBookingDto)
                .collect(Collectors.toList());
    }

    public TourDto scheduleTour(TourRequest request) {
        User currentUser = getCurrentUser();
        Property property = propertyRepository.findById(request.getPropertyId())
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));

        Tour tour = new Tour();
        tour.setRenter(currentUser);
        tour.setProperty(property);
        tour.setScheduledDate(request.getPreferredDate());
        tour.setContactPhone(request.getContactPhone());
        tour.setNotes(request.getNotes());
        tour.setStatus("SCHEDULED");

        Tour savedTour = tourRepository.save(tour);
        return convertToTourDto(savedTour);
    }

    public List<TourDto> getTours() {
        User currentUser = getCurrentUser();
        List<Tour> tours = tourRepository.findByRenterId(currentUser.getId());
        return tours.stream()
                .map(this::convertToTourDto)
                .collect(Collectors.toList());
    }

    public NegotiationDto startNegotiation(NegotiationRequest request) {
        User currentUser = getCurrentUser();
        Property property = propertyRepository.findById(request.getPropertyId())
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));

        Negotiation negotiation = new Negotiation();
        negotiation.setRenter(currentUser);
        negotiation.setProperty(property);
        negotiation.setLandlord(property.getLandlord());
        negotiation.setProposedPrice(request.getProposedPrice());
        negotiation.setMessage(request.getMessage());
        negotiation.setStatus("PENDING");
        negotiation.setCreatedAt(LocalDateTime.now());

        Negotiation savedNegotiation = negotiationRepository.save(negotiation);
        return convertToNegotiationDto(savedNegotiation);
    }

    public List<NegotiationDto> getNegotiations() {
        User currentUser = getCurrentUser();
        List<Negotiation> negotiations = negotiationRepository.findByRenterId(currentUser.getId());
        return negotiations.stream()
                .map(this::convertToNegotiationDto)
                .collect(Collectors.toList());
    }

    public ReviewDto submitReview(ReviewRequest request) {
        User currentUser = getCurrentUser();
        Property property = propertyRepository.findById(request.getPropertyId())
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));

        Review review = new Review();
        review.setRenter(currentUser);
        review.setProperty(property);
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        review.setCreatedAt(LocalDateTime.now());

        Review savedReview = reviewRepository.save(review);
        return convertToReviewDto(savedReview);
    }

    public List<ReviewDto> getReviews() {
        User currentUser = getCurrentUser();
        List<Review> reviews = reviewRepository.findByRenterId(currentUser.getId());
        return reviews.stream()
                .map(this::convertToReviewDto)
                .collect(Collectors.toList());
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }

    private ApplicationDto convertToApplicationDto(Application application) {
        ApplicationDto dto = new ApplicationDto();
        dto.setId(application.getId());
        dto.setPropertyId(application.getProperty().getId());
        dto.setRenterId(application.getRenter().getId());
        dto.setMessage(application.getMessage());
        dto.setPreferredMoveInDate(application.getPreferredMoveInDate());
        dto.setStatus(application.getStatus());
        dto.setSubmittedAt(application.getSubmittedAt());
        return dto;
    }

    private BookingDto convertToBookingDto(Booking booking) {
        BookingDto dto = new BookingDto();
        dto.setId(booking.getId());
        dto.setPropertyId(booking.getProperty().getId());
        dto.setUserId(booking.getRenter().getId());
        dto.setBookingDate(booking.getBookingDate());
        dto.setCheckOutDate(booking.getCheckOutDate());
        dto.setStatus(booking.getStatus());
        dto.setSpecialRequests(booking.getSpecialRequests());
        return dto;
    }

    private TourDto convertToTourDto(Tour tour) {
        TourDto dto = new TourDto();
        dto.setId(tour.getId());
        dto.setPropertyId(tour.getProperty().getId());
        dto.setRenterId(tour.getRenter().getId());
        dto.setScheduledDate(tour.getScheduledDate());
        dto.setStatus(tour.getStatus());
        dto.setContactPhone(tour.getContactPhone());
        dto.setNotes(tour.getNotes());
        return dto;
    }

    private NegotiationDto convertToNegotiationDto(Negotiation negotiation) {
        NegotiationDto dto = new NegotiationDto();
        dto.setId(negotiation.getId());
        dto.setPropertyId(negotiation.getProperty().getId());
        dto.setRenterId(negotiation.getRenter().getId());
        dto.setLandlordId(negotiation.getLandlord().getId());
        dto.setStatus(negotiation.getStatus());
        dto.setProposedPrice(negotiation.getProposedPrice());
        dto.setMessage(negotiation.getMessage());
        dto.setCreatedAt(negotiation.getCreatedAt());
        return dto;
    }

    private ReviewDto convertToReviewDto(Review review) {
        ReviewDto dto = new ReviewDto();
        dto.setId(review.getId());
        dto.setPropertyId(review.getProperty().getId());
        dto.setRenterId(review.getRenter().getId());
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        dto.setCreatedAt(review.getCreatedAt());
        return dto;
    }
}