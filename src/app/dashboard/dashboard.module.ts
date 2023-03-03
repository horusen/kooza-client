import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RetailersComponent } from './retailers/retailers.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'credit-loan',
    loadChildren: () =>
      import('../credit-loan/credit-loan.module').then(
        (module) => module.CreditLoanModule
      ),
  },
];

@NgModule({
  declarations: [DashboardComponent, RetailersComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class DashboardModule {}
