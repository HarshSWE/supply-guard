package com.supplyguard.backend.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.supplyguard.backend.service.RiskThresholdService;
import com.supplyguard.backend.model.RiskThreshold;

@RestController
@RequestMapping("/api/risk-thresholds")
@CrossOrigin(origins = "http://localhost:4200")
public class RiskThresholdController {

    private final RiskThresholdService service;

    public RiskThresholdController(RiskThresholdService service) {
        this.service = service;
    }

    @GetMapping
    public RiskThreshold getThresholds() {
        return service.getThresholds();
    }

    @PutMapping
    public RiskThreshold updateThresholds(@RequestBody RiskThreshold thresholds) {
        return service.updateThresholds(thresholds);
    }
}
