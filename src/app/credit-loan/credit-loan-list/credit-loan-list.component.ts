import { ReminderService } from './../../reminder/reminder.service';
import { CreditLoan } from './../credit-loan.model';
import { Component } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/base-component';
import { CreditLoanService } from '../credit-loan.service';

@Component({
  selector: 'app-credit-loan-list',
  templateUrl: './credit-loan-list.component.html',
  styleUrls: ['./credit-loan-list.component.scss'],
})
export class CreditLoanListComponent extends BaseListComponent<CreditLoan> {
  constructor(
    public creditLoanService: CreditLoanService,
    public reminderService: ReminderService
  ) {
    super(creditLoanService);
  }

  setReminder(element: CreditLoan) {
    this.reminderService.creditLoanId$.next(element.id!);
    this.helper.modal.show('set-reminder-modal');
  }

  markAsPaid(elementId: string) {
    const index = this.creditLoanService.findIndexItemInDataByID(elementId);
    console.log(index);

    if (index) {
      this.creditLoanService._data[index].credit_loan_status?.name == 'Paid';
      this.creditLoanService.emitData();
    }
  }
}
