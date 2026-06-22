import { Component,inject, OnInit } from '@angular/core';
import { PaymentService } from '../../core/services/payment.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Route, RouterLink } from '@angular/router';
@Component({
  selector: 'app-payments',
  imports:[CommonModule,RouterLink],
  templateUrl: './payments.html',
  styleUrls: ['./payments.css']
})
export class PaymentsComponent implements OnInit {

  payments: any[] = [];
  private cdr = inject(ChangeDetectorRef);
  constructor(
    private paymentService: PaymentService

  ) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments() {
    console.log("I am here");

    this.paymentService
      .getPayments()
      .subscribe((res) => {

        this.payments = res;
        console.log(res);
        this.cdr.detectChanges();
      });
  }

  markPaid(paymentId: string) {

    this.paymentService
      .markPaid(paymentId)
      .subscribe(() => {

        this.loadPayments();

      });
  }
}