package com.supplyguard.backend.dto;

import java.time.LocalDate;

public class SupplierTableDTO {

    private Long id;
    private String name;
    private String region;
    private String industry;
    private double riskScore;
    private LocalDate lastUpdated;

    public SupplierTableDTO(
            Long id,
            String name,
            String region,
            String industry,
            double riskScore,
            LocalDate lastUpdated
    ) {
        this.id = id;
        this.name = name;
        this.region = region;
        this.industry = industry;
        this.riskScore = riskScore;
        this.lastUpdated = lastUpdated;
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

    public double getRiskScore() {
        return riskScore;
    }

    public LocalDate getLastUpdated() {
        return lastUpdated;
    }
}
