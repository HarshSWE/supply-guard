package com.supplyguard.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supplyguard.backend.dto.DashboardStatsDto;
import com.supplyguard.backend.model.RiskSnapshot;
import com.supplyguard.backend.repository.RiskSnapshotRepository;
import com.supplyguard.backend.service.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

  private final DashboardService dashboardService;
  private final RiskSnapshotRepository riskSnapshotRepo;

  public DashboardController(
      DashboardService dashboardService,
      RiskSnapshotRepository riskSnapshotRepo
  ) {
    this.dashboardService = dashboardService;
    this.riskSnapshotRepo = riskSnapshotRepo;
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

  @GetMapping("/risk-trend")
  public List<RiskSnapshot> getRiskTrend() {
    return riskSnapshotRepo.findAllByOrderBySnapshotDateAsc();
  }
}
