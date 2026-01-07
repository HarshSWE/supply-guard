import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../services/dashboard.service';
import { DashboardStats } from '../models/dashboard-stats.model';
import { RiskTrendPoint } from '../models/risk-trend-point.model';
import { Alert } from '../models/alert.model';
import { Chart } from 'chart.js/auto';
import * as L from 'leaflet';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit, AfterViewInit, OnDestroy {
  stats?: DashboardStats;
  riskTrend: RiskTrendPoint[] = [];
  alerts: Alert[] = [];

  suppliers: any[] = [];
  map?: L.Map;
  private chart?: Chart;

  constructor(private dashboardService: DashboardService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadDashboardStats();
    this.loadRiskTrend();
    this.loadAlerts();
  }

  ngAfterViewInit(): void {
    this.loadSuppliers();
  }

  loadDashboardStats(): void {
    this.dashboardService.getDashboardStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Failed to load dashboard stats', err),
    });
  }

  loadRiskTrend(): void {
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

  loadAlerts(): void {
    this.dashboardService.getAlerts().subscribe({
      next: (data) => {
        this.alerts = data;
      },
      error: (err) => console.error('Failed to load alerts', err),
    });
  }

  loadSuppliers(): void {
    this.dashboardService.getSuppliers().subscribe({
      next: (data) => {
        this.suppliers = data;
        this.initMap();
      },
      error: (err) => console.error('Failed to load suppliers', err),
    });
  }

  initMap(): void {
    if (this.map) {
      this.map.remove();
    }

    this.map = L.map('supplierMap').setView([20, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    this.suppliers.forEach((supplier) => {
      if (!supplier.latitude || !supplier.longitude) return;

      const color = this.getRiskColor(supplier.riskScore);

      const marker = L.circleMarker([supplier.latitude, supplier.longitude], {
        radius: 8,
        color,
        fillColor: color,
        fillOpacity: 0.8,
      });

      marker.bindPopup(`
        <strong>${supplier.name}</strong><br/>
        Risk Score: ${supplier.riskScore}<br/>
        ${supplier.region}
      `);

      marker.addTo(this.map!);
    });
  }

  getRiskColor(score: number): string {
    if (score >= 75) return '#dc2626';
    if (score >= 50) return '#f59e0b';
    return '#16a34a';
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.map) {
      this.map.remove();
    }
  }
}
