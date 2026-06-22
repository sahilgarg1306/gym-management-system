import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SchemeService } from '../../core/services/scheme.service';
import { PlanService } from '../../core/services/plan.service';
import { MemberService } from '../../core/services/member.service';
import { Route, RouterLink } from '@angular/router';

@Component({
  selector: 'app-reports',
  imports:[RouterLink],
  templateUrl: './reports.html',
  styleUrls: ['./reports.css']
})
export class ReportsComponent implements OnInit {

  totalMembers = 0;
  totalSchemes = 0;
  totalPlans = 0;
  revenue = 0;

  planStats: any = {
    Basic: 0,
    Silver: 0,
    Gold: 0
  };

  constructor(
    private schemeService: SchemeService,
    private planService: PlanService,
    private memberService: MemberService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports() {

    this.memberService.getMembers().subscribe((members: any[]) => {

      // Total members
      this.totalMembers = members.length;

      // Price mapping
      const planPrices: any = {
        Basic: 499,
        Silver: 999,
        Gold: 1999
      };

      let revenue = 0;

      // Reset counts (important if reload happens)
      this.planStats = {
        Basic: 0,
        Silver: 0,
        Gold: 0
      };

      // Calculate stats
      members.forEach(m => {
        const plan = m.plan;

        if (this.planStats[plan] !== undefined) {
          this.planStats[plan]++;
        }

        revenue += planPrices[plan] || 0;
      });

      this.revenue = revenue;
    });

      // Optional: schemes + plans counts (safe calls)
      this.schemeService.getSchemes().subscribe((res: any) => {
      this.totalSchemes = res.length;
      this.cdr.detectChanges();
      });

      this.planService.getPlans().subscribe((res: any) => {
        this.totalPlans = res.length;
        this.cdr.detectChanges();
      });        
  }
};