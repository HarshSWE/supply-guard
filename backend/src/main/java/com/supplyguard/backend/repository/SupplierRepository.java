package com.supplyguard.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supplyguard.backend.model.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {

    long countByRiskScoreGreaterThanEqual(double riskScore);

}

