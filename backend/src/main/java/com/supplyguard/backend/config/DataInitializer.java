package com.supplyguard.backend.config;

import java.time.LocalDate;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.supplyguard.backend.model.*;
import com.supplyguard.backend.repository.*;

@Configuration
public class DataInitializer {

  @Bean
  CommandLineRunner initData(
      SupplierRepository supplierRepo,
      AlertRepository alertRepo,
      RiskSnapshotRepository riskSnapshotRepo,
      RiskCategoryRepository riskCategoryRepo,
      SupplierRiskSnapshotRepository supplierRiskSnapshotRepo
  ) {
    return args -> {

      Supplier s1 = new Supplier(
          "Acme Corp", 85, "North America", "Manufacturing",
          43.6532, -79.3832
      );

      Supplier s2 = new Supplier(
          "Globex", 45, "Europe", "Logistics",
          48.8566, 2.3522
      );

      Supplier s3 = new Supplier(
          "Initech", 72, "Asia", "Technology",
          35.6895, 139.6917
      );

      Supplier s4 = new Supplier(
          "Umbrella Group", 91, "Europe", "Pharmaceuticals",
          51.5074, -0.1278
      );

      Supplier s5 = new Supplier(
          "Soylent Industries", 33, "North America", "Food Processing",
          34.0522, -118.2437
      );

      Supplier s6 = new Supplier(
          "Nile Freight", 58, "Africa", "Transportation",
          30.0444, 31.2357
      );

      Supplier s7 = new Supplier(
          "Andes Mining Co", 67, "South America", "Mining",
          -33.4489, -70.6693
      );

      supplierRepo.saveAll(List.of(s1, s2, s3, s4, s5, s6, s7));

      alertRepo.saveAll(List.of(
          new Alert(s1, "CRITICAL", "Risk score exceeded critical threshold", true),
          new Alert(s3, "MODERATE", "Negative sentiment detected in news sources", true),
          new Alert(s4, "CRITICAL", "Regulatory compliance violation reported", true),
          new Alert(s6, "LOW", "Minor delivery delays observed", true),
          new Alert(s7, "MODERATE", "Environmental risk exposure increased", true)
      ));

      riskSnapshotRepo.saveAll(List.of(
          new RiskSnapshot(58.4, LocalDate.now().minusDays(30)),
          new RiskSnapshot(59.1, LocalDate.now().minusDays(25)),
          new RiskSnapshot(60.8, LocalDate.now().minusDays(20)),
          new RiskSnapshot(62.0, LocalDate.now().minusDays(15)),
          new RiskSnapshot(61.3, LocalDate.now().minusDays(12)),
          new RiskSnapshot(63.7, LocalDate.now().minusDays(9)),
          new RiskSnapshot(64.9, LocalDate.now().minusDays(6)),
          new RiskSnapshot(66.2, LocalDate.now().minusDays(3)),
          new RiskSnapshot(65.4, LocalDate.now())
      ));

      riskCategoryRepo.saveAll(List.of(
          new RiskCategory(s1, 88, 82, 90, 80),  
          new RiskCategory(s2, 40, 50, 45, 42), 
          new RiskCategory(s3, 65, 75, 70, 78),  
          new RiskCategory(s4, 95, 88, 92, 89),  
          new RiskCategory(s5, 30, 35, 32, 36),  
          new RiskCategory(s6, 55, 60, 58, 59),
          new RiskCategory(s7, 70, 65, 68, 64)   
      ));

      supplierRiskSnapshotRepo.saveAll(List.of(
          new SupplierRiskSnapshot(s1, 78, LocalDate.now().minusDays(30)),
          new SupplierRiskSnapshot(s1, 80, LocalDate.now().minusDays(25)),
          new SupplierRiskSnapshot(s1, 82, LocalDate.now().minusDays(20)),
          new SupplierRiskSnapshot(s1, 84, LocalDate.now().minusDays(15)),
          new SupplierRiskSnapshot(s1, 85, LocalDate.now().minusDays(10)),
          new SupplierRiskSnapshot(s1, 87, LocalDate.now().minusDays(5)),
          new SupplierRiskSnapshot(s1, 85, LocalDate.now())
      ));

      supplierRiskSnapshotRepo.saveAll(List.of(
          new SupplierRiskSnapshot(s3, 65, LocalDate.now().minusDays(30)),
          new SupplierRiskSnapshot(s3, 67, LocalDate.now().minusDays(25)),
          new SupplierRiskSnapshot(s3, 70, LocalDate.now().minusDays(20)),
          new SupplierRiskSnapshot(s3, 71, LocalDate.now().minusDays(15)),
          new SupplierRiskSnapshot(s3, 73, LocalDate.now().minusDays(10)),
          new SupplierRiskSnapshot(s3, 72, LocalDate.now().minusDays(5)),
          new SupplierRiskSnapshot(s3, 72, LocalDate.now())
      ));

    };
  }
}