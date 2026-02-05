import { Component, OnInit, OnDestroy, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../services/dashboard.service';
import { DashboardStats } from '../models/dashboard-stats.model';
import { RiskTrendPoint } from '../models/risk-trend-point.model';
import { Alert } from '../models/alert.model';
import { Chart } from 'chart.js/auto';
import * as L from 'leaflet';
import { FormsModule } from '@angular/forms';
import { RiskConfigService } from '../services/risk-config.service';
import { RiskThresholds } from '../models/risk-thresholds.model';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit, OnDestroy {
  stats = signal<DashboardStats | null>(null);
  riskTrend = signal<RiskTrendPoint[]>([]);

  alerts = signal<Alert[]>([]);
  filteredAlerts = signal<Alert[]>([]);

  selectedRegion = signal<string>('All');
  selectedIndustry = signal<string>('All');
  selectedRiskLevel = signal<string>('All');

  suppliers = signal<any[]>([]);
  map?: L.Map;
  private chart?: Chart;
  riskThresholds = signal<RiskThresholds | null>(null);

  constructor(private dashboardService: DashboardService, private riskConfig: RiskConfigService) {
    effect(() => {
      const trend = this.riskTrend();
      if (trend.length > 0) {
        this.renderChart(trend);
      }
    });

    effect(() => {
      const thresholds = this.riskThresholds();
      const suppliers = this.suppliers();
      
      if (thresholds && suppliers.length > 0) {
        setTimeout(() => this.initMap(), 0);
      }
    });
  }

  ngOnInit(): void {
    this.loadDashboardStats();
    this.loadRiskTrend();
    this.loadAlerts();
    this.loadSuppliers();

    this.riskConfig.getThresholds().subscribe((t) => {
      if (t) {
        this.riskThresholds.set(t);
      }
    });
  }

  loadDashboardStats(): void {
    this.dashboardService.getDashboardStats().subscribe({
      next: (data) => this.stats.set(data),
      error: (err) => console.error('Failed to load dashboard stats', err),
    });
  }

  loadRiskTrend(): void {
    this.dashboardService.getRiskTrend().subscribe({
      next: (data) => this.riskTrend.set(data),
      error: (err) => console.error('Failed to load risk trend', err),
    });
  }

  loadAlerts(): void {
    this.dashboardService.getAlerts().subscribe({
      next: (data) => {
        this.alerts.set(data);
        this.applyFilters();
      },
      error: (err) => console.error('Failed to load alerts', err),
    });
  }

  loadSuppliers(): void {
    this.dashboardService.getSuppliers().subscribe({
      next: (data) => {
        this.suppliers.set(data);
      },
      error: (err) => console.error('Failed to load suppliers', err),
    });
  }

  applyFilters(): void {
    const alerts = this.alerts();
    this.filteredAlerts.set(
      alerts.filter((alert) => {
        const matchesRegion =
          this.selectedRegion() === 'All' || alert.supplier?.region === this.selectedRegion();
        const matchesIndustry =
          this.selectedIndustry() === 'All' || alert.supplier?.industry === this.selectedIndustry();
        const matchesRisk =
          this.selectedRiskLevel() === 'All' || alert.severity === this.selectedRiskLevel();
        return matchesRegion && matchesIndustry && matchesRisk;
      })
    );
  }

  renderChart(data: RiskTrendPoint[]): void {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('riskTrendChart', {
      type: 'line',
      data: {
        labels: data.map((p) => p.snapshotDate),
        datasets: [
          {
            label: 'Average Risk Score',
            data: data.map((p) => p.averageRiskScore),
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

  initMap(): void {
    if (this.map) {
      this.map.remove();
    }

    const mapContainer = document.getElementById('supplierMap');
    if (!mapContainer) {
      console.warn('Map container not found');
      return;
    }

    this.map = L.map('supplierMap').setView([20, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    this.suppliers().forEach((supplier) => {
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
    const thresholds = this.riskThresholds();
    if (!thresholds) return '#16a34a';
    if (score >= thresholds.high) return '#dc2626';
    if (score >= thresholds.medium) return '#f59e0b';
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
