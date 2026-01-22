package com.terrarent.backend.repository;

import com.terrarent.backend.entity.SavedProperty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SavedPropertyRepository extends JpaRepository<SavedProperty, Long> {
    List<SavedProperty> findByRenterId(Long renterId);
    long countByRenterId(Long renterId);
    void deleteByRenterIdAndPropertyId(Long renterId, Long propertyId);
}