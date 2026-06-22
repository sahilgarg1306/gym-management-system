import {
  Component,
  OnInit,
  AfterViewInit
} from '@angular/core';

import { Chart } from 'chart.js/auto';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { MemberService } from '../../core/services/member.service';
import { PaymentService } from '../../core/services/payment.service';
import { InstructorService } from '../../core/services/instructor.service';
import { Route, RouterLink } from '@angular/router';
import { inject,ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  imports:[NavbarComponent,RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  totalMembers = 0;
  totalInstructors = 0;
  totalRevenue = 0;
  pendingPayments = 0;

  monthlyRevenue: number[] = Array(12).fill(0);

  basicCount = 0;
  silverCount = 0;
  goldCount = 0;

  private cdr = inject(ChangeDetectorRef);
  constructor(
    private memberService: MemberService,
    private paymentService: PaymentService,
    private instructorService: InstructorService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  ngAfterViewInit(): void {}

  loadDashboardData() {

    // MEMBERS
    this.memberService.getMembers().subscribe((members: any[]) => {

      this.totalMembers = members.length;

      members.forEach(member => {

        switch (member.plan) {

          case 'Basic':
            this.basicCount++;
            break;

          case 'Silver':
            this.silverCount++;
            break;

          case 'Gold':
            this.goldCount++;
            break;
        }
      });

      this.renderPlanChart();
      this.cdr.detectChanges();
    });

    // INSTRUCTORS
    this.instructorService.getInstructors().subscribe((instructors: any[]) => {

      this.totalInstructors = instructors.length;

    });

    // PAYMENTS
    this.paymentService.getPayments().subscribe((payments: any[]) => {

      payments.forEach(payment => {

        if (payment.status === 'Paid') {

          this.totalRevenue += payment.amount;

          const month =
            new Date(payment.createdAt).getMonth();

          this.monthlyRevenue[month] += payment.amount;

        } else {

          this.pendingPayments++;

        }
      });

      this.renderRevenueChart();
      this.cdr.detectChanges();
    });
  }

  renderRevenueChart() {

    new Chart('revenueChart', {

      type: 'line',

      data: {

        labels: [
          'Jan','Feb','Mar','Apr','May','Jun',
          'Jul','Aug','Sep','Oct','Nov','Dec'
        ],

        datasets: [{
          label: 'Revenue',
          data: this.monthlyRevenue,
          fill: false,
          tension: 0.3
        }]
      },

      options: {
        responsive: true
      }
    });
  }

  renderPlanChart() {

    new Chart('planChart', {

      type: 'pie',

      data: {

        labels: ['Basic', 'Silver', 'Gold'],

        datasets: [{
          data: [
            this.basicCount,
            this.silverCount,
            this.goldCount
          ]
        }]
      },

      options: {
        responsive: true
      }
    });
  }
}