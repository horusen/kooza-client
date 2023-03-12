import { CreditLoan } from './../../credit-loan/credit-loan.model';
import { Validators } from '@angular/forms';
import { BaseCreateComponent } from './../../shared/base-component/base-create.component';
import { Component, OnInit } from '@angular/core';
import { Reminder } from '../reminder.model';
import { ReminderService } from '../reminder.service';
import { CreditLoanService } from 'src/app/credit-loan/credit-loan.service';
import { AuthService } from 'src/app/auth/auth.service';

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
    public creditLoanService: CreditLoanService,
    public authService: AuthService
  ) {
    super(reminderService);
  }

  ngOnInit(): void {
    this.initForm();

    this.subscriptions['reminder'] =
      this.reminderService.creditLoanId$.subscribe((creditId) => {
        if (creditId) this.formValuePatcher('credit_loan_id', creditId);
      });

    this.subscriptions['paymentMethods'] =
      this.reminderService.paymentMethods$.subscribe((paymentMethods) => {
        this.formValuePatcher('payment_method_ids', paymentMethods);
      });

    this.subscriptions['customeMessageId'] =
      this.reminderService.customMessageId$.subscribe((customeMessageId) => {
        if (customeMessageId)
          this.formValuePatcher('custom_message_id', customeMessageId);
      });
  }

  initForm() {
    this.form = this.fb.group({
      date: [null, Validators.required],
      time: [null, Validators.required],
      repeat: ['No', Validators.required],
      credit_loan_id: [this.creditLoan?.id, Validators.required],
      custom_message_id: [null, Validators.required],
      payment_method_ids: [null, Validators.required],
      business_id: [this.authService.business.id, Validators.required],
    });
  }

  override create() {
    if (!this.form.valid) {
      this.helper.notification.alertDanger('Invalid form');
      return;
    }

    this.loading = true;

    const data = {
      ...this.form.value,
      date: `${this.form.controls['date'].value}T${this.form.controls['time'].value}`,
    };

    this.service.store(data).subscribe(() => {
      this.loading = false;
      this.form.reset();
      this.reminderService.customMessageId$.next(null);
      this.reminderService.creditLoanId$.next(null);
      this.reminderService.paymentMethods$.next([]);
      this.helper.navigation.deleteFragmentFromUrl();
      this.helper.notification.alertSuccess();
      console.log(this.form.value);
    });
  }
}
