import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
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
export class OverviewComponent implements OnInit, AfterViewInit, OnDestroy {
  stats?: DashboardStats;
  riskTrend: RiskTrendPoint[] = [];
  alerts: Alert[] = [];
  filteredAlerts: Alert[] = [];

  selectedRegion: string = 'All';
  selectedIndustry: string = 'All';
  selectedRiskLevel: string = 'All';

  suppliers: any[] = [];
  map?: L.Map;
  private chart?: Chart;
  riskThresholds?: RiskThresholds;

  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef,
    private riskConfig: RiskConfigService
  ) {}

  ngOnInit(): void {
    this.loadDashboardStats();
    this.loadRiskTrend();
    this.loadAlerts();

    this.riskConfig.getThresholds().subscribe((t) => {
      if (t) {
        this.riskThresholds = t;
        this.cdr.detectChanges();
      }
    });
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

  applyFilters(): void {
    this.filteredAlerts = this.alerts.filter((alert) => {
      const matchesRegion =
        this.selectedRegion === 'All' || alert.supplier?.region === this.selectedRegion;

      const matchesIndustry =
        this.selectedIndustry === 'All' || alert.supplier?.industry === this.selectedIndustry;

      const matchesRisk =
        this.selectedRiskLevel === 'All' || alert.severity === this.selectedRiskLevel;

      return matchesRegion && matchesIndustry && matchesRisk;
    });
  }

  loadAlerts(): void {
    this.dashboardService.getAlerts().subscribe({
      next: (data) => {
        this.alerts = data;
        this.applyFilters();
        this.cdr.detectChanges();
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
    if (!this.riskThresholds) return '#16a34a';

    if (score >= this.riskThresholds.high) return '#dc2626';
    if (score >= this.riskThresholds.medium) return '#f59e0b';
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
