package com.supplyguard.backend.model;

import jakarta.persistence.*;

@Entity
public class RiskCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

    private int financialRisk;
    private int operationalRisk;
    private int complianceRisk;
    private int sentimentRisk;

    public RiskCategory() {}

    public RiskCategory(Supplier supplier, int financialRisk, int operationalRisk, 
                       int complianceRisk, int sentimentRisk) {
        this.supplier = supplier;
        this.financialRisk = financialRisk;
        this.operationalRisk = operationalRisk;
        this.complianceRisk = complianceRisk;
        this.sentimentRisk = sentimentRisk;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Supplier getSupplier() { return supplier; }
    public void setSupplier(Supplier supplier) { this.supplier = supplier; }
    
    public int getFinancialRisk() { return financialRisk; }
    public void setFinancialRisk(int financialRisk) { this.financialRisk = financialRisk; }
    
    public int getOperationalRisk() { return operationalRisk; }
    public void setOperationalRisk(int operationalRisk) { this.operationalRisk = operationalRisk; }
    
    public int getComplianceRisk() { return complianceRisk; }
    public void setComplianceRisk(int complianceRisk) { this.complianceRisk = complianceRisk; }
    
    public int getSentimentRisk() { return sentimentRisk; }
    public void setSentimentRisk(int sentimentRisk) { this.sentimentRisk = sentimentRisk; }
}