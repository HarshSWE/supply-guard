package com.supplyguard.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supplyguard.backend.model.RiskSnapshot;

public interface RiskSnapshotRepository extends JpaRepository<RiskSnapshot, Long> {
    List<RiskSnapshot> findAllByOrderBySnapshotDateAsc();
}
