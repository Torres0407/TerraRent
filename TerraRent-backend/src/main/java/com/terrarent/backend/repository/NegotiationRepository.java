package com.terrarent.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.terrarent.backend.entity.Negotiation;

@Repository
public interface NegotiationRepository extends JpaRepository<Negotiation, Long> {
    List<Negotiation> findByRenterId(Long renterId);
}