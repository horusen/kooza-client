import { SetReminderService } from './../../set-reminder/set-reminder.service';
import { PaymentMethodService } from './../payment-method.service';
import { PaymentMethod } from './../payment-method.model';
import { BaseListComponent } from 'src/app/shared/base-component';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-payment-method-list',
  templateUrl: './payment-method-list.component.html',
  styleUrls: ['./payment-method-list.component.scss'],
})
export class PaymentMethodListComponent extends BaseListComponent<PaymentMethod> {
  selected: string | undefined;
  @Output() outputSelected = new EventEmitter<string>();
  constructor(
    public paymentMethodService: PaymentMethodService,
    public setReminserService: SetReminderService
  ) {
    super(paymentMethodService);
  }

  select(id: string) {
    this.selected = id;
    this.setReminserService.paymentMethodId.next(this.selected);
  }
}
