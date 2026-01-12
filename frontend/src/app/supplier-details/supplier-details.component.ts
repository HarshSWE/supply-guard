import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
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
  supplier: any;
  alerts: any[] = [];
  news: any[] = [];
  private trendChart?: Chart;
  private categoryChart?: Chart;
  riskThresholds?: RiskThresholds;

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private riskConfig: RiskConfigService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const supplierId = this.route.snapshot.paramMap.get('id');
    if (supplierId) {
      this.loadSupplier(+supplierId);
      this.loadRiskTrend(+supplierId);
      this.loadRiskCategories(+supplierId);
      this.loadAlerts(+supplierId);
      this.loadNews(+supplierId);
    }
    this.riskConfig.getThresholds().subscribe((t) => {
      if (t) {
        this.riskThresholds = t;
        this.cdr.detectChanges();
      }
    });
  }

  loadSupplier(id: number): void {
    this.dashboardService.getSupplierById(id).subscribe({
      next: (data) => {
        this.supplier = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Failed to load supplier', err),
    });
  }

  loadRiskTrend(id: number): void {
    this.dashboardService.getSupplierRiskTrend(id).subscribe({
      next: (data) => {
        this.renderTrendChart(data);
      },
      error: (err) => console.error('Failed to load risk trend', err),
    });
  }

  loadRiskCategories(id: number): void {
    this.dashboardService.getSupplierRiskCategories(id).subscribe({
      next: (data) => {
        this.renderCategoryChart(data);
      },
      error: (err) => console.error('Failed to load risk categories', err),
    });
  }

  loadAlerts(id: number): void {
    this.dashboardService.getSupplierAlerts(id).subscribe({
      next: (data) => {
        this.alerts = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Failed to load alerts', err),
    });
  }

  loadNews(id: number): void {
    this.dashboardService.getSupplierNews(id).subscribe({
      next: (data) => {
        this.news = data.articles || [];
        this.cdr.detectChanges();
      },
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
          y: {
            min: 0,
            max: 100,
          },
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
          y: {
            min: 0,
            max: 100,
          },
        },
      },
    });
  }

  private getChartImage(chartId: string): string | null {
    const canvas = document.getElementById(chartId) as HTMLCanvasElement | null;
    if (!canvas) return null;
    return canvas.toDataURL('image/png', 1.0);
  }

  exportPDF(): void {
    if (!this.supplier) return;

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(`${this.supplier.name} — Risk Report`, 14, 20);

    doc.setFontSize(11);
    doc.text(`Industry: ${this.supplier.industry}`, 14, 30);
    doc.text(`Region: ${this.supplier.region}`, 14, 36);
    doc.text(`Risk Score: ${this.supplier.riskScore}`, 14, 42);

    let currentY = 52;

    const trendImg = this.getChartImage('riskTrendChart');
    if (trendImg) {
      doc.setFontSize(12);
      doc.text('Risk Trend Over Time', 14, currentY);
      currentY += 4;

      doc.addImage(trendImg, 'PNG', 14, currentY, 180, 70);
      currentY += 80;
    }

    const categoryImg = this.getChartImage('riskCategoryChart');
    if (categoryImg) {
      doc.setFontSize(12);
      doc.text('Risk by Category', 14, currentY);
      currentY += 4;

      doc.addImage(categoryImg, 'PNG', 14, currentY, 180, 70);
      currentY += 80;
    }

    autoTable(doc, {
      startY: currentY,
      head: [['Severity', 'Message']],
      body: this.alerts.map((a) => [a.severity, a.message]),
    });

    doc.save(`${this.supplier.name}-risk-report.pdf`);
  }

  exportCSV(): void {
    if (!this.supplier) return;

    const rows: any[] = [];

    rows.push(['Supplier Risk Report']);
    rows.push([]);
    rows.push(['Supplier Name', this.supplier.name]);
    rows.push(['Industry', this.supplier.industry]);
    rows.push(['Region', this.supplier.region]);
    rows.push(['Risk Score', this.supplier.riskScore]);

    rows.push([]);
    rows.push(['Risk Trend Over Time']);
    rows.push(['Date', 'Risk Score']);

    if (this.trendChart) {
      const labels = this.trendChart.data.labels as string[];
      const data = this.trendChart.data.datasets[0].data as number[];

      labels.forEach((date, i) => {
        rows.push([date, data[i]]);
      });
    }

    rows.push([]);
    rows.push(['Risk by Category']);
    rows.push(['Category', 'Risk Score']);

    if (this.categoryChart) {
      const labels = this.categoryChart.data.labels as string[];
      const data = this.categoryChart.data.datasets[0].data as number[];

      labels.forEach((label, i) => {
        rows.push([label, data[i]]);
      });
    }

    rows.push([]);
    rows.push(['Alerts']);
    rows.push(['Severity', 'Message']);

    this.alerts.forEach((alert) => {
      rows.push([alert.severity, alert.message]);
    });

    const csvContent = rows
      .map((row) =>
        row.map((value: any) => `"${String(value ?? '').replace(/"/g, '""')}"`).join(',')
      )
      .join('\n');

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.supplier.name}-risk-report.csv`;
    link.click();

    URL.revokeObjectURL(url);
  }

  getRiskBadgeClasses(): string {
    if (!this.supplier || !this.riskThresholds) {
      return 'bg-green-100 text-green-700';
    }

    const score = this.supplier.riskScore;

    if (score >= this.riskThresholds.high) {
      return 'bg-red-100 text-red-700';
    }

    if (score >= this.riskThresholds.medium) {
      return 'bg-amber-100 text-amber-700';
    }

    return 'bg-green-100 text-green-700';
  }
  ngOnDestroy(): void {
    if (this.trendChart) {
      this.trendChart.destroy();
    }
    if (this.categoryChart) {
      this.categoryChart.destroy();
    }
  }
}
