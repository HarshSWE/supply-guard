package com.supplyguard.backend.model;

import jakarta.persistence.*;

@Entity
public class Alert {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  private Supplier supplier;

  private String severity;

  private String message;

  private boolean active;

  public Alert() {}

  public Alert(Supplier supplier, String severity, String message, boolean active) {
    this.supplier = supplier;
    this.severity = severity;
    this.message = message;
    this.active = active;
  }

}
