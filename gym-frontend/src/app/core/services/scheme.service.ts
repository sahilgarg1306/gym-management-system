import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SchemeService {

  private apiUrl = 'http://localhost:5000/api/schemes';

  constructor(private http: HttpClient) {}

  getSchemes() {
    return this.http.get(this.apiUrl);
  }

  addScheme(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  deleteScheme(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}