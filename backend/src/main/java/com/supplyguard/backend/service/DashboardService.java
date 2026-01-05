package com.supplyguard.backend.service;

import org.springframework.stereotype.Service;

import com.supplyguard.backend.repository.AlertRepository;
import com.supplyguard.backend.repository.SupplierRepository;

@Service
public class DashboardService {

  private final SupplierRepository supplierRepository;
  private final AlertRepository alertRepository;

  private static final double HIGH_RISK_THRESHOLD = 70.0;

  public DashboardService(
      SupplierRepository supplierRepository,
      AlertRepository alertRepository
  ) {
    this.supplierRepository = supplierRepository;
    this.alertRepository = alertRepository;
  }

  public long getTotalSuppliers() {
    return supplierRepository.count();
  }

  public long getHighRiskSuppliers() {
    return supplierRepository.countByRiskScoreGreaterThanEqual(HIGH_RISK_THRESHOLD);
  }

  public double getAverageRiskScore() {
    return supplierRepository.findAll()
        .stream()
        .mapToDouble(s -> s.getRiskScore())
        .average()
        .orElse(0.0);
  }

  public long getActiveAlerts() {
    return alertRepository.countByActiveTrue();
  }
}

