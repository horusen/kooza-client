import { CreditLoanService } from 'src/app/credit-loan/credit-loan.service';
import { Reminder } from './../reminder.model';
import { BaseListComponent } from 'src/app/shared/base-component';
import { Component } from '@angular/core';
import { ReminderService } from '../reminder.service';

@Component({
  selector: 'app-reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.scss'],
})
export class ReminderListComponent extends BaseListComponent<Reminder> {
  constructor(
    public reminderService: ReminderService,
    public creditLoanService: CreditLoanService
  ) {
    super(reminderService);
  }

  override ngOnInit(): void {
    this.subscriptions['creditLoan'] =
      this.reminderService.creditLoanId$.subscribe((creditLoan) => {
        if (creditLoan) this.getData(creditLoan!);
      });
  }

  getData(creditLoan: string) {
    this.loading = true;
    this.reminderService.getByCreditLoan(creditLoan).subscribe((data) => {
      console.log(data);

      this.loading = false;
    });
  }
}
