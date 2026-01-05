package com.supplyguard.backend.model;

import jakarta.persistence.*;

@Entity
public class Supplier {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;
  private double riskScore;
  private String region;
  private String industry;

  public Supplier() {}

  public Supplier(String name, double riskScore, String region, String industry) {
    this.name = name;
    this.riskScore = riskScore;
    this.region = region;
    this.industry = industry;
  }

  public double getRiskScore() {
    return riskScore;
  }

  public void setRiskScore(double riskScore) {
    this.riskScore = riskScore;
  }

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getRegion() {
    return region;
  }

  public String getIndustry() {
    return industry;
  }
}
