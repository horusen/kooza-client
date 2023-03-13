import { PaymentMethodService } from './../payment-method.service';
import { PaymentMethod } from './../payment-method.model';
import { BaseListComponent } from 'src/app/shared/base-component';
import { Component, Output, EventEmitter } from '@angular/core';
import { ReminderService } from 'src/app/reminder/reminder.service';

@Component({
  selector: 'app-payment-method-list',
  templateUrl: './payment-method-list.component.html',
  styleUrls: ['./payment-method-list.component.scss'],
})
export class PaymentMethodListComponent extends BaseListComponent<PaymentMethod> {
  selected: string[] = [];
  @Output() outputSelected = new EventEmitter<string>();
  constructor(
    public paymentMethodService: PaymentMethodService,
    public reminderService: ReminderService
  ) {
    super(paymentMethodService);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.subscriptions['reminderpaymentMethods'] =
      this.reminderService.paymentMethods$.subscribe((paymentMethods) => {
        this.selected = paymentMethods;
      });
  }

  select(id: string) {
    this.selected.includes(id) ||
      this.reminderService.paymentMethods$.next([...this.selected, id]);
  }
}
