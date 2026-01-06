import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../services/dashboard.service';
import { DashboardStats } from '../models/dashboard-stats.model';
import { Chart } from 'chart.js/auto';
import { RiskTrendPoint } from '../models/risk-trend-point.model';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit, OnDestroy {
  stats?: DashboardStats;
  riskTrend: RiskTrendPoint[] = [];
  private chart?: Chart;

  constructor(private dashboardService: DashboardService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.dashboardService.getDashboardStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Failed to load dashboard stats', err),
    });

    this.dashboardService.getRiskTrend().subscribe({
      next: (data) => {
        this.riskTrend = data;
        this.cdr.detectChanges();
        this.renderChart();
      },
      error: (err) => console.error('Failed to load risk trend', err),
    });
  }

  renderChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('riskTrendChart', {
      type: 'line',
      data: {
        labels: this.riskTrend.map((p) => p.snapshotDate),
        datasets: [
          {
            label: 'Average Risk Score',
            data: this.riskTrend.map((p) => p.averageRiskScore),
            tension: 0.4,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            min: 0,
            max: 100,
          },
        },
      },
    });
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
