import { CreditLoan } from './../credit-loan/credit-loan.model';
import { ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services';
import { Reminder } from './reminder.model';

@Injectable({
  providedIn: 'root',
})
export class ReminderService extends BaseService<Reminder> {
  creditLoanId$ = new ReplaySubject<string | null>(1);
  customMessageId$ = new ReplaySubject<string | null>(1);
  paymentMethods$ = new ReplaySubject<string[]>(1);

  constructor() {
    super('reminder');
  }
}
