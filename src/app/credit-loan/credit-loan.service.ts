import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services';
import { CreditLoan } from './credit-loan.model';

@Injectable({
  providedIn: 'root',
})
export class CreditLoanService extends BaseService<CreditLoan> {
  constructor() {
    super('credit-loan');
  }

  markAsPaid(creditLoanId: string) {
    return this.factory
      .post(`${this.endPoint}/mark-as-paid`, { credit_loan_id: creditLoanId })
      .pipe(
        tap({
          next: (response) => {
            this.updateItemInData(creditLoanId, response.data);
          },
          error: (error) => this.errorResponseHandler(error),
        })
      );
  }
}
