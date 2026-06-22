import { Component, OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberService } from '../../core/services/member.service';
import { PaymentService } from '../../core/services/payment.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { ChangeDetectorRef } from '@angular/core';
import { Route, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,NavbarComponent,RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {

  totalMembers = 0;
  pendingPayments = 0;
  renewalsDue = 0;
  todayRegistrations = 0;

  recentMembers: any[] = [];
  pendingPaymentList: any[] = [];
  private cdr = inject(ChangeDetectorRef);

  constructor(
    private memberService: MemberService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() {

    this.memberService.getMembers().subscribe((members: any[]) => {

      this.totalMembers = members.length;

      const today = new Date();

      this.todayRegistrations = members.filter(member => {

        const joining = new Date(member.joiningDate);

        return (
          joining.getDate() === today.getDate() &&
          joining.getMonth() === today.getMonth() &&
          joining.getFullYear() === today.getFullYear()
        );

      }).length;

      const next7Days = new Date();
      next7Days.setDate(next7Days.getDate() + 7);

      this.renewalsDue = members.filter(member => {

        const expiry = new Date(member.expiryDate);

        return expiry >= today && expiry <= next7Days;

      }).length;

      this.recentMembers = [...members]
        .sort((a, b) =>
          new Date(b.joiningDate).getTime() -
          new Date(a.joiningDate).getTime()
        )
        .slice(0, 5);
        this.cdr.detectChanges();
    });

    this.paymentService.getPayments().subscribe((payments: any[]) => {

      this.pendingPayments =
        payments.filter(p => p.status === 'Pending').length;

      this.pendingPaymentList =
        payments
          .filter(p => p.status === 'Pending')
          .slice(0, 5);
      this.cdr.detectChanges();
    });

  }

}