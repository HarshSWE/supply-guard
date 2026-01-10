package com.supplyguard.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

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

  @Column(nullable = false, updatable = false)
  private LocalDateTime createdAt;

  public Alert() {}

  public Alert(Supplier supplier, String severity, String message, boolean active) {
    this.supplier = supplier;
    this.severity = severity;
    this.message = message;
    this.active = active;
  }

  @PrePersist
  protected void onCreate() {
    this.createdAt = LocalDateTime.now();
  }

  public Long getId() {
    return id;
  }

  public Supplier getSupplier() {
    return supplier;
  }

  public String getSeverity() {
    return severity;
  }

  public String getMessage() {
    return message;
  }

  public boolean isActive() {
    return active;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }
}
