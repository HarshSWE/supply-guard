package com.supplyguard.backend.dto;

public class SupplierDetailsDTO {

    private Long id;
    private String name;
    private String industry;
    private String region;
    private double riskScore;

    public SupplierDetailsDTO(
            Long id,
            String name,
            String industry,
            String region,
            double riskScore
    ) {
        this.id = id;
        this.name = name;
        this.industry = industry;
        this.region = region;
        this.riskScore = riskScore;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getIndustry() { return industry; }
    public String getRegion() { return region; }
    public double getRiskScore() { return riskScore; }
}
