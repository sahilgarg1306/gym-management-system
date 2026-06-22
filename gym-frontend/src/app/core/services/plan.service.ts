import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private apiUrl = 'https://gym-management-system-yjjk.onrender.com/api/plans';

  constructor(private http: HttpClient) {}

  getPlans() {
    return this.http.get(this.apiUrl);
  }

  addPlan(plan: any) {
    return this.http.post(this.apiUrl, plan);
  }

  deletePlan(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}