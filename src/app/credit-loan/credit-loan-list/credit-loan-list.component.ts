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
    this.loading = true;
    this.creditLoanService.markAsPaid(elementId).subscribe(() => {
      this.helper.notification.alertSuccess();
      this.loading = false;
    });
  }
}
