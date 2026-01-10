import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from '../overview/overview.component';
import { SuppliersComponent } from '../suppliers/suppliers.component';

type MenuKey = 'overview' | 'suppliers' | 'alerts' | 'admin';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, OverviewComponent, SuppliersComponent],
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent {
  selected: MenuKey = 'overview';

  menu: { key: MenuKey; label: string; icon: string }[] = [
    { key: 'overview', label: 'Overview', icon: 'dashboard' },
    { key: 'suppliers', label: 'Suppliers', icon: 'factory' },
    { key: 'admin', label: 'Admin', icon: 'settings' },
  ];

  select(key: MenuKey) {
    this.selected = key;
  }
}
