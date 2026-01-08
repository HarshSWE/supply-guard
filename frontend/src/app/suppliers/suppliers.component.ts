import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './suppliers.component.html',
})
export class SuppliersComponent implements OnInit {
  suppliers: any[] = [];

  search = '';
  region = 'All';
  industry = 'All';
  riskLevel = 'All';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.dashboardService
      .getSupplierTable({
        search: this.search || undefined,
        region: this.region !== 'All' ? this.region : undefined,
        industry: this.industry !== 'All' ? this.industry : undefined,
        riskLevel: this.riskLevel !== 'All' ? this.riskLevel : undefined,
      })
      .subscribe({
        next: (data) => (this.suppliers = data),
        error: (err) => console.error('Failed to load suppliers', err),
      });
  }
}
