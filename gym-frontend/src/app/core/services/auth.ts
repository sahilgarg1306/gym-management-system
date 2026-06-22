import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private apiUrl = 'https://gym-management-system-yjjk.onrender.com/api/auth';

  login(data: any) {
    return this.http.post(
      `${this.apiUrl}/login`,
      data
    );
  }
}