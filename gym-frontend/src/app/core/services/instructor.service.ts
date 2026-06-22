import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Instructor } from '../../admin/instructors/instructors.model';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5000/api/instructors';

  getInstructors(): Observable<Instructor[]> {

    return this.http.get<Instructor[]>(this.apiUrl);

  }

  addInstructor(instructor: Instructor): Observable<Instructor> {

    return this.http.post<Instructor>(
      this.apiUrl,
      instructor
    );

  }

  updateInstructor(
    id: string,
    instructor: Instructor
  ): Observable<Instructor> {

    return this.http.put<Instructor>(
      `${this.apiUrl}/${id}`,
      instructor
    );

  }

  deleteInstructor(id: string) {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }
}