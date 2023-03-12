import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditLoanComponent } from './credit-loan.component';
import { CreditLoanCreateComponent } from './credit-loan-create/credit-loan-create.component';
import { SharedModule } from '../shared/shared.module';
import { CreditLoanListComponent } from './credit-loan-list/credit-loan-list.component';
import { ReminderModule } from '../reminder/reminder.module';

const routes: Routes = [
  {
    path: '',
    component: CreditLoanComponent,
  },
];

@NgModule({
  declarations: [
    CreditLoanComponent,
    CreditLoanCreateComponent,
    CreditLoanListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReminderModule,
  ],
})
export class CreditLoanModule {}
