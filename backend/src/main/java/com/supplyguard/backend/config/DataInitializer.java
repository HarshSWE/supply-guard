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

      if (supplierRepo.count() > 0) {
          return; 
      }

      Supplier s1 = new Supplier("Acme Corp", 85, "North America", "Manufacturing");
      Supplier s2 = new Supplier("Globex", 45, "Europe", "Logistics");
      Supplier s3 = new Supplier("Initech", 72, "Asia", "Technology");

      supplierRepo.save(s1);
      supplierRepo.save(s2);
      supplierRepo.save(s3);

      Alert a1 = new Alert(s1, "CRITICAL", "Risk score exceeded threshold", true);
      Alert a2 = new Alert(s3, "MODERATE", "Negative sentiment detected", true);

      alertRepo.save(a1);
      alertRepo.save(a2);

      riskSnapshotRepo.saveAll(List.of(
          new RiskSnapshot(60.2, LocalDate.now().minusDays(4)),
          new RiskSnapshot(61.8, LocalDate.now().minusDays(3)),
          new RiskSnapshot(63.1, LocalDate.now().minusDays(2)),
          new RiskSnapshot(62.5, LocalDate.now().minusDays(1)),
          new RiskSnapshot(64.0, LocalDate.now())
      ));
    };

  }
}
