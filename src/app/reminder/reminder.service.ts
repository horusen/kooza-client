import { CreditLoan } from './../credit-loan/credit-loan.model';
import { ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services';
import { Reminder } from './reminder.model';

@Injectable({
  providedIn: 'root',
})
export class ReminderService extends BaseService<Reminder> {
  creditLoan$ = new ReplaySubject<CreditLoan>(1);

  constructor() {
    super('reminder');
  }
}
