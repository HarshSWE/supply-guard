package com.supplyguard.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supplyguard.backend.model.Alert;

public interface AlertRepository extends JpaRepository<Alert, Long> {}
