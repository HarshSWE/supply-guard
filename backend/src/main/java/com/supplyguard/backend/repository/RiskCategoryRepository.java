package com.supplyguard.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.supplyguard.backend.model.RiskCategory;

public interface RiskCategoryRepository extends JpaRepository<RiskCategory, Long> {
    RiskCategory findBySupplierId(Long supplierId);
}