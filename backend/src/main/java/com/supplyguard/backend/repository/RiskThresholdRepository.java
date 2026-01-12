package com.supplyguard.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.supplyguard.backend.model.RiskThreshold;

@Repository
public interface RiskThresholdRepository
        extends JpaRepository<RiskThreshold, Long> {
}
