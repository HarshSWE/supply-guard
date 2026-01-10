package com.supplyguard.backend.controller;

import com.supplyguard.backend.model.Alert;
import com.supplyguard.backend.model.RiskCategory;
import com.supplyguard.backend.model.Supplier;
import com.supplyguard.backend.model.SupplierRiskSnapshot;

import com.supplyguard.backend.repository.AlertRepository;
import com.supplyguard.backend.repository.RiskCategoryRepository;
import com.supplyguard.backend.repository.SupplierRepository;
import com.supplyguard.backend.repository.SupplierRiskSnapshotRepository;

import com.supplyguard.backend.service.NewsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/suppliers")
@CrossOrigin(origins = "http://localhost:4200")
public class SupplierDetailsController {

    @Autowired
    private RiskCategoryRepository riskCategoryRepo;

    @Autowired
    private SupplierRiskSnapshotRepository supplierRiskSnapshotRepo;

    @Autowired
    private AlertRepository alertRepo;

    @Autowired
    private SupplierRepository supplierRepo;

    @Autowired
    private NewsService newsService;

    @GetMapping("/{id}/risk-categories")
    public RiskCategory getRiskCategories(@PathVariable Long id) {
        return riskCategoryRepo.findBySupplierId(id);
    }

    @GetMapping("/{id}/risk-trend")
    public List<SupplierRiskSnapshot> getRiskTrend(@PathVariable Long id) {
        return supplierRiskSnapshotRepo.findBySupplierIdOrderBySnapshotDateAsc(id);
    }

    @GetMapping("/{id}/alerts")
    public List<Alert> getSupplierAlerts(@PathVariable Long id) {
        return alertRepo.findBySupplierIdOrderByCreatedAtDesc(id);
    }

    @GetMapping("/{id}/news")
    public Map<String, Object> getSupplierNews(@PathVariable Long id) {
        Supplier supplier = supplierRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Supplier not found"));

        return newsService.getSupplierNews(supplier.getName());
    }
}
