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

  private Double latitude;
  private Double longitude;

  public Supplier() {}

  public Supplier(String name, double riskScore, String region, String industry, Double latitude, Double longitude) {
    this.name = name;
    this.riskScore = riskScore;
    this.region = region;
    this.industry = industry;
    this.latitude = latitude;
    this.longitude = longitude;
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

  public Double getLatitude(){
    return latitude;
  }

  public Double getLongitude(){
    return longitude;
  }

  public void setRegion(String region) {
    this.region = region;
  }

  public void setIndustry(String industry) {
    this.industry = industry;
  }
  
}

