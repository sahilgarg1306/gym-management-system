import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberService } from '../../core/services/member.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { Route, RouterLink } from '@angular/router';
@Component({
  selector: 'app-renewals',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,RouterLink
  ],
  templateUrl: './renewals.html',
  styleUrl: './renewals.css'
})
export class RenewalsComponent implements OnInit {

  renewalMembers: any[] = [];

  constructor(
    private memberService: MemberService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadRenewals();
  }

  loadRenewals() {

    this.memberService.getMembers().subscribe((members: any[]) => {
      // console.log(members);
      const today = new Date();

      const next7Days = new Date();
      next7Days.setDate(next7Days.getDate() + 7);

      this.renewalMembers = members.filter(member => {

        const expiryDate = new Date(member.expiryDate);

        return expiryDate <= next7Days;

      });
      // console.log(this.memberService.getMembers()); 
      // console.log(this.renewalMembers);

      this.cdr.detectChanges();

    });

  }

  renewMembership(id: string) {

    this.memberService
      .renewMembership(id)
      .subscribe(() => {

        this.loadRenewals();

        this.cdr.detectChanges();

      });

  }

  isExpired(expiryDate: string): boolean {
  return new Date(expiryDate) < new Date();
}

}