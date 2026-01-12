package com.supplyguard.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Table(name = "risk_thresholds")
public class RiskThreshold {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int high = 75;
    private int medium = 50;


    public Long getId() {
        return id;
    }

    public int getHigh() {
        return high;
    }

    public int getMedium() {
        return medium;
    }


    public void setId(Long id) {
        this.id = id;
    }

    public void setHigh(int high) {
        this.high = high;
    }

    public void setMedium(int medium) {
        this.medium = medium;
    }
}
