package com.terrarent.backend.repository;

import com.terrarent.backend.entity.Booking;
import com.terrarent.backend.entity.Property;
import com.terrarent.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByRenter(User renter);

    List<Booking> findByProperty(Property property);

    List<Booking> findByLandlord(User landlord);

    List<Booking> findByRenterId(Long renterId);

    List<Booking> findByPropertyId(Long propertyId);

    List<Booking> findByPropertyLandlordId(Long landlordId);

    long countByRenterIdAndBookingDateAfter(Long renterId, LocalDateTime date);
}