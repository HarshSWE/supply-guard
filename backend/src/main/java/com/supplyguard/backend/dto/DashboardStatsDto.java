package com.supplyguard.backend.dto;

public class DashboardStatsDto {

  private long totalSuppliers;
  private long highRiskSuppliers;
  private double highRiskPercentage;
  private double averageRiskScore;
  private long activeAlerts;

  public DashboardStatsDto(
      long totalSuppliers,
      long highRiskSuppliers,
      double highRiskPercentage,
      double averageRiskScore,
      long activeAlerts
  ) {
    this.totalSuppliers = totalSuppliers;
    this.highRiskSuppliers = highRiskSuppliers;
    this.highRiskPercentage = highRiskPercentage;
    this.averageRiskScore = averageRiskScore;
    this.activeAlerts = activeAlerts;
  }

  public long getTotalSuppliers() {
    return totalSuppliers;
  }

  public long getHighRiskSuppliers() {
    return highRiskSuppliers;
  }

  public double getHighRiskPercentage() {
    return highRiskPercentage;
  }

  public double getAverageRiskScore() {
    return averageRiskScore;
  }

  public long getActiveAlerts() {
    return activeAlerts;
  }
  
}
