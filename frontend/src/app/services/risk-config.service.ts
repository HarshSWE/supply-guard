import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { RiskThresholds } from '../models/risk-thresholds.model';

@Injectable({ providedIn: 'root' })
export class RiskConfigService {
  private thresholds$ = new BehaviorSubject<RiskThresholds | null>(null);
  private apiUrl = 'http://localhost:8080/api/risk-thresholds';

  constructor(private http: HttpClient) {}

  load(): void {
    this.http.get<RiskThresholds>(this.apiUrl).subscribe({
      next: (data) => this.thresholds$.next(data),
      error: (err) => console.error('Failed to load thresholds', err),
    });
  }

  getThresholds() {
    return this.thresholds$.asObservable();
  }

  getCurrentThresholds(): RiskThresholds {
    return this.thresholds$.value!;
  }

  updateThresholds(thresholds: RiskThresholds) {
    return this.http.put<RiskThresholds>(this.apiUrl, thresholds).subscribe({
      next: (updated) => this.thresholds$.next(updated),
      error: (err) => console.error('Failed to update thresholds', err),
    });
  }
}
