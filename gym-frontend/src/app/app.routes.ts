import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login';

import { DashboardComponent as AdminDashboardComponent }
from './admin/dashboard/dashboard';

import { DashboardComponent as InstructorDashboardComponent } 
from './instructor/dashboard/dashboard';

import { PlansComponent } from './admin/plans/plans';
import { MembersComponent as AdminMemberComponent} from './admin/members/members';
import { MembersComponent as InstructorMemberComponent } from './instructor/members/members';
import { PaymentsComponent } from './admin/payments/payments';
import { PaymentsComponent as InstructorPaymentComponent } from './instructor/payments/payments';
import { ReportsComponent } from './admin/reports/reports';
import { SchemesComponent } from './admin/schemes/schemes';
import { InstructorsComponent } from './admin/instructors/instructors'; 
import { RenewalsComponent } from './instructor/renewals/renewals';

import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
  path: 'admin/dashboard',
  component: AdminDashboardComponent,
  canActivate: [authGuard, roleGuard],
  data: { role: 'Admin' }
},
{
    path:'admin/instructors',
    component: InstructorsComponent,
    canActivate: [authGuard, roleGuard],
  data: { role: 'Admin' }
},
{
  path: 'admin/members',
  component: AdminMemberComponent,
  canActivate: [authGuard, roleGuard],
  data: { role: 'Admin' }
},
{
  path: 'admin/plans',
  component: PlansComponent,
  canActivate: [authGuard, roleGuard],
  data: { role: 'Admin' }
},
{
  path: 'admin/schemes',
  component: SchemesComponent,
  canActivate: [authGuard, roleGuard],
  data: { role: 'Admin' }
},
{
  path: 'admin/payments',
  component: PaymentsComponent,
  canActivate: [authGuard, roleGuard],
  data: { role: 'Admin' }
},
{
  path: 'admin/reports',
  component: ReportsComponent,
  canActivate: [authGuard, roleGuard],
  data: { role: 'Admin' }
},

  {
    path: 'instructor/dashboard',
    component: InstructorDashboardComponent,
    canActivate: [authGuard,roleGuard],
    data:{
      role: 'Instructor'
    }
  },

  {
    path: 'instructor/members',
    component: InstructorMemberComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      role: 'Instructor'
    }
  },
  {
    path: 'instructor/payments',
    component: InstructorPaymentComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      role: 'Instructor'
    }
  },
  {
    path: 'instructor/renewals',
    component: RenewalsComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      role: 'Instructor'
    }
  },

  

  {
    path: '**',
    redirectTo: 'login'
  }
];