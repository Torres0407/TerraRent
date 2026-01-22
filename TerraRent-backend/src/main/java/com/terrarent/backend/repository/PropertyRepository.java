package com.terrarent.backend.repository;

import com.terrarent.backend.entity.Property;
import com.terrarent.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {

    List<Property> findByLandlord(User landlord);

    List<Property> findByAvailable(boolean available);

    List<Property> findByCityAndAvailable(String city, boolean available);
}