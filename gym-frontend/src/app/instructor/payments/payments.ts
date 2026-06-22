import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PaymentService } from '../../core/services/payment.service';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './payments.html',
  styleUrl: './payments.css'
})
export class PaymentsComponent implements OnInit {

  payments: any[] = [];
  filteredPayments: any[] = [];

  searchText = '';

  constructor(
    private paymentService: PaymentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadPayments();

  }

  loadPayments() {

    this.paymentService.getPayments().subscribe((res: any[]) => {

      this.payments = res;

      this.filteredPayments = res;

      this.cdr.detectChanges();

    });

  }

  searchPayments() {

    const text = this.searchText.toLowerCase();

    this.filteredPayments = this.payments.filter(payment =>
      payment.memberName.toLowerCase().includes(text)
    );

    this.cdr.detectChanges();

  }
}