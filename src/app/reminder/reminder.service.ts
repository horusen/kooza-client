import { tap, map } from 'rxjs/operators';
import { ApiResponse } from './../shared/models/ApiResponse';
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

  getByCreditLoan(creditLoanId: string) {
    return this.factory
      .get(`credit-loan/${creditLoanId}/${this.endPoint}`)
      .pipe(
        tap((response: ApiResponse<Reminder>) => {
          this.data = response.data;
          this.paginationInfo = {
            total: response.total,
            itemsPerPage: response.per_page,
            currentPage: response.current_page,
          };
        }),
        map((response: ApiResponse<Reminder>) => response.data)
      );
  }
}
