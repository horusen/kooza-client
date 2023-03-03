import { PaymentMethodModule } from './../payment-method/payment-method.module';
import { CustomMessageModule } from './../custom-message/custom-message.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetReminderComponent } from './set-reminder.component';
import { SharedModule } from '../shared/shared.module';
import { ReminderModule } from '../reminder/reminder.module';

@NgModule({
  declarations: [SetReminderComponent],
  imports: [
    CommonModule,
    SharedModule,
    CustomMessageModule,
    PaymentMethodModule,
    ReminderModule,
  ],
  exports: [SetReminderComponent],
})
export class SetReminderModule {}
