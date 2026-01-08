package com.supplyguard.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.supplyguard.backend.dto.SupplierTableDTO;
import com.supplyguard.backend.model.Supplier;
import com.supplyguard.backend.repository.SupplierRepository;
import com.supplyguard.backend.service.SupplierService;

@RestController
@RequestMapping("/api/suppliers")
public class SupplierController {

    private final SupplierRepository supplierRepo;
    private final SupplierService supplierService;

    public SupplierController(
            SupplierRepository supplierRepo,
            SupplierService supplierService
    ) {
        this.supplierRepo = supplierRepo;
        this.supplierService = supplierService;
    }

    @GetMapping
    public List<Supplier> getSuppliers() {
        return supplierRepo.findAll();
    }

    @GetMapping("/table")
    public List<SupplierTableDTO> getSupplierTable(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String industry,
            @RequestParam(required = false) String riskLevel
    ) {
        return supplierService.getFilteredSuppliers(
                search,
                region,
                industry,
                riskLevel
        );
    }
}
