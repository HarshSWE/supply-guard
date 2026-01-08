import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DashboardStats } from '../models/dashboard-stats.model';
import { RiskTrendPoint } from '../models/risk-trend-point.model';
import { Supplier } from '../models/supplier.model';
import { Alert } from '../models/alert.model';

const API_BASE = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${API_BASE}/dashboard/stats`);
  }

  getRiskTrend(): Observable<RiskTrendPoint[]> {
    return this.http.get<RiskTrendPoint[]>(`${API_BASE}/dashboard/risk-trend`);
  }

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${API_BASE}/suppliers`);
  }

  getAlerts(): Observable<Alert[]> {
    return this.http.get<Alert[]>(`${API_BASE}/alerts`);
  }

  getSupplierTable(filters: {
    search?: string;
    region?: string;
    industry?: string;
    riskLevel?: string;
  }): Observable<any[]> {
    let params = new HttpParams();

    if (filters.search) {
      params = params.set('search', filters.search);
    }
    if (filters.region) {
      params = params.set('region', filters.region);
    }
    if (filters.industry) {
      params = params.set('industry', filters.industry);
    }
    if (filters.riskLevel) {
      params = params.set('riskLevel', filters.riskLevel);
    }

    return this.http.get<any[]>(`${API_BASE}/suppliers/table`, { params });
  }
}
