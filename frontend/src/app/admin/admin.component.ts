import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RiskConfigService } from '../services/risk-config.service';
import { RiskThresholds } from '../models/risk-thresholds.model';

import { AdminSupplierService } from '../services/admin-supplier.service';
import { Supplier } from '../models/supplier.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  thresholds!: RiskThresholds;
  saved = false;

  suppliers: Supplier[] = [];

  regions = ['North America', 'Europe', 'Asia', 'Africa', 'South America'];

  industries = [
    'Manufacturing',
    'Logistics',
    'Technology',
    'Mining',
    'Pharmaceuticals',
    'Food Processing',
  ];

  constructor(
    private riskConfig: RiskConfigService,
    private supplierService: AdminSupplierService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.riskConfig.getThresholds().subscribe((t) => {
      if (t) this.thresholds = { ...t };
    });

    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe((data) => {
      this.suppliers = data;
      this.cdr.detectChanges();
    });
  }

  saveSupplier(supplier: Supplier): void {
    this.supplierService.updateSupplier(supplier).subscribe((updated) => {
      Object.assign(supplier, updated);
    });
  }

  save(): void {
    this.riskConfig.updateThresholds(this.thresholds);

    this.saved = true;
    setTimeout(() => {
      this.saved = false;
      this.cdr.detectChanges();
    }, 2000);
  }
}
