import { CreditLoan } from './../../credit-loan/credit-loan.model';
import { Validators } from '@angular/forms';
import { BaseCreateComponent } from './../../shared/base-component/base-create.component';
import { Component, OnInit } from '@angular/core';
import { Reminder } from '../reminder.model';
import { ReminderService } from '../reminder.service';
import { CreditLoanService } from 'src/app/credit-loan/credit-loan.service';

@Component({
  selector: 'app-reminder-create',
  templateUrl: './reminder-create.component.html',
  styleUrls: ['./reminder-create.component.scss'],
})
export class ReminderCreateComponent
  extends BaseCreateComponent<Reminder>
  implements OnInit
{
  recurrences = ['No', 'Every day', 'Every 3 days', 'Every week'];
  creditLoan: CreditLoan | undefined;
  constructor(
    public reminderService: ReminderService,
    public creditLoanService: CreditLoanService
  ) {
    super(reminderService);
  }

  ngOnInit(): void {
    this.subscriptions['credit'] = this.reminderService.creditLoan$.subscribe(
      (credit) => {
        this.creditLoan = this.creditLoan;
        this.initForm();
      }
    );
  }

  initForm() {
    this.form = this.fb.group({
      credit_loan_id: [this.creditLoan?.id, Validators.required],
      date: [null, Validators.required],
      time: [null, Validators.required],
      repeat: ['No', Validators.required],
    });
  }
}
