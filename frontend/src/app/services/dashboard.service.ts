import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardStats } from '../models/dashboard-stats.model';
import { RiskTrendPoint } from '../models/risk-trend-point.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>('http://localhost:8080/api/dashboard/stats');
  }

  getRiskTrend() {
    return this.http.get<RiskTrendPoint[]>('http://localhost:8080/api/dashboard/risk-trend');
  }
}
