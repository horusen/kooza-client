import { ReminderService } from './../reminder/reminder.service';
import { Validators } from '@angular/forms';
import { BaseCreateComponent } from 'src/app/shared/base-component';
import { Component, OnInit } from '@angular/core';
import { SetReminderService } from './set-reminder.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-set-reminder',
  templateUrl: './set-reminder.component.html',
  styleUrls: ['./set-reminder.component.scss'],
})
export class SetReminderComponent
  extends BaseCreateComponent<any>
  implements OnInit
{
  constructor(
    public setReminderService: SetReminderService,
    public reminderService: ReminderService,
    public authService: AuthService
  ) {
    super(setReminderService);
  }

  ngOnInit() {
    this.initForm();

    // this.subscriptions['reminder'] = this.reminderService.creditLoanId$.subscribe(
    //   (credit) => {
    //     this.formValuePatcher('creditId', credit.id);
    //   }
    // );

    this.subscriptions['reminderId'] =
      this.setReminderService.reminderId.subscribe((reminderId) => {
        this.formValuePatcher('reminderId', reminderId);
      });

    this.subscriptions['paymentMethodId'] =
      this.setReminderService.paymentMethodId.subscribe((paymentMethodId) => {
        this.formValuePatcher('paymentMethodId', paymentMethodId);
      });

    this.subscriptions['customeMessageId'] =
      this.setReminderService.messageId.subscribe((customeMessageId) => {
        this.formValuePatcher('customMessageId', customeMessageId);
      });
  }

  initForm() {
    this.form = this.fb.group({
      businessId: [this.authService.business.id, Validators.required],
      reminderId: [null, Validators.required],
      creditId: [null, Validators.required],
      paymentMethodId: [null, Validators.required],
      customMessageId: [null, Validators.required],
    });
  }

  override create() {
    if (!this.form.valid) {
      this.helper.notification.alertDanger('Invalid form');
      return;
    }
    this.loading = true;
    this.setReminderService.add(this.form.value).subscribe(() => {
      this.loading = false;
      // this.form.reset();
      this.helper.notification.alertSuccess();
    });
  }
}
