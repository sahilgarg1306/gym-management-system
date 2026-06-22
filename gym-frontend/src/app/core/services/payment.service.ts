import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'https://gym-management-system-yjjk.onrender.com/api/payments';

  constructor(private http: HttpClient) {}

  getPayments() {
    return this.http.get<any[]>(this.apiUrl);
  }

  markPaid(id: string) {
    return this.http.put(
      `${this.apiUrl}/${id}/pay`,
      {}
    );
  }
}