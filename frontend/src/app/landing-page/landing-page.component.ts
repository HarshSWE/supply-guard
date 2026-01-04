import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type MenuKey = 'overview' | 'suppliers' | 'alerts' | 'admin';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-page.component.html',
})
export class LandingPage {
  selected: MenuKey = 'overview';

  menu: { key: MenuKey; label: string; icon: string }[] = [
    { key: 'overview', label: 'Overview', icon: 'dashboard' },
    { key: 'suppliers', label: 'Suppliers', icon: 'factory' },
    { key: 'alerts', label: 'Alerts', icon: 'warning' },
    { key: 'admin', label: 'Admin', icon: 'settings' },
  ];

  select(key: MenuKey) {
    this.selected = key;
  }
}
