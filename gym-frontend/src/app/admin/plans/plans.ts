import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlanService } from '../../core/services/plan.service';
import { ChangeDetectorRef } from '@angular/core';
import { Route, RouterLink } from '@angular/router';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './plans.html',
  styleUrls: ['./plans.css']
})
export class PlansComponent implements OnInit {

  plans: any[] = [];

  newPlan = {
    name: '',
    description: '',
    durationInWeeks: 4,
    difficulty: 'Beginner'
  };

  showForm = false;

  constructor(
    private planService: PlanService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPlans();
  }

  loadPlans() {
    this.planService.getPlans().subscribe((res: any) => {
      this.plans = res;
      this.cdr.detectChanges();
    });
  }

  addPlan() {
    this.planService.addPlan(this.newPlan).subscribe(() => {
      this.loadPlans();
      this.resetForm();
      this.showForm = false;
      this.cdr.detectChanges();
    });
  }

  deletePlan(id: string) {
    this.planService.deletePlan(id).subscribe(() => {
      this.loadPlans();
      this.cdr.detectChanges();
    });
  }

  resetForm() {
    this.newPlan = {
      name: '',
      description: '',
      durationInWeeks: 4,
      difficulty: 'Beginner'
    };
  }
}