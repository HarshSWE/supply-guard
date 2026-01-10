package com.supplyguard.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.supplyguard.backend.model.SupplierRiskSnapshot;
import java.util.List;

public interface SupplierRiskSnapshotRepository extends JpaRepository<SupplierRiskSnapshot, Long> {
    List<SupplierRiskSnapshot> findBySupplierIdOrderBySnapshotDateAsc(Long supplierId);
}