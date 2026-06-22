import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Member } from '../../admin/members/members.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5000/api/members';

  getMembers(): Observable<Member[]> {

    return this.http.get<Member[]>(this.apiUrl);

  }

  addMember(member: Member): Observable<Member> {

    return this.http.post<Member>(
      this.apiUrl,
      member
    );

  }

  updateMember(
    id: string,
    member: Member
  ): Observable<Member> {

    return this.http.put<Member>(
      `${this.apiUrl}/${id}`,
      member
    );

  }

  renewMembership(id: string) {
  return this.http.put(
    `${this.apiUrl}/renew/${id}`,
    {}
  );
}

  deleteMember(id: string) {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }
}