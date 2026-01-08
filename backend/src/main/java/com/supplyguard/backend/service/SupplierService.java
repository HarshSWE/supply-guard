package com.supplyguard.backend.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.supplyguard.backend.dto.SupplierTableDTO;
import com.supplyguard.backend.model.Supplier;
import com.supplyguard.backend.repository.SupplierRepository;

@Service
public class SupplierService {

    private final SupplierRepository supplierRepo;

    public SupplierService(SupplierRepository supplierRepo) {
        this.supplierRepo = supplierRepo;
    }

    public List<SupplierTableDTO> getFilteredSuppliers(
            String search,
            String region,
            String industry,
            String riskLevel
    ) {
        return supplierRepo.findAll()
                .stream()
                .filter(s -> matchesSearch(s, search))
                .filter(s -> matchesRegion(s, region))
                .filter(s -> matchesIndustry(s, industry))
                .filter(s -> matchesRiskLevel(s, riskLevel))
                .map(this::toTableDTO)
                .collect(Collectors.toList());
    }


    private boolean matchesSearch(Supplier s, String search) {
        if (search == null || search.isBlank()) return true;
        return s.getName().toLowerCase().contains(search.toLowerCase());
    }

    private boolean matchesRegion(Supplier s, String region) {
        if (region == null || region.isBlank()) return true;
        return region.equalsIgnoreCase(s.getRegion()); 
    }

    private boolean matchesIndustry(Supplier s, String industry) {
        if (industry == null || industry.isBlank()) return true;
        return industry.equalsIgnoreCase(s.getIndustry());
    }

    private boolean matchesRiskLevel(Supplier s, String riskLevel) {
        if (riskLevel == null || riskLevel.isBlank()) return true;

        double risk = s.getRiskScore();

        return switch (riskLevel.toLowerCase()) {
            case "low" -> risk < 40;
            case "medium" -> risk >= 40 && risk < 70;
            case "high" -> risk >= 70;
            default -> true;
        };
    }


    private SupplierTableDTO toTableDTO(Supplier s) {
        return new SupplierTableDTO(
                s.getId(),
                s.getName(),
                s.getRegion(),        
                s.getIndustry(),
                s.getRiskScore(),
                LocalDate.now()      
        );
    }
}
