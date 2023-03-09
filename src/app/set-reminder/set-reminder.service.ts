import { CreditLoanService } from 'src/app/credit-loan/credit-loan.service';
import { tap } from 'rxjs/operators';
import { BaseService } from 'src/app/shared/services';
import { ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SetReminderService extends BaseService<any> {
  reminderId = new ReplaySubject<string>(1);
  messageId = new ReplaySubject<string>(1);
  paymentMethodId = new ReplaySubject<string>(1);

  constructor(public creditService: CreditLoanService) {
    super('reminder/add');
  }

  add(elements: any) {
    return this.factory.post(this.endPoint, elements).pipe(
      tap({
        next: (response) => {
          this.lastItemCreated = response.data;
          let credit = this.creditService.findIndexItemInDataByID(
            elements.creditId
          );
          if (credit) {
            this.creditService._data[credit].reminders = this.creditService
              ._data[credit]?.reminders?.length
              ? [...this.creditService._data[credit]?.reminders!, response.data]
              : [response.data];

            console.log(this.creditService._data[credit]);

            this.creditService.emitData();
          }
        },
        error: (error) => {
          this.errorResponseHandler(error);
        },
      })
    );
  }
}
