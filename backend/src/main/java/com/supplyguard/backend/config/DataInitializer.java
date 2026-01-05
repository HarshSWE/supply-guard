package com.supplyguard.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.supplyguard.backend.model.Supplier;
import com.supplyguard.backend.model.Alert;
import com.supplyguard.backend.repository.SupplierRepository;
import com.supplyguard.backend.repository.AlertRepository;

@Configuration
public class DataInitializer {

  @Bean
  CommandLineRunner initData(
      SupplierRepository supplierRepo,
      AlertRepository alertRepo
  ) {
    return args -> {

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
    };
  }
}
