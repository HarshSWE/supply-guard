import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from '../overview/overview.component';
import { SuppliersComponent } from '../suppliers/suppliers.component';
import { AdminComponent } from '../admin/admin.component';
import { RiskConfigService } from '../services/risk-config.service';

type MenuKey = 'overview' | 'suppliers' | 'alerts' | 'admin';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, OverviewComponent, SuppliersComponent, AdminComponent],
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent implements OnInit {
  selected: MenuKey = 'overview';

  menu: { key: MenuKey; label: string; icon: string }[] = [
    { key: 'overview', label: 'Overview', icon: 'dashboard' },
    { key: 'suppliers', label: 'Suppliers', icon: 'factory' },
    { key: 'admin', label: 'Admin', icon: 'settings' },
  ];

  constructor(private riskConfig: RiskConfigService) {}

  ngOnInit(): void {
    this.riskConfig.load();
  }

  select(key: MenuKey) {
    this.selected = key;
  }
}
