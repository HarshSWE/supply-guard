import { Component, OnInit, signal } from '@angular/core';
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
  thresholds = signal<RiskThresholds | null>(null);
  saved = signal(false);
  suppliers = signal<Supplier[]>([]);

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
    private supplierService: AdminSupplierService
  ) {}

  ngOnInit(): void {
    this.riskConfig.getThresholds().subscribe((t) => {
      if (t) {
        this.thresholds.set({ ...t });
      }
    });

    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe((data) => {
      this.suppliers.set(data);
    });
  }

  saveSupplier(supplier: Supplier): void {
    this.supplierService.updateSupplier(supplier).subscribe((updated) => {
      this.suppliers.update((list) => list.map((s) => (s.id === updated.id ? updated : s)));
    });
  }

  save(): void {
    const current = this.thresholds();
    if (!current) return;

    this.riskConfig.updateThresholds(current);

    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 2000);
  }
}
