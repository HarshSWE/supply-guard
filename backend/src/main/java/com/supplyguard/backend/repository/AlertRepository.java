package com.supplyguard.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.supplyguard.backend.model.Alert;
import java.util.List;

public interface AlertRepository extends JpaRepository<Alert, Long> {
    long countByActiveTrue();
    List<Alert> findBySupplierIdOrderByCreatedAtDesc(Long supplierId);
}