package com.supplyguard.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supplyguard.backend.model.Supplier;
import com.supplyguard.backend.repository.SupplierRepository;

@RestController
@RequestMapping("/api/suppliers")
public class SupplierController {

    private final SupplierRepository supplierRepo;

    public SupplierController(SupplierRepository supplierRepo) {
        this.supplierRepo = supplierRepo;
    }

    @GetMapping
    public List<Supplier> getSuppliers() {
        return supplierRepo.findAll();
    }
}
