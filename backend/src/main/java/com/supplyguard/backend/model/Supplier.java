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

}
