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
}
