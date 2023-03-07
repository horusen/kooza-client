import { RetailerOverviewComponent } from './../retailer-overview/retailer-overview.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RetailersComponent } from './retailers/retailers.component';

const routes: Routes = [
  {
    path: 'customer/:id',
    component: RetailerOverviewComponent,
  },
  {
    path: 'credit-loan',
    loadChildren: () =>
      import('../credit-loan/credit-loan.module').then(
        (module) => module.CreditLoanModule
      ),
  },
  {
    path: '',
    component: DashboardComponent,
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    RetailersComponent,
    RetailerOverviewComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class DashboardModule {}
