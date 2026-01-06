import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../services/dashboard.service';
import { DashboardStats } from '../models/dashboard-stats.model';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit {
  stats?: DashboardStats;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getDashboardStats().subscribe({
      next: (data) => (this.stats = data),
      error: (err) => console.error('Failed to load dashboard stats', err),
    });
  }
}
