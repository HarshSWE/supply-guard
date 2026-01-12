package com.supplyguard.backend.service;

import org.springframework.stereotype.Service;

import com.supplyguard.backend.model.RiskThreshold;
import com.supplyguard.backend.repository.RiskThresholdRepository;

@Service
public class RiskThresholdService {

    private final RiskThresholdRepository repo;

    public RiskThresholdService(RiskThresholdRepository repo) {
        this.repo = repo;
    }

    public RiskThreshold getThresholds() {
        return repo.findAll()
                .stream()
                .findFirst()
                .orElseGet(() -> {
                    RiskThreshold defaults = new RiskThreshold();
                    defaults.setHigh(75);
                    defaults.setMedium(50);
                    return repo.save(defaults);
                });
    }

    public RiskThreshold updateThresholds(RiskThreshold updated) {
        RiskThreshold existing = getThresholds();
        existing.setHigh(updated.getHigh());
        existing.setMedium(updated.getMedium());
        return repo.save(existing);
    }
}
