package com.terrarent.backend.repository;

import com.terrarent.backend.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByRenterId(Long renterId);
    long countByRenterIdAndStatus(Long renterId, String status);
}