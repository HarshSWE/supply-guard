package com.supplyguard.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class SupplierRiskSnapshot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

    private int riskScore;
    private LocalDate snapshotDate;

    public SupplierRiskSnapshot() {}

    public SupplierRiskSnapshot(Supplier supplier, int riskScore, LocalDate snapshotDate) {
        this.supplier = supplier;
        this.riskScore = riskScore;
        this.snapshotDate = snapshotDate;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Supplier getSupplier() { return supplier; }
    public void setSupplier(Supplier supplier) { this.supplier = supplier; }
    
    public int getRiskScore() { return riskScore; }
    public void setRiskScore(int riskScore) { this.riskScore = riskScore; }
    
    public LocalDate getSnapshotDate() { return snapshotDate; }
    public void setSnapshotDate(LocalDate snapshotDate) { this.snapshotDate = snapshotDate; }
}