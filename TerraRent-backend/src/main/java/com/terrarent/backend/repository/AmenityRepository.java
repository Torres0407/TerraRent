package com.terrarent.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.terrarent.backend.entity.Amenity;

@Repository
public interface AmenityRepository extends JpaRepository<Amenity, Long> {
}