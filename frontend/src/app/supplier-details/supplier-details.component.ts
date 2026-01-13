import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { Chart } from 'chart.js/auto';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { RiskConfigService } from '../services/risk-config.service';
import { RiskThresholds } from '../models/risk-thresholds.model';

@Component({
  selector: 'app-supplier-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supplier-details.component.html',
})
export class SupplierDetailsComponent implements OnInit, OnDestroy {
  supplier = signal<any | null>(null);
  alerts = signal<any[]>([]);
  news = signal<any[]>([]);
  riskThresholds = signal<RiskThresholds | null>(null);

  private trendChart?: Chart;
  private categoryChart?: Chart;

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private riskConfig: RiskConfigService
  ) {}

  ngOnInit(): void {
    const supplierId = this.route.snapshot.paramMap.get('id');

    if (supplierId) {
      const id = +supplierId;
      this.loadSupplier(id);
      this.loadRiskTrend(id);
      this.loadRiskCategories(id);
      this.loadAlerts(id);
      this.loadNews(id);
    }

    this.riskConfig.getThresholds().subscribe((t) => {
      if (t) {
        this.riskThresholds.set(t);
      }
    });
  }

  loadSupplier(id: number): void {
    this.dashboardService.getSupplierById(id).subscribe({
      next: (data) => this.supplier.set(data),
      error: (err) => console.error('Failed to load supplier', err),
    });
  }

  loadRiskTrend(id: number): void {
    this.dashboardService.getSupplierRiskTrend(id).subscribe({
      next: (data) => this.renderTrendChart(data),
      error: (err) => console.error('Failed to load risk trend', err),
    });
  }

  loadRiskCategories(id: number): void {
    this.dashboardService.getSupplierRiskCategories(id).subscribe({
      next: (data) => this.renderCategoryChart(data),
      error: (err) => console.error('Failed to load risk categories', err),
    });
  }

  loadAlerts(id: number): void {
    this.dashboardService.getSupplierAlerts(id).subscribe({
      next: (data) => this.alerts.set(data),
      error: (err) => console.error('Failed to load alerts', err),
    });
  }

  loadNews(id: number): void {
    this.dashboardService.getSupplierNews(id).subscribe({
      next: (data) => this.news.set(data.articles || []),
      error: (err) => console.error('Failed to load news', err),
    });
  }

  renderTrendChart(data: any[]): void {
    if (this.trendChart) {
      this.trendChart.destroy();
    }

    this.trendChart = new Chart('riskTrendChart', {
      type: 'line',
      data: {
        labels: data.map((d) => d.snapshotDate),
        datasets: [
          {
            label: 'Risk Score',
            data: data.map((d) => d.riskScore),
            borderColor: 'rgb(239, 68, 68)',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { min: 0, max: 100 },
        },
      },
    });
  }

  renderCategoryChart(data: any): void {
    if (this.categoryChart) {
      this.categoryChart.destroy();
    }

    this.categoryChart = new Chart('riskCategoryChart', {
      type: 'bar',
      data: {
        labels: ['Financial', 'Operational', 'Compliance', 'Sentiment'],
        datasets: [
          {
            label: 'Risk Score',
            data: [
              data.financialRisk,
              data.operationalRisk,
              data.complianceRisk,
              data.sentimentRisk,
            ],
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',
              'rgba(251, 146, 60, 0.8)',
              'rgba(239, 68, 68, 0.8)',
              'rgba(168, 85, 247, 0.8)',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { min: 0, max: 100 },
        },
      },
    });
  }

  private getChartImage(chartId: string): string | null {
    const canvas = document.getElementById(chartId) as HTMLCanvasElement | null;
    return canvas ? canvas.toDataURL('image/png', 1.0) : null;
  }

  exportPDF(): void {
    const supplier = this.supplier();
    if (!supplier) return;

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(`${supplier.name} — Risk Report`, 14, 20);

    doc.setFontSize(11);
    doc.text(`Industry: ${supplier.industry}`, 14, 30);
    doc.text(`Region: ${supplier.region}`, 14, 36);
    doc.text(`Risk Score: ${supplier.riskScore}`, 14, 42);

    let currentY = 52;

    const trendImg = this.getChartImage('riskTrendChart');
    if (trendImg) {
      doc.text('Risk Trend Over Time', 14, currentY);
      currentY += 4;
      doc.addImage(trendImg, 'PNG', 14, currentY, 180, 70);
      currentY += 80;
    }

    const categoryImg = this.getChartImage('riskCategoryChart');
    if (categoryImg) {
      doc.text('Risk by Category', 14, currentY);
      currentY += 4;
      doc.addImage(categoryImg, 'PNG', 14, currentY, 180, 70);
      currentY += 80;
    }

    autoTable(doc, {
      startY: currentY,
      head: [['Severity', 'Message']],
      body: this.alerts().map((a) => [a.severity, a.message]),
    });

    doc.save(`${supplier.name}-risk-report.pdf`);
  }

  exportCSV(): void {
    const supplier = this.supplier();
    if (!supplier) return;

    const rows: any[] = [
      ['Supplier Risk Report'],
      [],
      ['Supplier Name', supplier.name],
      ['Industry', supplier.industry],
      ['Region', supplier.region],
      ['Risk Score', supplier.riskScore],
    ];

    const csvContent = rows
      .map((row) => row.map((v: any) => `"${String(v ?? '').replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${supplier.name}-risk-report.csv`;
    link.click();

    URL.revokeObjectURL(url);
  }

  getRiskBadgeClasses(): string {
    const supplier = this.supplier();
    const thresholds = this.riskThresholds();

    if (!supplier || !thresholds) return 'bg-green-100 text-green-700';

    const score = supplier.riskScore;
    if (score >= thresholds.high) return 'bg-red-100 text-red-700';
    if (score >= thresholds.medium) return 'bg-amber-100 text-amber-700';
    return 'bg-green-100 text-green-700';
  }

  ngOnDestroy(): void {
    this.trendChart?.destroy();
    this.categoryChart?.destroy();
  }
}
