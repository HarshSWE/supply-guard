package com.supplyguard.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supplyguard.backend.dto.DashboardStatsDto;
import com.supplyguard.backend.service.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

  private final DashboardService dashboardService;

  public DashboardController(DashboardService dashboardService) {
    this.dashboardService = dashboardService;
  }

  @GetMapping("/stats")
  public DashboardStatsDto getDashboardStats() {

    long total = dashboardService.getTotalSuppliers();
    long highRisk = dashboardService.getHighRiskSuppliers();

    double highRiskPercentage =
        total == 0 ? 0 : (highRisk * 100.0) / total;

    return new DashboardStatsDto(
        total,
        highRisk,
        highRiskPercentage,
        dashboardService.getAverageRiskScore(),
        dashboardService.getActiveAlerts()
    );
  }
}
