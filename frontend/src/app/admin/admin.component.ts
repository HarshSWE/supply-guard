import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RiskConfigService } from '../services/risk-config.service';
import { RiskThresholds } from '../models/risk-thresholds.model';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  thresholds!: RiskThresholds;
  saved = false;

  constructor(private riskConfig: RiskConfigService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.riskConfig.getThresholds().subscribe((t) => {
      if (t) this.thresholds = { ...t };
    });
  }

  save(): void {
    this.riskConfig.updateThresholds(this.thresholds);

    this.saved = true;

    setTimeout(() => {
      this.saved = false;
      this.cdr.detectChanges();
    }, 2000);
  }
}
