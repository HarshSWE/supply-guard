package com.supplyguard.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supplyguard.backend.model.Alert;
import com.supplyguard.backend.repository.AlertRepository;

@RestController
@RequestMapping("/api/alerts")
public class AlertController {

  private final AlertRepository alertRepo;

  public AlertController(AlertRepository alertRepo) {
    this.alertRepo = alertRepo;
  }

  @GetMapping
  public List<Alert> getRecentAlerts() {
    return alertRepo.findAll();
  }
}
