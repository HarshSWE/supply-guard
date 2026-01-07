package com.supplyguard.backend.config;

import java.time.LocalDate;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.supplyguard.backend.model.Alert;
import com.supplyguard.backend.model.RiskSnapshot;
import com.supplyguard.backend.model.Supplier;
import com.supplyguard.backend.repository.AlertRepository;
import com.supplyguard.backend.repository.RiskSnapshotRepository;
import com.supplyguard.backend.repository.SupplierRepository;

@Configuration
public class DataInitializer {

  @Bean
  CommandLineRunner initData(
      SupplierRepository supplierRepo,
      AlertRepository alertRepo,
      RiskSnapshotRepository riskSnapshotRepo
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
    };
  }
}
