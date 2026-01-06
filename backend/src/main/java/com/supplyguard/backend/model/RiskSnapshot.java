package com.supplyguard.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class RiskSnapshot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double averageRiskScore;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate snapshotDate;

    public RiskSnapshot(Double averageRiskScore, LocalDate snapshotDate) {
        this.averageRiskScore = averageRiskScore;
        this.snapshotDate = snapshotDate;
    }

    protected RiskSnapshot() {}

        public Long getId() {
        return id;
    }

    public Double getAverageRiskScore() {
        return averageRiskScore;
    }

    public LocalDate getSnapshotDate() {
        return snapshotDate;
    }
}
