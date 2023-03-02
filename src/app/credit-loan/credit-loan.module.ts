import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditLoanComponent } from './credit-loan.component';
import { CreditLoanCreateComponent } from './credit-loan-create/credit-loan-create.component';

@NgModule({
  declarations: [CreditLoanComponent, CreditLoanCreateComponent],
  imports: [CommonModule],
})
export class CreditLoanModule {}
